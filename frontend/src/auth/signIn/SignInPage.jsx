import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const SignInPage = () => {
  return (

    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-800 to-teal-600">
  <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md mx-auto transform transition-all duration-500 hover:scale-105">
    <div className="text-center mb-6">
      <h2 className="text-3xl font-extrabold text-gray-800 tracking-wide">Welcome Back</h2>
      <p className="text-lg text-gray-500">Please sign in to continue</p>
    </div>
    <SignIn />
  </div>
</div>

  

  )
}

export default SignInPage