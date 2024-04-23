import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../contexts/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
  const { updateUserProfile } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'

  const onSubmit = (data) => {
    const name = data.name
    const photoURL = data.photoURL
    updateUserProfile(name, photoURL)
      .then(() => {
        // Profile updated!
        navigate(from, { replace: true })
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      })
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
        <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
          <h3 className='font-bold'>Atualize seu perfil</h3>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Nome</span>
            </label>
            <input
              {...register('name')}
              type='text'
              placeholder='seu nome'
              className='input input-bordered'
              required
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Carregar foto</span>
            </label>

            <input
              type='text'
              {...register('photoURL')}
              placeholder='imagem'
              className='input input-bordered'
              required
            />
          </div>
          <div className='form-control mt-6'>
            <button className='btn bg-green text-white'>Atualizar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile
