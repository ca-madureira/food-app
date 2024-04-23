import useAuth from '../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
const Order = () => {
  const { user } = useAuth()
  const token = localStorage.getItem('access-token')

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:6001/payments?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      return res.json()
    },
  })

  const formatData = (createdAt) => {
    const createdAtDate = new Date(createdAt)
    return createdAtDate.toLocaleDateString()
  }
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className='bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%'>
        <div className='py-28 flex flex-col items-center justify-center'>
          <div className='text-center px-4 space-y-7'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
              Acompanhe seus <span className='text-green'>pedidos</span>
            </h2>
          </div>
        </div>
      </div>

      <div>
        {orders.length > 0 ? (
          <div>
            <div className=''>
              <div className='overflow-x-auto'>
                <table className='table'>
                  {/* head */}
                  <thead className='bg-green text-white rounded-sm'>
                    <tr>
                      <th>#</th>
                      <th>Data do Pedido</th>
                      <th> ID Transação</th>
                      <th>Preço</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{formatDate(item.createdAt)}</td>
                        <td>{item.transitionId}</td>
                        <td>R${item.price}</td>
                        <td>{item.status}</td>
                        <td>
                          <Link
                            to='/contact'
                            className='btn btn-sm border-none text-red bg-transparent'
                          >
                            Contact
                          </Link>
                        </td>
                        <td>
                          <div className='avatar'>
                            <div className='mask mask-squircle w-12 h-12'>
                              <img
                                src={item.image}
                                alt='Avatar Tailwind CSS Component'
                              />
                            </div>
                          </div>
                        </td>
                        <td className='font-medium'>{item.name}</td>
                        <td>
                          <button className='btn btn-xs'>-</button>
                          <input
                            type='number'
                            value={item.quantity}
                            onChange={() => console.log(item.quantity)}
                            className='w-10 mx-2 text-center overflow-hidden appearance-none'
                          />
                          <button className='btn btn-xs'>+</button>
                        </td>
                        <td>${calculateTotalPrice(item).toFixed(2)}</td>
                        <td>
                          <button className='btn btn-sm border-none text-red bg-transparent'></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* foot */}
                </table>
              </div>
            </div>
            <hr />
            <div className='flex flex-col md:flex-row justify-between items-start my-12 gap-8'>
              <div className='md:w-1/2 space-y-3'>
                <h3 className='text-lg font-semibold'>Customer Details</h3>
                <p>Name: {user?.displayName || 'None'}</p>
                <p>Email: {user?.email}</p>
                <p>
                  User_id: <span className='text-sm'>{user?.uid}</span>
                </p>
              </div>
              <div className='md:w-1/2 space-y-3'>
                <h3 className='text-lg font-semibold'>Shopping Details</h3>
                <p>Total Items: {cart.length}</p>
                <p>
                  Total Price:{' '}
                  <span id='total-price'>${orderTotal.toFixed(2)}</span>
                </p>
                <button className='btn btn-md bg-green text-white px-8 py-1'>
                  Procceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='text-center mt-20'>
            <p>Carrinho está vazio. Favor, adicionar produtos ao carrinho</p>
            <Link to='/menu'>
              <button className='btn bg-green text-white mt-3'>Voltar</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Order
