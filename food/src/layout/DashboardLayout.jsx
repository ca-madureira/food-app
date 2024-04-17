import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { MdDashboard, MdDashboardCustomize } from 'react-icons/md'
import { FaLocationArrow, FaQuestionCircle, FaUser } from 'react-icons/fa'
import { FaShoppingBag } from 'react-icons/fa'
import { FaPlusCircle } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { FaRegUser } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'

import logo from '/logo.png'
import useAdmin from '../hooks/useAdmin'

const sharedLinks = (
  <>
    <li className='mt-3'>
      <Link to='/'>
        <MdDashboard />
        Home
      </Link>
    </li>
    <li>
      <Link to='/menu'>
        <FaLocationArrow />
        Orders Tracking
      </Link>
    </li>
    <li>
      <Link to='/menu'>
        <FaQuestionCircle />
        Customer Support
      </Link>
    </li>
  </>
)
const DashboardLayout = () => {
  const [loading] = useAuth()
  const [isAdmin, isAdminLoading] = useAdmin()
  return (
    <div>
      {isAdmin ? (
        <div>
          <div className='drawer lg:drawer-open'>
            <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
            <div className='drawer-content flex flex-col sm:items-start sm:justify-center my-2'>
              <div className='flex items-center justify-between mx-4'>
                {' '}
                <label
                  htmlFor='my-drawer-2'
                  className='btn btn-primary drawer-button lg:hidden'
                >
                  <MdDashboardCustomize />
                </label>
                <button className='btn rounded-full px-6 bg-green flex items-center gap-2 text-white sm:hidden'>
                  <FaRegUser />
                  Deslogar
                </button>
              </div>

              <Outlet />
            </div>
            <div className='drawer-side'>
              <label
                htmlFor='my-drawer-2'
                aria-label='close sidebar'
                className='drawer-overlay'
              ></label>
              <ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
                <li>
                  <Link to='/dashboard' className='flex justify-start mb-3'>
                    <img src={logo} alt='' className='w-20' />
                    <span className='badge badge-primary'>admin</span>
                  </Link>
                </li>
                <hr />
                <li className='mt-3'>
                  <Link to='/dashboard'>
                    <MdDashboard />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to='/dashboard'>
                    <FaShoppingBag />
                    Manage Bookings
                  </Link>
                </li>
                <li>
                  <Link to='/dashboard'>
                    <FaPlusCircle />
                    Add Menu
                  </Link>
                </li>
                <li>
                  <Link to='/dashboard'>
                    <FaEdit />
                    Manage Items
                  </Link>
                </li>
                <li className='mb-3'>
                  <Link to='/dashboard/users'>
                    <FaUser />
                    Todos os usuários
                  </Link>
                </li>
                <hr />
                {sharedLinks}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default DashboardLayout
