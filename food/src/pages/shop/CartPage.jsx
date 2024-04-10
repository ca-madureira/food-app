import { FaTrash } from 'react-icons/fa'
import useCart from '../../hooks/useCart'
import Swal from 'sweetalert2'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'

const CartPage = () => {
  const [cart, refetch] = useCart()
  const { user } = useContext(AuthContext)
  const [cartItems, setCartItems] = useState([])

  const calculatePrice = (item) => {
    return item.price * item.quantity
  }

  const handleIncrease = (item) => {
    fetch(`http://localhost:6001/carts/${item._id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          }

          return cartItem
        })
        refetch()
        setCartItems(updatedCart)
      })
    refetch()
  }

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`http://localhost:6001/carts/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              }
            }
            return cartItem
          })
          refetch()
          setCartItems(updatedCart)
        })
      refetch()
    } else {
      alert('Item não pode ser zero')
    }
  }

  const cartSubtotal = cart.reduce((total, item) => {
    return total + calculatePrice(item)
  }, 0)

  const handleDelete = (item) => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você não poderá reverter',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete isto',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http:localhost:6001/carts/${item._id}`, { method: 'DELETE' })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: 'Deletado',
                text: 'Seu arquivo foi deletado',
                icon: 'success',
              })
            }
          })
      }
    })
  }
  return (
    <div className='section-container'>
      <div className='bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
        <div className='py-36 flex flex-col items-center justify-center gap-8'>
          <div className='px-4 space-y-7'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug'>
              Itens adicionados ao <span className='text-green'>Foodi</span>
            </h2>
          </div>
        </div>
      </div>

      <div>
        <div className='overflow-x-auto'>
          <table className='table'>
            {/* head */}
            <thead className='bg-green text-white rounded-sm'>
              <tr>
                <th>#</th>
                <th>Prato</th>
                <th>Itens</th>
                <th>Price</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className='flex items-center gap-3'>
                      <div className='avatar'>
                        <div className='mask mask-squircle w-12 h-12'>
                          <img
                            src={item.image}
                            alt='Avatar Tailwind CSS Component'
                          />
                        </div>
                      </div>
                      <div>
                        <div className='font-bold'>Hart Hagerty</div>
                        <div className='text-sm opacity-50'>United States</div>
                      </div>
                    </div>
                  </td>
                  <td className='font-medium'>{item.name}</td>
                  <td>
                    <button
                      className='btn btn-xs'
                      onClick={() => handleDecrease(item)}
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={item.quantity}
                      className='w-10 mx-2 text-center overflow-hidden appearance-none'
                    />
                    <button
                      className='btn btn-xs'
                      onClick={() => handleIncrease(item)}
                    >
                      +
                    </button>
                  </td>

                  <td>R${calculatePrice(item).toFixed(2)}</td>
                  <th>
                    <button
                      className='btn btn-ghost text-red btn-xs'
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className='my-12 flex flex-col md:flex-row justify-between items-start'>
        <div className='md:w-1/2 space-y-3'>
          <h3 className='font-medium'>Customer Details</h3>
          <p>Nome:{user.displayName}</p>
          <p>Email:{user.email}</p>
          <p>User_id:{user.uid}</p>
        </div>
        <div className='md:w-1/2 space-y-3'>
          <h3 className='font-medium'>Shopping details</h3>
          <p>Total de itens:{cart.length}</p>
          <p>Preço total: R${orderTotal.toFixed(2)}</p>
          <button className='btn bg-green text-white'>Proceder checkout</button>
        </div>
      </div>
    </div>
  )
}

export default CartPage
