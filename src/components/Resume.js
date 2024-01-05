import React from 'react'

const Resume = () => {
  return (
    <div className="w-full p-8   bg-blue-900 rounded-2xl">
      <div className="flex flex-col text-white">
        <h1 className="font-bold uppercase text-4xl mb-4">Flemin Louies</h1>
        <p className="text-gray-400">
          Teck Stack : React, Redux, Vue.js, NodeJS, MongoDB, Express.js, AWS
        </p>
        <div className="flex my-4 w-2/3 lg:w-1/2">
          <div className="flex flex-col">
            <h2 className="text-2xl">Role</h2>
            <p className="text-gray-400">Full Stack Developer</p>
          </div>
        </div>
        <div className="flex my-4 w-2/3 lg:w-1/2">
          <div className="flex flex-col">
            <h2 className="text-2xl">Call Me</h2>
            <p className="text-gray-400">Tel: 9900116870</p>
          </div>
        </div>
        <div className="flex my-4 w-2/3 lg:w-1/2">
          <div className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1">
            <i className="fab fa-facebook-f text-blue-900" />
          </div>
          <div className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1">
            <i className="fab fa-linkedin-in text-blue-900" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resume
