import React, { useState } from 'react'
import CryptoForm from '../components/CryptoForm'
import Result from '../components/Result'
import Resume from '../components/Resume'

const Home = () => {
  const [result, setResult] = useState(null)

  const handleConvert = (data) => {
    setResult(data)
  }



  return (
    <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4 max-w-screen-xl m-auto">
      <CryptoForm onConvert={handleConvert} className=" shadow-md rounded-md" />
      {result ? <Result result={result}/> : <Resume/>}
      <div>{result && result.convertedAmount}</div>
      
    </div>
  )
}

export default Home
