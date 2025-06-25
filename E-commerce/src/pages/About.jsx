//src/pages/About
import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../Components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit magnam ullam praesentium illo voluptas repellat tempora. Atque, delectus. Est, quisquam eius sed rem corporis laboriosam quae amet explicabo perspiciatis provident aliquam quas laudantium nemo.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti necessitatibus accusantium repellat quas sint. Iure velit quidem saepe minima, reiciendis odit omnis beatae nobis mollitia sequi atque quia nisi, ducimus, dicta doloribus quibusdam? Aperiam, quidem provident ratione perferendis dolores maiores. Neque modi quae magnam tempora.</p>
          <b>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione eum mollitia nobis! Molestias, aliquid dolor quidem modi voluptatem eum temporibus non consequuntur maiores, possimus pariatur eveniet laborum rem? Unde totam modi, placeat repudiandae dolorem aliquid odit.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm md-20 mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique, perspiciatis maxime explicabo, quasi odit non nemo accusamus voluptatem quo totam saepe. Porro quo dolore tenetur doloribus veritatis nobis soluta corporis quos ea iusto et nemo, laudantium odio totam natus quam.</p>
        </div>
        <div className='border-t border-b px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique, perspiciatis maxime explicabo, quasi odit non nemo accusamus voluptatem quo totam saepe. Porro quo dolore tenetur doloribus veritatis nobis soluta corporis quos ea iusto et nemo, laudantium odio totam natus quam.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique, perspiciatis maxime explicabo, quasi odit non nemo accusamus voluptatem quo totam saepe. Porro quo dolore tenetur doloribus veritatis nobis soluta corporis quos ea iusto et nemo, laudantium odio totam natus quam.</p>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default About