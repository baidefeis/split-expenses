# 💸 Split Expenses - v2.0

A modern expense splitting application built with Next.js, featuring persistent data storage and bilingual support (Spanish/English).

## 🚀 Features

- **💾 Persistent Data Storage** - All data is saved locally in the browser
- **🌍 Bilingual Interface** - Complete Spanish/English internationalization
- **🎯 Activity-Based Management** - Organize expenses by activities/trips
- **👥 User Management** - Add and manage participants
- **💰 Expense Tracking** - Create, categorize, and track shared expenses
- **⚖️ Balance Calculation** - Automatic balance and settlement calculations
- **📱 Responsive Design** - Works perfectly on all devices
- **🎨 Modern UI** - Beautiful interface with Tailwind CSS

## 🛠️ Tech Stack

- **Framework:** Next.js 15.0.3 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Architecture:** Clean Architecture with Domain-Driven Design
- **Storage:** Browser localStorage for persistence
- **Internationalization:** React Context API
- **State Management:** Custom React hooks

## 🏗️ Architecture

This project follows **Clean Architecture** principles, organizing code into well-defined layers:

### Project Structure

```
src/
├── app/                    # Next.js app router pages
├── application/           # Use cases (business logic)
├── context/              # React contexts (language)
├── domain/               # Domain entities and interfaces
│   ├── entities/          # Domain entities
│   └── repositories/      # Repository interfaces
├── infrastructure/       # External adapters (localStorage)
│   └── repositories/     # Repository implementations
├── presentation/         # UI components and hooks
│   ├── components/       # React components
│   └── hooks/           # Custom React hooks
└── utils/               # Utility functions
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd split-expenses
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000/demo](http://localhost:3000/demo) in your browser

## 📱 Usage

1. **Create an Activity** - Start by creating a new trip or event
2. **Add Participants** - Add friends who will share expenses
3. **Record Expenses** - Add expenses with categories and specify who paid
4. **View Balances** - See who owes what and get settlement suggestions
5. **Language Toggle** - Switch between Spanish and English anytime

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically with zero configuration

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run type-check` - Type check without building

## 🌍 Internationalization

The app supports two languages:
- **Spanish (Default)** - Complete interface in Spanish
- **English** - Full English translation available

Language preference is automatically saved and restored.

## 💾 Data Persistence

All data is stored locally in your browser using localStorage:
- Activities and their participants
- All expenses and categories
- User preferences (language)

Data persists across browser sessions but is specific to each device.
│   └── repositories/     # Repository implementations
├── presentation/         # User interface
│   ├── components/       # React components
│   └── hooks/           # Custom hooks
└── app/                 # Next.js pages (App Router)
```

### Architecture Layers

1. **Domain Layer** - Contains pure business logic, independent of frameworks
2. **Application Layer** - Orchestrates use cases using domain entities
3. **Infrastructure Layer** - Concrete implementations (repositories, APIs)
4. **Presentation Layer** - User interface and React components

## 🚀 Features

- ✅ **Create groups** of users to split expenses
- ✅ **Register expenses** with automatic categorization
- ✅ **Calculate balances** automatically between members
- ✅ **Generate settlements** optimized to minimize transactions
- ✅ **Responsive interface** with Tailwind CSS
- ✅ **TypeScript** for type safety
- ✅ **Clean Architecture** for maintainability
- ✅ **Zero-amount support** - friends who didn't spend can still participate

## 🛠️ Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Architecture**: Clean Architecture + SOLID principles
- **Patterns**: Repository Pattern, Use Cases, Dependency Injection

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repo-url>
   cd split-expenses
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Verificar tipos TypeScript
npm run type-check
```

## 🏃‍♂️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con Turbopack
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta ESLint
- `npm test` - Ejecuta los tests con Jest
- `npm run type-check` - Verifica los tipos TypeScript

## 🎯 Casos de Uso Principales

### 1. Crear Usuario
```typescript
const createUserUseCase = new CreateUserUseCase(userRepository);
const result = await createUserUseCase.execute({
  name: "Juan Pérez",
  email: "juan@example.com"
});
```

### 2. Crear Grupo
```typescript
const createGroupUseCase = new CreateGroupUseCase(groupRepository, userRepository);
const result = await createGroupUseCase.execute({
  name: "Viaje a la Playa",
  ownerId: "user_123",
  memberIds: ["user_456", "user_789"]
});
```

### 3. Registrar Gasto
```typescript
const createExpenseUseCase = new CreateExpenseUseCase(
  expenseRepository, 
  groupRepository, 
  userRepository
);
const result = await createExpenseUseCase.execute({
  description: "Cena en restaurante",
  amount: 120.00,
  category: ExpenseCategory.FOOD,
  paidById: "user_123",
  groupId: "group_456",
  participantIds: ["user_123", "user_456", "user_789"]
});
```

### 4. Calcular Balances
```typescript
const getBalancesUseCase = new GetGroupBalancesUseCase(
  expenseRepository,
  groupRepository,
  balanceCalculatorService
);
const result = await getBalancesUseCase.execute({
  groupId: "group_456"
});
```

## 🏛️ Principios de Clean Code

Este proyecto implementa:

- **Single Responsibility Principle**: Cada clase tiene una única responsabilidad
- **Open/Closed Principle**: Código abierto para extensión, cerrado para modificación  
- **Liskov Substitution Principle**: Las implementaciones pueden sustituirse sin afectar funcionalidad
- **Interface Segregation Principle**: Interfaces específicas en lugar de generales
- **Dependency Inversion Principle**: Dependencias hacia abstracciones, no concreciones

## 📚 Entidades del Dominio

### User
- Gestiona información de usuarios
- Validación de email y nombre
- Métodos para comparación e igualdad

### Group  
- Organiza usuarios en grupos
- Gestión de miembros y ownership
- Validaciones de integridad

### Expense
- Representa gastos del grupo
- Cálculo automático de división
- Categorización y metadatos

## 🔄 Flujo de Datos

1. **UI Components** → Invocan casos de uso
2. **Use Cases** → Orquestan lógica usando entidades
3. **Domain Services** → Procesan cálculos complejos
4. **Repositories** → Abstraen persistencia de datos
5. **Infrastructure** → Implementa persistencia concreta

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Tu Nombre** - *Desarrollo inicial* - [@tuusuario](https://github.com/tuusuario)

## 🙏 Agradecimientos

- Inspirado en aplicaciones como Splitwise
- Implementado siguiendo Clean Architecture de Robert C. Martin
- UI/UX inspirado en principios de diseño moderno
