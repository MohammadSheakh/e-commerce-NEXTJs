import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'
import React from 'react'

import LenovoPc124 from '../../../public/images/Products/LenovoPc124.jpg';
import Image from 'next/image';
import SubNavbarOfProductDetails from '@/component/common/product/subNav/SubNavbarOfProductDetails';

export default function Profile() {
  const router = useRouter();
  const {productId} = router.query;
  return (
    <>
    <br/>
    <br/>
    <br/>
    
    {/* <div className='text-center'>Product Details Page for </div>
    <p>productId :  {productId}</p> */}


      <div className='border-2 '>
      {/* min-h-[300vh] */}
        <div className="grid grid-cols-12 ">
            
            <div class="lg:col-span-3  ">
              {/* flex justify-start xxl:justify-end */}
              <div className='pt-[70px]  flex justify-center content-center'>
                {/* Main Category */}
                {/* // product image  */}
                <Image
                src={LenovoPc124}
                width={200}
                // height={200}
                quality={75} // default is 75
                alt="Picture of banner"
                />

              </div>
              
            </div>
            
            <div className="col-span-9 lg:col-span-6 ">
                  <div className='pt-[70px] '>
                    {/* Banner */}
                  </div>
                    
                  <div class='pt-[10px] '>
                      Product Name 
                  </div>
                  <div class='pt-[10px] '>
                      Category Name, Brand Name ... 
                  </div>
                  
                  
                  <div class='pt-[10px] '>
                      Product Price 
                  </div>

                  <div class='pt-[10px] '>
                      Product Tags...  
                  </div>
                  <div class='pt-[10px] '>
                      Add To Cart , Place Order Buttons ... 
                  </div>
            </div>
            
            <div class="col-span-0 hidden  lg:block lg:col-span-3  ">
              <div className='pt-[70px] '>
                {/* Main Category */}
              </div>
            </div>
        </div>
        {/* // ekhon amra product er subNavbar er design korbo  */}
        <SubNavbarOfProductDetails/>
        <div className='bg-orange-400 w-20 h-96'>
dsd
        </div>
      </div> 
    </>
    
  )
}
