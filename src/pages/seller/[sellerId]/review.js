import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'
import React from 'react'

import LenovoPc124 from '../../../../public/images/Products/LenovoPc124.jpg';

import Image from 'next/image';
import SubNavbarOfProductDetails from '@/component/common/productDetails/subNav/SubNavbarOfProductDetails';
import SubNavbarOfSellerProfile from '@/component/seller/subNav/SubNavbarOfSellerProfile';
import MainCategory from '@/layout/mainCategory';
import { MdOutlineLocationCity } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import Banner from '@/component/home/Banner';
import SellerProfile from '@/component/seller/profile/SellerProfile';
import ReviewCard from '@/component/common/review/reviewCard';


export default function SellerProducts() {
  const router = useRouter();
  const {sellerId} = router.query;
  return (
    <>
    <br/>
    <br/>
    <br/>
    
    {/* <p>productId :  {sellerId}</p> */}


      <div className=''>
      
        <SellerProfile/>
        <div className=' w-auto h-auto text-PureWhite'>
          {/* Review */}
          {/* 
          //3 ta category thakbe .. 
          // positive review 
          // negative review 
          // after sales review  */}

          <div className="tabs tabs-lifted mx-6">
            <input type="radio" name="my_tabs_2" className="tab w-auto bg-PrimaryColorDark hover:bg-PrimaryColorDarkHover  checked:bg-PrimaryColorLight" aria-label="Review" checked />
            
            {/* active:bg-PrimaryColorLight */}
            <div className="tab-content bg-base-100 border-base-300 rounded-box pt-6 ">
              {/* Tab content 1 p-10*/}
              {/* ///////////////////////////////////////////////// */}
              
              <ReviewCard/>
              
              
              <ReviewCard/>
              <ReviewCard/>
              
              {/* ///////////////////////////////////////////////// */}
            </div>

            <input type="radio" name="my_tabs_2" className="tab w-auto bg-PrimaryColorDark hover:bg-PrimaryColorDarkHover" aria-label="Shipping And Delevery Review"  />
            <div className="tab-content bg-base-100 border-base-300 rounded-box p-10">
              {/* Tab content 2 */}
            </div>

            <input type="radio" name="my_tabs_2" className="tab w-auto bg-PrimaryColorDark hover:bg-PrimaryColorDarkHover" aria-label="After Sales Service" />
            <div className="tab-content bg-base-100 border-base-300 rounded-box p-10">
              {/* Tab content 3   */}
            </div>
          </div>


        </div>
      </div> 
    </>
    
  )
}

