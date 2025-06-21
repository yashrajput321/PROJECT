//src/Components/NewsletterBox
import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event)=>{
        event.preventDefault();
    }

  return (
    <div className='text-center mb-4'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-4'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum explicabo illum est unde vero nisi non suscipit fugit voluptates incidunt deleniti facilis, quam cumque autem. Alias voluptates facere reprehenderit eius?
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type='email' placeholder='Enter your e-mail' required />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4' >Subscribe</button>
        </form>
    </div>
  )
}

export default NewsletterBox