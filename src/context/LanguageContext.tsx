'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    expenseManager: '💸 Gestor de Gastos',
    resetData: '🗑️ Resetear Datos',
    resetConfirm: '¿Estás seguro de que quieres resetear todos los datos? Esto eliminará todas las actividades, gastos y participantes.',
    startFirstActivity: '🎯 Crea tu Primera Actividad',
    activityNamePlaceholder: 'Nombre de la actividad (ej: Viaje de Fin de Semana, Cena Fuera...)',
    descriptionPlaceholder: 'Descripción (opcional)',
    createActivity: '🚀 Crear Actividad',
    selectActivity: 'Seleccionar Actividad',
    current: 'Actual',
    newActivity: '+ Nueva Actividad',
    cancel: 'Cancelar',
    activityExists: 'La actividad ya existe',
    changeActivity: 'Cambiar Actividad',
    participants: 'Participantes',
    addParticipantPlaceholder: 'Agregar participante...',
    add: 'Agregar',
    deleteConfirm: '¿Estás seguro de que quieres eliminar',
    deleteUndone: 'Esta acción no se puede deshacer.',
    expenses: 'Gastos',
    noExpenses: 'No hay gastos registrados',
    balances: 'Balances',
    settlements: 'Liquidaciones',
    noSettlements: 'No hay liquidaciones pendientes',
    owes: 'debe',
    to: 'a',
    totalPaid: 'Total Pagado',
    totalOwed: 'Total Debe',
    balance: 'Balance',
    language: '🌐 Idioma',
    spanish: 'Español',
    english: 'English',
    noExpensesRecorded: 'No hay gastos registrados',
    addTwoParticipants: 'Agrega al menos 2 participantes para comenzar a crear gastos',
    allBalancesSettled: '¡Todos los balances están liquidados!',
    transfersCompleted: '✅ Una vez que estas transferencias se completen, todos los participantes estarán balanceados.',
    quickExpenseForm: '⚡ Formulario Rápido de Gastos',
    description: 'Descripción',
    amount: 'Monto',
    category: 'Categoría',
    whoPaid: '¿Quién pagó?',
    whoParticipated: '¿Quién participó?',
    selectAll: 'Seleccionar Todos',
    deselectAll: 'Deseleccionar Todos',
    addExpense: 'Agregar Gasto',
    food: 'Comida',
    transport: 'Transporte',
    entertainment: 'Entretenimiento',
    accommodation: 'Alojamiento',
    other: 'Otro',
    expenseDescriptionPlaceholder: 'ej: Cena en restaurante, Gasolina...',
    selectPayer: 'Selecciona quién pagó',
    selectParticipants: 'Selecciona al menos un participante'
  },
  en: {
    expenseManager: '💸 Expense Manager',
    resetData: '🗑️ Reset Data',
    resetConfirm: 'Are you sure you want to reset all data? This will delete all activities, expenses, and participants.',
    startFirstActivity: '🎯 Start Your First Activity',
    activityNamePlaceholder: 'Activity name (e.g., Weekend Trip, Dinner Out...)',
    descriptionPlaceholder: 'Description (optional)',
    createActivity: '🚀 Create Activity',
    selectActivity: 'Select Activity',
    current: 'Current',
    newActivity: '+ New Activity',
    cancel: 'Cancel',
    activityExists: 'Activity already exists',
    changeActivity: 'Change Activity',
    participants: 'Participants',
    addParticipantPlaceholder: 'Add participant...',
    add: 'Add',
    deleteConfirm: 'Are you sure you want to delete',
    deleteUndone: 'This action cannot be undone.',
    expenses: 'Expenses',
    noExpenses: 'No expenses recorded',
    balances: 'Balances',
    settlements: 'Settlements',
    noSettlements: 'No settlements pending',
    owes: 'owes',
    to: 'to',
    totalPaid: 'Total Paid',
    totalOwed: 'Total Owed',
    balance: 'Balance',
    language: '🌐 Language',
    spanish: 'Español',
    english: 'English',
    noExpensesRecorded: 'No expenses recorded',
    addTwoParticipants: 'Add at least 2 participants to start creating expenses',
    allBalancesSettled: 'All balances are settled!',
    transfersCompleted: '✅ Once these transfers are completed, all participants will be balanced.',
    quickExpenseForm: '⚡ Quick Expense Form',
    description: 'Description',
    amount: 'Amount',
    category: 'Category',
    whoPaid: 'Who paid?',
    whoParticipated: 'Who participated?',
    selectAll: 'Select All',
    deselectAll: 'Deselect All',
    addExpense: 'Add Expense',
    food: 'Food',
    transport: 'Transport',
    entertainment: 'Entertainment',
    accommodation: 'Accommodation',
    other: 'Other',
    expenseDescriptionPlaceholder: 'e.g. Restaurant dinner, Gas...',
    selectPayer: 'Select who paid',
    selectParticipants: 'Select at least one participant'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
