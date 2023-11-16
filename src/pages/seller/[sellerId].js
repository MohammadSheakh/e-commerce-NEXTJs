import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'
import React from 'react'

export default function Profile() {
  const router = useRouter();
  const {sellerId} = router.query;
  return (
    <>
    <Navbar/>

    <br/>
    <br/>
    <br/>
    
    <div className='text-center'>Seller Profile Page for </div>
    <p>sellerId :  {sellerId}</p>

    <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost">
                    dashboard
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Homepage</a></li>
                    <li><a>Portfolio</a></li>
                    <li><a>About</a></li>
                </ul>
            </div>
    </>
    
    
  )
}
