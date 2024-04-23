import { FaTrashAlt } from 'react-icons/fa'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const ManageItems = () => {
  const [menu, refetch] = useMenu()
  const axiosSecure = useAxiosSecure()

  const handleDeleteItem = (item) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Não podera reverter esta acao',
      icon: 'warning',
      showCancelButton: '#3085d6',
      cancelButtonColor: 'd33',
      confirmButtonText: 'Sim, deletar isto',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`)
        if (res) {
          refetch()
          Swal.fire({
            title: 'Deletado',
            text: 'Seu arquivo foi deletado',
            icon: 'success',
          })
        }
      }
    })
  }
  return (
    <div className='w-full md:w-[870px] px-4 mx-auto'>
      <h2 className='text-2xl font-semibold my-4'>
        Manage all<span className='text-green'>Menu Items</span>
      </h2>
      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
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
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <Link to={`/dashboard/update-menu/${item._id}`}>
                    <button className='btn btn-ghost btn-xs'>
                      <FaEdit />
                      Update
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className='btn btn-ghost btn-xs'
                  >
                    <FaTrashAlt />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  )
}

export default ManageItems
