'use client';

import React, { useState } from 'react';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

interface AddFriendFormProps {
  friendName: string;
  friendAmount: string;
  onNameChange: (name: string) => void;
  onAmountChange: (amount: string) => void;
  onAdd: () => boolean;
  onClear: () => void;
  validateFriend: (name: string, amount: string) => ValidationResult;
}

export const AddFriendForm: React.FC<AddFriendFormProps> = ({
  friendName,
  friendAmount,
  onNameChange,
  onAmountChange,
  onAdd,
  onClear,
  validateFriend
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({ name: false, amount: false });

  const validation = validateFriend(friendName, friendAmount);
  const nameError = getFieldError('Name', validation.errors);
  const amountError = getFieldError('Amount', validation.errors);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, amount: true });
    
    if (!validation.isValid) return;

    setIsSubmitting(true);
    const success = onAdd();
    setIsSubmitting(false);
    
    if (success) {
      setTouched({ name: false, amount: false });
    }
  };

  const handleNameBlur = () => setTouched(prev => ({ ...prev, name: true }));
  const handleAmountBlur = () => setTouched(prev => ({ ...prev, amount: true }));

  const isFormValid = validation.isValid;
  const showNameError = touched.name && nameError;
  const showAmountError = touched.amount && amountError;

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Add Friend and Expense
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          id="friendName"
          label="Friend's name"
          type="text"
          value={friendName}
          onChange={onNameChange}
          onBlur={handleNameBlur}
          placeholder="e.g. John"
          error={showNameError ? nameError : undefined}
          disabled={isSubmitting}
        />
        
        <FormField
          id="friendAmount"
          label="Amount spent (€)"
          type="number"
          value={friendAmount}
          onChange={onAmountChange}
          onBlur={handleAmountBlur}
          placeholder="25.50"
          min="0"
          step="0.01"
          error={showAmountError ? amountError : undefined}
          disabled={isSubmitting}
          helpText="You can enter €0 if the friend didn't spend anything but participated"
        />
        
        <ActionButtons
          isSubmitting={isSubmitting}
          isFormValid={isFormValid}
          onClear={onClear}
          hasData={friendName.trim() !== '' || friendAmount.trim() !== ''}
        />
      </form>
    </div>
  );
};

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  placeholder: string;
  error?: string;
  disabled: boolean;
  min?: string;
  step?: string;
  helpText?: string;
}

function FormField({ 
  id, label, type, value, onChange, onBlur, placeholder, 
  error, disabled, min, step, helpText 
}: FormFieldProps) {
  const hasError = !!error;
  const hasValue = value.trim() !== '';

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`input-field ${hasError ? 'border-red-400' : hasValue ? 'border-green-400' : ''}`}
        placeholder={placeholder}
        min={min}
        step={step}
        disabled={disabled}
        required
      />
      {hasError && (
        <div className="mt-1 text-sm text-red-600">
          {error}
        </div>
      )}
      {helpText && !hasError && (
        <div className="mt-1 text-xs text-gray-500">
          {helpText}
        </div>
      )}
    </div>
  );
}

interface ActionButtonsProps {
  isSubmitting: boolean;
  isFormValid: boolean;
  onClear: () => void;
  hasData: boolean;
}

function ActionButtons({ isSubmitting, isFormValid, onClear, hasData }: ActionButtonsProps) {
  return (
    <div className="flex gap-4">
      <button
        type="submit"
        disabled={isSubmitting || !isFormValid}
        className="btn-primary flex-1"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
            Adding...
          </>
        ) : (
          'Add Friend'
        )}
      </button>
      
      <button
        type="button"
        onClick={onClear}
        disabled={isSubmitting || !hasData}
        className="btn-secondary"
      >
        Clear All
      </button>
    </div>
  );
}

function getFieldError(fieldName: string, errors: string[]): string | undefined {
  return errors.find(error => 
    error.toLowerCase().includes(fieldName.toLowerCase())
  );
}
