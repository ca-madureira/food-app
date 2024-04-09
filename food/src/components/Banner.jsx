import React from 'react'

const Banner = () => {
  return (
    <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
      <div className='py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8'>
        <div className='md:w-1/2'>
          <img src='/images/home/banner.png' alt='' />
          <div className='flex flex-col md:flex-row items-center justify-center justify-around -mt-14 gap-4'>
            <div className='flex bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-64'>
              <img
                src='/images/home/b-food1.png'
                alt=''
                className='rounded-2xl'
              />
              <div className='space-y-1'>
                <h5>Macarrão picante</h5>
                <div className='rating rating-sm'>
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-400'
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-400'
                    checked
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-400'
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-400'
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-400'
                  />
                </div>
                <p className='text-red'>R$49,99</p>
              </div>
            </div>
            <div className='sm:flex hidden bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-64'>
              <img
                src='/images/home/b-food1.png'
                alt=''
                className='rounded-2xl'
              />
              <div className='space-y-1'>
                <h5>Macarrão picante</h5>
                <div className='rating rating-sm'>
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-400'
                    readOnly
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-400'
                    checked
                    readOnly
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-400'
                    readOnly
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-400'
                    readOnly
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-400'
                    readOnly
                  />
                </div>
                <p className='text-red'>R$49,99</p>
              </div>
            </div>
          </div>
        </div>
        <div className='md:w-1/2 space-y-7 px-4'>
          <h2 className='md:text-5xl text-4xl font-bold md:leading-snug'>
            Mergulhe nas delícias da comida deliciosa
          </h2>
          <p className='text-xl text-[#4A4A4A]'>
            Onde cada prato tece uma história de maestria culinária.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Banner
