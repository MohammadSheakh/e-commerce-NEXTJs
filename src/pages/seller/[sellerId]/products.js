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
import ProductCard from '@/component/common/product/productCard';
import SearchField from '@/component/home/SearchField';
import axios from 'axios';

export default function SellerProducts() {
  const router = useRouter();
  const {sellerId} = router.query;
  const [sellerData, setSellerData] = useState(null);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null); // from DB
  const [category, setCategory] = useState(null); // from DB
  const [tokenString, setTokenString] = useState(null);
  const [productForm, setProductForm] = useState({
    name : "",
    details: "",
    price: "",
    category: "",
    availableQuantity: "",
    lowestQuantityToStock: ""
}); // from front-end to DB

const [searchForm, setSearchForm] = useState({
  search: "",
});

const [refresh, setRefresh] = useState(false);

  const handleRefresh = ()=> {
      setRefresh(!refresh);
  }
  

  useEffect(() => {
    //console.log(router);
    // console.log(sellerId);
    try{
      // http://localhost:3000/seller/14
      

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

     
      const getAllSelectedCategoryFromBackEnd = async(token) =>{
        const id = JSON.parse(tokenString).userId;
        const response  = await axios.get( `http://localhost:3000/seller/getAllSelectedCategoryForSeller/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(response){
        //console.log("reponse from selectedCategory : ", response?.data)
        setCategory(response?.data);
        
      }
      }
      
      getAllSelectedCategoryFromBackEnd(JSON.parse(tokenString).accessToken);

      


      ///////////////////////////////////////////////
      ///////////////////////////////////////////////
    

    }catch(error){
      setError(error);
      console.log("Error 🔴", error)
    }

     
  },[])


  useEffect(()=>{
    const tokenString = localStorage.getItem('authForEcomerce');  
    
    getProductsDataFromBackEnd(JSON.parse(tokenString).accessToken);
    
  },[refresh]) // products eta likhle server e all time request jacche 🔴🔴🔴 

  const getProductsDataFromBackEnd = async(token) =>{

    const tokenString = localStorage.getItem('authForEcomerce');  
    
    const id = JSON.parse(tokenString).userId;
    const response = await axios.get(`http://localhost:3000/seller/getAllProductsDetailsBySellerId/${id}`,
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


  
  const getSearchResultProductsDataFromBackEnd = async(token, searchValue) =>{
    console.log("seachValue from  getSearchResultProductsDataFromBackEnd: ", searchValue)

    const tokenString = localStorage.getItem('authForEcomerce');  
    
    const id = JSON.parse(tokenString).userId;
     const response = await axios.get(`http://localhost:3000/seller/getProductsBySearch?searchValue=${searchValue}`,
    
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


  const onChange = (e) => {
    // onChange e validation korte hobe .. 
    console.log(e.target.name, " : ", e.target.value)
    setProductForm((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value, // ei ta xoss way to play with form data
    }));
};

const onChangeForSearchForm = (e) => {
  // onChange e validation korte hobe .. 
  const tokenString = localStorage.getItem('authForEcomerce');  
    
  console.log(e.target.name, " : ", e.target.value)
  setSearchForm((prevState) => ({
      [e.target.name]: e.target.value, // ei ta xoss way to play with form data
  }));

  // ekhanei amader ke database theke data pull kore niye ashte hobe .. 
  // logic.. 
  // 1. kichu search field e kichu na thakle shob data pull kore niye ashte hobe 
  // 2. kichu thakle  shei text related data pull kore niye ashte hobe .. 

  if(e.target.value == ""){
    // console.log("empty ")
    getProductsDataFromBackEnd(JSON.parse(tokenString).accessToken);
  }else{
    console.log("searchForm ::: ", searchForm)
    getSearchResultProductsDataFromBackEnd(JSON.parse(tokenString).accessToken, searchForm?.productSearch);
    // ekhane amra data niye ashbo
    // const token = JSON.parse(tokenString).accessToken;

    // console.log("token==================", token)

    // const response  = axios.get('http://localhost:3000/seller/getProductsBySearch',searchForm, {
    //   headers: {
    //      Authorization: `Bearer ${token}`,
    //   },
    // })
    // if(response){
    //   console.log("==============response from search : ", response.data);
    //   setProducts(response.data);
    // }
  }


  
};

  const handleSubmitNewProduct = (e) => {
    const tokenString = localStorage.getItem('authForEcomerce');    
    const token = JSON.parse(tokenString).accessToken;
      

    //e.preventDefault();
    console.log("product form ::: : ",productForm);
    ////////////////////////////////////////////////////////////////////const id = JSON.parse(tokenString).userId;
    const response = axios.post(`http://localhost:3000/seller/createProduct`,productForm,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(response){
      // Submit korar shathe shathe Modal ta close korte hobe 🔰
      
      setTimeout(() => {
        setRefresh(!refresh);
      }, 1000);
    }

  }
  
  return (
    <>
    <br/>
    <br/>
    <br/>
    
    {/* <p>productId :  {sellerId}</p> */}


      <div className=''>
      
      {/* <SellerProfile shopName={sellerData?.shopName} offlineShopAddress={sellerData?.offlineShopAddress} shopGoogleMapLink={sellerData?.googleMapLocation}/> */}
        
      <SellerProfile sellerImage={tokenString?.userImage} userId={tokenString?.userId} shopName={sellerData?.shopName} offlineShopAddress={sellerData?.offlineShopAddress} shopGoogleMapLink={sellerData?.googleMapLocation}/>

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
                  
                  <form className="modal-action flex flex-col"  noValidate method="dialog" onSubmit={handleSubmitNewProduct}>
                    <div class="mb-6">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                      <input onChange={onChange} type="name" id="name" name='name' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product name here..." />
                    </div>

                    <div class="mb-6">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
                      <textarea onChange={onChange} type="name" id="details" name='details' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product details here..." />
                    </div> 


                    <div class="mb-6">
                      <label for="productImage" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                      <input type="file" id="productImage" name='productImage' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                    </div> 

                    

                    <div class="mb-6">
                      <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                      <input onChange={onChange} type="text" id="price" name='price' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product price here..." />
                    </div>

                    // Brand
                    {/* // ei seller jei brand and category gula DB te add korse .. shegula show korbe  */}
                    {/* // Category */}

                    <div class="mb-6">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
                      
                      <select onChange={onChange} id="category" name="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                      <option value="Select A Category">---- Select A Category ----</option>
                        {
                          category?.map((category)=>(
                            <option value={category.categoryId.CategoryID}>{category.categoryId.name}</option>
                          ))
                        }
                      </select>
                  </div>

                  
                    
                    <div class="mb-6">
                      <label for="availableQuantity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available Quantity</label>
                      <input type="text" onChange={onChange} name='availableQuantity' id="availableQuantity" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write available quantity here..." />
                    </div>
                    
                    <div class="mb-6">
                      <label for="lowestQuantityToStock" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lowest Quantity To Stock</label>
                      <input type="text" onChange={onChange} name='lowestQuantityToStock' id="lowestQuantityToStock" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write lowest quantity to stock here..." />
                    </div>
                    
                    <button  type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
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

            {/* // Search Field  -------------------------------------------------Start-------------*/}    

            
            {/* <SearchField/> */}
            <div className="border-solid  overflow-hidden">
                <form class="flex justify-center content-center" role="search">
                    <input className='rounded-lg w-56  text-orange-800' name="productSearch" onChange={onChangeForSearchForm}  placeholder='Search'/>
                    {/* text-orange-800 🔰🔗⚫ text er color set korte hobe  */}
                    <button type="submit"  className='border-2 rounded-lg ml-3 p-1'>Search</button>
                </form>
            </div>
            {/* // Search Field  -------------------------------------------------End-------------*/}    

          </div>
          
          {/* already add kora product er list thakbe  */}
          <div className='flex gap-3 p-3' >
            {products && products.map((product) => (
              <>
                 <ProductCard key={product.productId} product={product} sellerID={sellerId} />
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

