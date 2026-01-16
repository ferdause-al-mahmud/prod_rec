import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="sticky top-0 z-50 bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold text-indigo-600">ProdRec</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <section className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to ProdRec</h2>
              <p className="text-gray-600 mb-8">
                Your product recommendation platform with React, Tailwind CSS, and Vite.
              </p>

              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setCount((count) => count + 1)}
                  className="btn btn-primary"
                >
                  Count is {count}
                </button>
              </div>

              <div className="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Get started by editing the App.jsx file!</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default App
