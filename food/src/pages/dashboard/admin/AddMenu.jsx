import { FaUtensils } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'

const AddMenu = () => {
  const { register, handleSubmit, reset } = useForm()
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
  const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`

  const onSubmit = async (data) => {
    console.log(data)
    const imageFile = { image: data.image[0] }
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    if (hostingImg.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: 'sdsa',
      }
      const postMenuItem = axiosSecure.post('/menu', menuItem)
      if (postMenuItem) {
        reset()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Seu item foi inserido com sucesso',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    }
  }
  return (
    <div className='w-full md:w-[870px] px-4 mx-auto'>
      <h2 className='text-2xl font-semibold my-4'>
        Carregar novo <span className='text-green'>Menu Item</span>
      </h2>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Nome do prato*</span>
            </label>
            <input
              type='text'
              {...register('name', { required: true })}
              placeholder='Nome do prato'
              className='input input-bordered w-full'
            />
          </div>

          <div className='flex items-center gap-4'>
            <div className='form-control w-full my-6'>
              <label className='label'>
                <span className='label-text'>Categoria</span>
              </label>
              <select
                {...register('category', { required: true })}
                className='select select-bordered'
                defaultValue='default'
              >
                <option disabled value='default'>
                  Selecione categoria*
                </option>
                <option value='salad'>Salada</option>
                <option value='pizza'>Pizza</option>
                <option value='soup'>Sopa</option>
                <option value='dessert'>Sobremesa</option>
                <option value='drinks'>Drinks</option>
                <option value='popular'>Popular</option>
              </select>
            </div>
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text'>Preço*</span>
              </label>
              <input
                type='number'
                {...register('price', { required: true })}
                placeholder='Preço'
                className='input input-bordered w-full'
              />
            </div>
          </div>

          <div className='form-control '>
            <label className='label'>
              <span className='label-text'>Detalhes</span>
            </label>
            <textarea
              {...register('recipe', { required: true })}
              className='textarea textarea-bordered h-24'
              placeholder='Detalhes do prato'
            ></textarea>
          </div>

          <div className='form-control w-full my-6'>
            <input
              {...register('image', { required: true })}
              type='file'
              className='file-input w-full max-w-xs'
            />
          </div>

          <button className='btn bg-green text-white px-6'>
            <FaUtensils /> Adicionar
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddMenu
