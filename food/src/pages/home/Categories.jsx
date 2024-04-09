import React from 'react'

const categoryItems = [
  {
    id: 1,
    title: 'Prato Principal',
    despriction: '(86 pratos)',
    image: '/images/home/category/img1.png',
  },
  {
    id: 2,
    title: 'Café da manhã',
    despriction: '(12 café da manhã)',
    image: '/images/home/category/img2.png',
  },
  {
    id: 3,
    title: 'Sobremesa',
    despriction: '(48 sobremesas)',
    image: '/images/home/category/img3.png',
  },
  {
    id: 4,
    title: 'Outros',
    despriction: '(255 Itens)',
    image: '/images/home/category/img4.png',
  },
]

const Catagories = () => {
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16'>
      <div className='text-center'>
        <p className='subtitle'>Favoritos do cliente</p>
        <h2 className='title'>Categorias Populares</h2>
      </div>

      {/* category cards */}
      <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12 '>
        {categoryItems.map((item, i) => (
          <div
            key={i}
            className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300 z-10'
          >
            <div className='w-full mx-auto flex items-center justify-center'>
              <img
                src={item.image}
                alt=''
                className='bg-[#C1F1C6] p-5 rounded-full w-28 h-28'
              />
            </div>
            <div className='mt-5 space-y-1'>
              <h5 className='text-[#1E1E1E] font-semibold'>{item.title}</h5>
              <p className='text-secondary text-sm'>{item.despriction}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Catagories
