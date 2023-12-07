import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import Image from 'next/image';
import SubNavbarOfProductDetails from '@/component/common/productDetails/subNav/SubNavbarOfProductDetails';
import SubNavbarOfSellerProfile from '@/component/seller/subNav/SubNavbarOfSellerProfile';
import MainCategory from '@/layout/mainCategory';
import { MdOutlineLocationCity } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import Banner from '@/component/home/Banner';
import SellerProfile from '@/component/seller/profile/SellerProfile';
import Conversations from '@/component/seller/conversation/conversations';
import ConversationBody from '@/component/seller/conversation/conversationBody';

export default function SellerProducts() {
  const router = useRouter();
  const {sellerId} = router.query;
  const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);

  useEffect(() => {
    // current logged in user email lagbe .. 
    const tokenString = localStorage.getItem('authForEcomerce');
    const loggedInUserEmail1 = JSON.parse(tokenString).user.userEmailAddress;
    setLoggedInUserEmail(loggedInUserEmail1);
    // console.log("loggedInUserEmail", JSON.parse(tokenString).user.userEmailAddress)
  },[])

  return (
    <>
    <br/>
    <br/>
    <br/>
    
    {/* <p>productId :  {sellerId}</p> */}


      <div className=''>
      
        <SellerProfile/>
        <div className='mx-4 my-4 rounded-md bg-PrimaryColorDarkHover w-auto h-96 text-PureWhite'>
          {/* Conversation */}
          <div className='flex justify-center'>
              {/* conversation List */}
              <div className='w-[300px] rounded-md h-auto bg-PrimaryColorDark'>
                <Conversations loggedInUserEmail={loggedInUserEmail}/>
              </div>
              {/* converation body */}
              <div className='w-[900px] rounded-md  h-96 bg-navbarColorGray'>
                <ConversationBody loggedInUserEmail={loggedInUserEmail}/>
              </div>
          </div>
        </div>
      </div> 
    </>
    
  )
}

