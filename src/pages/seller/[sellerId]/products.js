import Navbar from '@/layout/navbar';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

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
import ProductCard from '@/component/common/product/productCard';
import SearchField from '@/component/home/SearchField';
import axios from 'axios';

export default function SellerProducts() {
  const router = useRouter();
  const {sellerId} = router.query;
  const [sellerData, setSellerData] = useState(null);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    try{
      // http://localhost:3000/seller/14
      

      const tokenString = localStorage.getItem('authForEcomerce');    
      console.log("🔗 tokenString  🟢 : ", JSON.parse(tokenString).userId );
      

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
          
        }
      }

      const getProductsDataFromBackEnd = async(token) =>{
        
        const id = JSON.parse(tokenString).userId;
        const response = await axios.get(`http://localhost:3000/seller/getAllProductsDetailsById/${id}`,
        {
          headers: {
             Authorization: `Bearer ${token}`,
          },
        }
        );
        if(response){
          setProducts(response.data);
          
        }
      }
      
      getProductsDataFromBackEnd(JSON.parse(tokenString).accessToken);
      getSellerDataFromBackEnd(JSON.parse(tokenString).accessToken);

      console.log("seller profile 🟢useEffect-> sellerData from database .. formData from front-End🟢","==🔰==", products)
        
    }catch(error){
      setError(error);
      console.log("Error 🔴", error)
    }
     
  },[])//sellerId

  return (
    <>
    <br/>
    <br/>
    <br/>
    
    {/* <p>productId :  {sellerId}</p> */}


      <div className=''>
      
      <SellerProfile shopName={sellerData?.shopName} offlineShopAddress={sellerData?.offlineShopAddress} shopGoogleMapLink={sellerData?.googleMapLocation}/>
        
        {/* <SellerProfile/> */}
        <div className='mx-4 my-4 rounded-md bg-PrimaryColorDarkHover w-auto h-auto text-PureWhite'>
          {/* Products */}
          {/* ekhane ekta addProduct Button thakbe  */}
          {/* product search kora jabe  */}
          <div>
            {/* // Add product Modal  -------------------------------------------------- Start ------------*/}
            {/* <button className='btn m-3' >Add Product</button> */}


            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn m-3" onClick={()=>document.getElementById('my_modal_1').showModal()}>Add Product</button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">X</button>
                      </form>
                    </div>
                  {/* ////////////////////////////////////////////////// */}
                  <form>
                    <div class="mb-6">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                      <input type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product name here..." required/>
                    </div>

                    <div class="mb-6">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
                      <textarea type="name" id="details" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product details here..." required/>
                    </div>


                    <div class="mb-6">
                      <label for="productImage" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                      <input type="file" id="productImage" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                    </div>

                    

                    <div class="mb-6">
                      <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                      <input type="text" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product price here..." required/>
                    </div>

                    // Brand
                    {/* // ei seller jei brand and category gula DB te add korse .. shegula show korbe  */}
                    // Category

                    availableQuantity
                    <div class="mb-6">
                      <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                      <input type="text" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product price here..." required/>
                    </div>
                    lowestQuantityToStock
                    <div class="mb-6">
                      <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                      <input type="text" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product price here..." required/>
                    </div>
                    
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                  </form>
                  {/* ////////////////////////////////////////////////// */}
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
              {/* // Add product Modal  -------------------------------------------------End-------------*/}    



            <SearchField/>
          </div>
          
          {/* already add kora product er list thakbe  */}
          <div className='flex gap-3 p-3' >
            {products && products.map((product) => (
              <>
                 <ProductCard key={product.productId} product={product}/>
              </>
              
            )
            )}
            {/* <ProductCard/>
            <ProductCard/> */}
          </div>
          
          
          {/* product sort kora jabe  */}



        </div>
      </div> 
    </>
    
  )
}

