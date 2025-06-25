//src/pages/Login
import React, { useState } from 'react'

const Login = () => {

  const [currentState,setCurrentState] = useState('Login')

  const onSubmitHandle= async (event)=>{

    event.preventDefault()

  }


  return (
    <>
    <p className="text-xs text-gray-500 italic">
      *This is a dummy form. No data is collected or stored.
    </p>

    <form onSubmit={onSubmitHandle} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 '>
      <div className='inline-flex items-center gap-2 mb-2 mt-10 '>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState==='Login'?'':<input type="text" placeholder='name' className='w-full px-3 py-2 border border-gray-800' />}
      <input name='user_mail' type="email" placeholder='e-mail' className='w-full px-3 py-2 border border-gray-800'  required/>
      <input name='pass_key' type="password" placeholder='password' className='w-full px-3 py-2 border border-gray-800' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {currentState==='Login'?
      <p onClick={()=>{setCurrentState('Sign Up')}} className='cursor-pointer'>Create Account</p>:
      <p onClick={()=>{setCurrentState('Login')}} className='cursor-pointer'>Already have an Account</p>
      }
      {currentState==='Login'?<p className='cursor-pointer'>Forgot Password?</p>:''}  
      </div>
      <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState=='Login'?'Sign In':'Sign Up'}</button>
    </form>
    </>
    
  )
}

export default Login