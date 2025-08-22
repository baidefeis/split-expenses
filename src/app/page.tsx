'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            💰 Split Expenses
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Easily split expenses between friends and family. 
            No complications, no emails required, just names and precise calculations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/demo" 
              className="bg-blue-500 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-600 transition-colors shadow-lg"
            >
              🚀 Use Application
            </a>
            <a 
              href="/instructions" 
              className="bg-white text-blue-500 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-50 transition-colors shadow-lg border border-blue-200"
            >
              📖 View Instructions
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Simple and Fast</h3>
            <p className="text-gray-600">
              Just need participant names. 
              Add expenses and let the system calculate everything automatically.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Total Privacy</h3>
            <p className="text-gray-600">
              No emails or personal data stored. 
              Everything is saved locally in your browser.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Calculations</h3>
            <p className="text-gray-600">
              Automatically calculates who owes money to whom, 
              minimizing the number of transfers needed.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How does it work?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                1
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Create Activity</h4>
              <p className="text-sm text-gray-600">Give your event or outing a name</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                2
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Add Participants</h4>
              <p className="text-sm text-gray-600">Enter the names of the people</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                3
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Record Expenses</h4>
              <p className="text-sm text-gray-600">Add expenses with who paid and who participates</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                4
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">View Results</h4>
              <p className="text-sm text-gray-600">Get precise balances and transfers</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">🗑️ New: Delete Functionality</h3>
            <p className="text-sm text-red-700">
              You can now delete individual expenses and complete activities. 
              Deleting an activity will also remove all associated expenses.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Developed with ❤️ using Next.js, TypeScript and Clean Architecture
          </p>
        </div>
      </div>
    </div>
  );
}
