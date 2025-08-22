'use client';

export default function Instructions() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
                <h1 className="text-3xl font-bold text-purple-900 mb-2">
          📱 How to Use Expense Manager
        </h1>
        <p className="text-xl text-purple-700 mb-8">
          Split expenses easily between friends and family
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">🏁 Quick Start</h2>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            <p className="text-gray-700"><strong>Create Activity:</strong> Give your event a name (e.g., "Birthday Dinner")</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <p className="text-gray-700"><strong>Add Participants:</strong> Enter the names of the people</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
            <p className="text-gray-700"><strong>Record Expenses:</strong> Add each expense with who paid and who shares the cost</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
            <p className="text-gray-700"><strong>View Transfers:</strong> The system automatically calculates who owes money to whom</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">🏷️ Expense Categories</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <span>🍽️</span><span>Comida</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🚗</span><span>Transporte</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🏨</span><span>Alojamiento</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🎉</span><span>Entretenimiento</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🛍️</span><span>Compras</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>💡</span><span>Servicios</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Consejos</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Los nombres deben ser únicos por actividad</li>
            <li>• Puedes dividir gastos entre algunas personas, no todas</li>
            <li>• El sistema calcula las transferencias más eficientes</li>
            <li>• Los datos se guardan automáticamente en tu navegador</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-4">📋 Ejemplo Práctico</h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium text-gray-900 mb-2">Situación: Cena entre 3 amigos</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Participantes:</strong> Ana, Luis, Carlos</p>
              <p><strong>Gastos:</strong></p>
              <ul className="ml-4 space-y-1">
                <li>• Restaurante: $90 (pagó Ana, se divide entre los 3) = $30 c/u</li>
                <li>• Taxi: $15 (pagó Luis, se divide entre Ana y Luis) = $7.50 c/u</li>
                <li>• Propinas: $12 (pagó Carlos, se divide entre los 3) = $4 c/u</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium text-gray-900 mb-2">Resultado automático del sistema:</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Balances:</strong></p>
              <ul className="ml-4 space-y-1">
                <li>• Ana: Pagó $90, Debe $34 → <span className="text-green-600">+$56 (le deben)</span></li>
                <li>• Luis: Pagó $15, Debe $34 → <span className="text-red-600">-$19 (debe)</span></li>
                <li>• Carlos: Pagó $12, Debe $34 → <span className="text-red-600">-$22 (debe)</span></li>
              </ul>
              <p className="mt-3"><strong>Transferencias necesarias:</strong></p>
              <ul className="ml-4 space-y-1">
                <li>• Carlos → Ana: $22</li>
                <li>• Luis → Ana: $19</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <a 
          href="/demo" 
          className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          🚀 Probar la Demo
        </a>
      </div>
    </div>
  );
}
