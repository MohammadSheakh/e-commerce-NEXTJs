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
import ReviewCard from '@/component/common/review/reviewCard';
import axios from 'axios';
import { BiLike, BiSolidLike  } from "react-icons/bi";
import { BiDislike, BiSolidDislike  } from "react-icons/bi";
import { FaDeleteLeft } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';

export default function SellerProducts() {
  const router = useRouter();
  const {sellerId} = router.query;
  const [loading, setLoading] = useState(false);
 const [generalReviews, setGeneralReviews] = useState(null);
 const [afterSalesReviews, setAfterSalesReviews] = useState(null);

 const [refresh, setRefresh] = useState(false);

 const handleRefresh = ()=> {
  //setTimeout(()=> {
    setRefresh(!refresh);
  //},1000)
  
 }

 ////////////////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////////////////
 const [showAllReplies, setShowAllReplies] = useState(false);

 const [review, setReview] = useState(null);
 const [likeDislikeStatus, setLikeDislikeStatus] = useState(false);


 const [reviewReplyForm, setReviewReplyForm] = useState({
   replyDetails: "",
   reviewId: 0,// review?.reviewId
   sellerId: "", // sellerId from local storage

 });

 const toggleRepliesVisibility = () => {
   setShowAllReplies(!showAllReplies);
 };
 
  
 const getAllGeneralReviewForSeller = async(token) =>{
  
  const response = await axios.get(`http://localhost:3000/seller/getAllGeneralReview/14`,{
    headers:{
      Authorization: `bearer ${token}`
    }
  });

  if(response.data){

    setGeneralReviews(response.data);
   // console.log(response.data)
  }
}

const getAllAfterSalesReviewForSeller = async(token) =>{

  const response = await axios.get(`http://localhost:3000/seller/getAllAfterSalesReview/14`,{
    headers:{
      Authorization: `bearer ${token}`
    }
  });
  if(response.data){
    console.log("🏠🏠🏠🏠 all afterSales Review : ", response.data)
    setAfterSalesReviews(response.data);
    //console.log(response.data)
  }
}


  useEffect(() => {
    // ei seller er under e joto review ase .. DB theke pull kore niye ashte hobe
    
    const tokenString = localStorage.getItem('authForEcomerce'); 

    getAllAfterSalesReviewForSeller(JSON.parse(tokenString).accessToken);
    getAllGeneralReviewForSeller(JSON.parse(tokenString).accessToken);

  },[])

  useEffect(() => {
    console.log("get review data")
    const tokenString = localStorage.getItem('authForEcomerce'); 

    
    getAllAfterSalesReviewForSeller(JSON.parse(tokenString).accessToken);
    getAllGeneralReviewForSeller(JSON.parse(tokenString).accessToken);

    
  }, [refresh])
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////// For Review Card////////////////////////

  
 

  useEffect(() =>{
    // reviwId er upor base kore .. full review db
    // theke niye ashte hobe 
    const tokenString = localStorage.getItem('authForEcomerce'); 
    

    //let reviewID = review?.reviewId;
    const getReviewByReviewId = async(token) =>{
      
      if(review?.reviewId != null){
        setLoading(false);
      const response = await axios.get(`http://localhost:3000/seller/getReviewByReviewId/${review.reviewId}`,{
        headers:{
          Authorization: `bearer ${token}`
        }
      });
      if(response.data){
        setReview(response.data);

       // console.log(response.data)
      }
    }
    }
    getReviewByReviewId(JSON.parse(tokenString).accessToken);

  },[likeDislikeStatus ,refresh])//refresh , afterSalesReviews


  const handleDelete = async(reviewId) => {
    // console.log("delete clicked");
    const response = await axios.delete(`http://localhost:3000/seller/deleteReviewByReviewId/${reviewId}`,{
      headers:{
        Authorization: `bearer ${JSON.parse(localStorage.getItem('authForEcomerce')).accessToken}`
      }
    })

    if(response.data){
      setTimeout(()=> {
        setRefresh(!refresh);
      }, 1000)
      
      
     // router.push("/seller/14/review"); 
    }
    
  }

  
  const handleReplyDelete = async(replyId) => {
    // console.log("delete clicked");
    const response = await axios.delete(`http://localhost:3000/seller/deleteReplyByReplyId/${replyId}`,{
      headers:{
        Authorization: `bearer ${JSON.parse(localStorage.getItem('authForEcomerce')).accessToken}`
      }
    })

    if(response.data){
      setTimeout(()=> {
        setRefresh(!refresh);
      }, 1000)
      
      
     // router.push("/seller/14/review"); 
    }
    
  }

  
  const onChange = (e) => {
    // onChange e validation korte hobe .. 
    console.log(e.target.name, " : ", e.target.value)
    setReviewReplyForm((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value, // ei ta xoss way to play with form data
    }));
  };

  const handleReplySubmit = (e, reviewId) =>{
    const token = JSON.parse(localStorage.getItem('authForEcomerce')).userId;
    const token2 = JSON.parse(localStorage.getItem('authForEcomerce')).accessToken;
    
    e.preventDefault();
    reviewReplyForm.sellerId = token;
    reviewReplyForm.reviewId = reviewId;
    console.log("handle reply submit : ", reviewReplyForm);

    const response = axios.post("http://localhost:3000/seller/addReplyToAReview", reviewReplyForm,{
      headers:{
        Authorization: `bearer ${token2}`
      }
   
    })
    if(response.data){
      router.push("/seller/14/review"); 
      handleRefresh();
    }
  }

  const likeDislike = async(statusValue, reviewId) => {
    const token = JSON.parse(localStorage.getItem('authForEcomerce')).userId;
    const token2 = JSON.parse(localStorage.getItem('authForEcomerce')).accessToken;
    console.log(token2);
    console.log(token, "=======", token2);
    const response  = await axios.post(`http://localhost:3000/seller/doLikeDislikeToAReview?reviewId=${reviewId}&sellerId=${token}&likeDislikeStatus=${statusValue}`,{
      headers:{
        // Authorization: `bearer ${JSON.parse(localStorage.getItem('authForEcomerce')).accessToken}`
        Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWxsZXJFbWFpbEFkZHJlc3MiOiJhQGdtYWlsLmNvbSIsInN1YiI6IjE0IiwiaWF0IjoxNzAyNjU2NjUzLCJleHAiOjE3MDI2NTY3MTN9.hT5wwEItrzXIyRw1a7WxnbvYWNzZiQ3g0cxZPD-V-Gc`
        
      }
    })
    if(response.data){
      // hoy er basis e like count ta update korbo 
      // othoba db er arekta operation chalabo ekhane
      console.log("====== reponse.data : ", response.data) 
      setLikeDislikeStatus(!likeDislikeStatus);
      setTimeout(()=> {
        setRefresh(!refresh);
      }, 1000)

    }
  }

  const handleLikeDislike = (e, statusValue) => {
    //e.preventDefault();
    
    

    likeDislike(statusValue);
    
  }
  

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
          

          <div className="tabs tabs-lifted mx-6">
            <input type="radio" name="my_tabs_2" className="tab w-auto bg-PrimaryColorDark hover:bg-PrimaryColorDarkHover  checked:bg-PrimaryColorLight" aria-label="Review"  />
            
            {/* active:bg-PrimaryColorLight */}
            <div className="tab-content bg-base-100 border-base-300 rounded-box pt-6 ">
              {/* Tab content 1 p-10*/}
              {/* ///////////////////////////////////////////////// */}
              <div className='flex justify-end'>
              <button   onClick={handleRefresh}>Refresh</button>
              </div>
              
              {

                  generalReviews?.map((review) =>{
                  return (
                    ////////////////////////////////////////////////////////////////////////////// Review Card Start Master/////////////////////////
                    //  <ReviewCard reviewId={review.reviewId}/>
                    
<div id='reviewBody' style={{marginBottom:"10px"}} className='relative rounded-lg p-4 w-auto h-auto bg-PrimaryColorDarkHover border-2'>
                <div >
                  {/* // user image  */}
                  <div className='flex'>

                  <Image
                    className='rounded-full'
                    src={LenovoPc124}
                    width={50}
                    // height={200}
                    quality={75} // default is 75
                    alt="Picture of user"
                  />
                  <div>
                    
                     {/* <h1 className='ml-3'>Mohammad Bin Ab. Jalil Sheakh</h1> */}
                     <h1 className='ml-3'>{review?.sellerId?.sellerName}</h1>
                      
                  </div>
                  </div>

                  <div style={{marginLeft:"70px"}} className='rounded-md relative left-[35px] top-[-15px] ml-9 w-96 h-auto bg-PrimaryColorDark'>
                          {/* Review Body...........................................
                          .....................................................
                          .....................................................
                          ..................................................... */}
                          {review?.reviewDetails}
                  </div>
                  {/* ////////////////////////////// Review Reply gula ekhane thakbe - START ///////////////////////////////////////////// */}

                  

                  {/* //border */}
                  <div className="max-w-md mx-auto p-4 ">
                        {review?.replies?.slice(0, showAllReplies ? review?.replies?.length : 1).map((reply, index) => (
                          <div key={index} className="reply">
                            <p>{reply.replyDetails}</p>
                          </div>
                        ))}
                        {review?.replies.length > 1 && (
                          <div className='flex justify-end'>
                                <button
                            onClick={toggleRepliesVisibility}
                            className="mt-2 text-blue-500 cursor-pointer"
                          >
                            {showAllReplies ? 'See Less' : 'See More'}
                          </button>
                          </div>
                          
                        )}
                      </div>

                  {/* ///////////////////////////////Review Reply gula ekhane thakbe - END ////////////// */}
                  <div style={{marginTop:"20px"}} className='flex gap-3 mt-2'>
                    {/* like dislike buttons  */}
                    <button className='btn' onClick={(e) => handleLikeDislike(e,"like")}>
                    <BiLike />
                    <BiSolidLike />

                       {/* 5 */}
                       {review?.likeCount}
                    </button>
                    {/* onClick={handleDislike} */}
                    <button className='btn'  onClick={(e) => handleLikeDislike(e,"dislike")} >
                    <BiDislike />
                    <BiSolidDislike />
                       {/* 5 */}
                       {review?.disLikeCount}
                       </button>

                    {/* // ekhane reply er input form thakbe ..  */}
                    {/* /////////////////flowbite/////////////////////// */}
                    
                    <form className='flex  gap-3' onSubmit={handleReplySubmit}>
                      
                        <input  type="text" onChange={onChange} id="replyDetails" name='replyDetails' class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Give Reply..." required/>
                        
                        <input  className='z-0' style={{width:"0px"}} type="" id="reviewId" name="review?.reviewId" value={review?.reviewId}/>
                      
                      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                    {/* // Delete Button */}
                    <button onClick={() => handleDelete(review?.reviewId)} className='ml-3'>
                      <MdDelete style={{fontSize:"25px", backgroundColor:"lightBlue" ,color: "purple", borderRadius: "5px"}}/>
                    </button>
                    {/* //////////////////////////////////////// */}
                  </div>
                  <div>
                    {/* // if any reply found ! then show this div */}
                    {/* // accending order e show korbe */}
                  </div>
                  
                </div>
                
              </div>
                     //////////////////////////////////////////////////////////////////////////////// Review Card END Master/////////////////////////
                  )
                    
                })
                
              }
              
              {/* <ReviewCard/>
              
              
              <ReviewCard/>
              <ReviewCard/> */}
              
              {/* ///////////////////////////////////////////////// */}
            </div>

            <input type="radio" name="my_tabs_2" className="tab w-auto bg-PrimaryColorDark hover:bg-PrimaryColorDarkHover" aria-label="Shipping And Delevery Review"  />
            <div className="tab-content bg-base-100 border-base-300 rounded-box p-10">
              {/* Tab content 2 */}
              <div className='flex justify-end'>
              <button   onClick={handleRefresh}>Refresh</button>
              </div>
            </div>

            <input type="radio" name="my_tabs_2" className="tab w-auto bg-PrimaryColorDark hover:bg-PrimaryColorDarkHover" aria-label="After Sales Service" checked />
            <div className="tab-content bg-base-100 border-base-300 rounded-box p-10">
              {/* Tab content 3   */}
              <div className='flex justify-end'>
              <button   onClick={handleRefresh}>Refresh</button>
              </div>
              {

              afterSalesReviews?.map((review, key) =>{

                return (
                  ////////////////////////////////////////////////////////////////////////////// Review Card Start Master/////////////////////////
                    //  <ReviewCard reviewId={review.reviewId}/>
                    
<div id='reviewBody' style={{marginBottom:"10px"}} className='relative rounded-lg p-4 w-auto h-auto bg-PrimaryColorDarkHover border-2'>
                <div >
                  {/* // user image  */}
                  <div className='flex'>

                  <Image
                    className='rounded-full'
                    // src={LenovoPc124}
                    src={`http://localhost:3000/seller/getLoggedInUserImage/?imageName=${review?.sellerId?.sellerImage}`}
                    width={60}
                    height={120}
                    quality={75} // default is 75
                    alt="Picture of user"
                  />
                  <div>
                    
                     {/* <h1 className='ml-3'>Mohammad Bin Ab. Jalil Sheakh</h1> */}
                     <h1 className='ml-3'>{review?.sellerId?.sellerName}</h1>
                      
                  </div>
                  </div>

                  <div style={{marginLeft:"60px", marginTop:"29px"}} className='rounded-md relative left-[35px] top-[-15px] ml-9 w-96 h-auto bg-PrimaryColorDark'>
                          {/* Review Body...........................................
                          .....................................................
                          .....................................................
                          ..................................................... */}
                          {review?.reviewDetails}
                  </div>
                  {/* ////////////////////////////// Review Reply gula ekhane thakbe - START ///////////////////////////////////////////// */}

                  

                  {/* //border */}
                  <div className="max-w-md mx-auto p-1">
                        {review?.replies?.slice(0, showAllReplies ? review?.replies?.length : 1).map((reply, index) => (
                          <div key={index}  className="flex gap-x-3 my-1" >

                              {/* <Image
                                                  className='rounded-full'
                                                  // src={LenovoPc124}
                                                  src={`http://localhost:3000/seller/getLoggedInUserImage/?imageName=${reply?.sellerId?.sellerImage}`}
                                                  width={60}
                                                  height={120}
                                                  quality={75} // default is 75
                                                  alt="Picture of user"
                                                /> */}

                            <p>{reply?.sellerId?.sellerName} </p>
                            {/* ?.sellerName */}
                            <p className='border-2 p-1'>{reply.replyDetails}</p>
                            {/* // Delete Button */}
                            <button onClick={() => handleReplyDelete(reply?.replyId)} className='ml-3'>
                              <MdDelete style={{fontSize:"25px", backgroundColor:"lightBlue" ,color: "purple", borderRadius: "5px"}}/>
                            </button>
                          </div>
                        ))}
                        {review?.replies.length > 1 && (
                          <div className='flex justify-end'>
                                <button
                            onClick={toggleRepliesVisibility}
                            className="mt-2 text-blue-500 cursor-pointer"
                          >
                            {showAllReplies ? 'See Less' : 'See More'}
                          </button>
                          </div>
                          
                        )}
                      </div>

                  {/* ///////////////////////////////Review Reply gula ekhane thakbe - END ////////////// */}
                  <div style={{marginTop:"20px"}} className='flex gap-3 mt-2'>
                    {/* like dislike buttons  */}
                    <button className='btn' onClick={(e) => handleLikeDislike("like", review?.reviewId)}>
                    <BiLike />
                    <BiSolidLike />

                       {/* 5 */}
                       {review?.likeCount}
                    </button>
                    {/* onClick={handleDislike} */}
                    <button className='btn'  onClick={(e) => handleLikeDislike("dislike", review?.reviewId)} >
                    <BiDislike />
                    <BiSolidDislike />
                       {/* 5 */}
                       {review?.disLikeCount}
                       </button>

                    {/* // ekhane reply er input form thakbe ..  */}
                    {/* /////////////////flowbite/////////////////////// */}
                    
                    <form className='flex  gap-3' onSubmit={(e) => handleReplySubmit(e, review?.reviewId)}>
                      
                        <input  type="text" onChange={onChange} id="replyDetails" name='replyDetails' class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Give Reply..." required/>
                        
                        {/* <input  className='z-0' style={{width:"0px"}} type="" id="reviewId" name="reviewId" value={review?.reviewId}/> */}
                      
                      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                    {/* // Delete Button */}
                    <button onClick={() => handleDelete(review?.reviewId)} className='ml-3'>
                      <MdDelete style={{fontSize:"25px", backgroundColor:"lightBlue" ,color: "purple", borderRadius: "5px"}}/>
                    </button>
                    {/* //////////////////////////////////////// */}
                  </div>
                  <div>
                    {/* // if any reply found ! then show this div */}
                    {/* // accending order e show korbe */}
                  </div>
                  
                </div>
                
              </div>
                     //////////////////////////////////////////////////////////////////////////////// Review Card END Master/////////////////////////
                  
                )
                  
              })

              }
            </div>
          </div>


        </div>
      </div> 
    </>
    
  )
}

