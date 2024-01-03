import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'

const App = () => {
  return (
    <div className="bg-gradient-to-bl from-purple-600 via-cyan-700 to-current">
      <ToastContainer />
      <div className="p-4 flex flex-col justify-center min-h-screen mx-auto">
        <Home />
      </div>
    </div>
  )
}

export default App
