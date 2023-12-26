import Navbar from '@/pages/layout/navbar';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import LenovoPc124 from '../../../../public/images/Products/LenovoPc124.jpg';

import Image from 'next/image';
import SubNavbarOfProductDetails from '@/component/common/productDetails/subNav/SubNavbarOfProductDetails';
import SubNavbarOfSellerProfile from '@/component/seller/subNav/SubNavbarOfSellerProfile';
import MainCategory from '@/pages/layout/mainCategory';
import { MdOutlineLocationCity } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import Banner from '@/component/home/Banner';
import SellerProfile from '@/component/seller/profile/SellerProfile';
import ReviewCard from '@/component/common/review/reviewCard';
import axios from 'axios';


export default function SellerStatistics() {
  const router = useRouter();
  const {sellerId} = router.query;
  const [tokenString, setTokenString] = useState(null);
  const [sellerData, setSellerData] = useState(null);

  useEffect(() => {
      try{
        const tokenString = localStorage.getItem('authForEcomerce'); 
        setTokenString(JSON.parse(tokenString));    
        
  
        const getSellerDataFromBackEnd = async(token) =>{
          
          const id = JSON.parse(tokenString).userId;
          const response = await axios.get(`http://localhost:3000/seller/${id}`,
          {
            headers: {
               Authorization: `Bearer ${token}`,
            },
          }
          );
          if(response){
            setSellerData(response.data);
            console.log("🏠🏠🏠🏠 from products.js : ::", response.data)
          }
        }
  
        
        getSellerDataFromBackEnd(JSON.parse(tokenString).accessToken);
  
      }catch(err){
        
      }
  },[])

  return (
    <>
    <br/>
    <br/>
    <br/>
    
    {/* <p>productId :  {sellerId}</p> */}


      <div className=''>
      
        <SellerProfile sellerImage={tokenString?.userImage} userId={tokenString?.userId} shopName={sellerData?.shopName} offlineShopAddress={sellerData?.offlineShopAddress} shopGoogleMapLink={sellerData?.googleMapLocation}/>

        <div className=' w-auto h-auto text-PureWhite'>
         jnj


        </div>
      </div> 
    </>
    
  )
}

