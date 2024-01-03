import React from 'react'


const Result = ({result}) => {

console.log("result",result)
  return (
    <div
      className="w-full p-8   bg-blue-900 rounded-2xl">
      <div className="flex flex-col text-white">
        <h1 className="font-bold uppercase text-2xl mb-4">Converted Amount</h1>
        <h1 className="font-bold uppercase text-7xl mb-4">$ 1222</h1>
        <h1 className="font-bold  text-2xl my-4">Exchange Rate</h1>
        <h1 className="font-bold uppercase text-5xl mb-4">$ 12123</h1>
      </div>
    </div>
  )
}

export default Result



