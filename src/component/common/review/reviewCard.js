import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import LenovoPc124 from '../../../../public/images/Products/LenovoPc124.jpg';
import { BiLike, BiSolidLike  } from "react-icons/bi";
import { BiDislike, BiSolidDislike  } from "react-icons/bi";
import Link from 'next/link';
import { FaDeleteLeft } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { useRouter } from 'next/router';




export default function ReviewCard({review}) {
  const router = useRouter();
  const [showAllReplies, setShowAllReplies] = useState(false);

  const [reviewReplyForm, setReviewReplyForm] = useState({
    replyDetails: "",
    reviewId: review.reviewId,
    sellerId: "", // sellerId from local storage

  });

  const toggleRepliesVisibility = () => {
    setShowAllReplies(!showAllReplies);
  };
  useEffect(()=>{
     console.log("review 🟢🟢🟢", review)
  },[])
  const handleDelete = async(reviewId) => {
    // console.log("delete clicked");
    const response = await axios.delete(`http://localhost:3000/seller/deleteReviewByReviewId/${reviewId}`,{
      headers:{
        Authorization: `bearer ${JSON.parse(localStorage.getItem('authForEcomerce')).accessToken}`
      }
    })

    if(response.data){
      
     router.push("/seller/14/review"); 
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

  const handleReplySubmit = (e) =>{
    const token = JSON.parse(localStorage.getItem('authForEcomerce')).userId;
    const token2 = JSON.parse(localStorage.getItem('authForEcomerce')).accessToken;
    
    e.preventDefault();
    reviewReplyForm.sellerId = token;
    console.log("handle reply submit : ", reviewReplyForm);

    const response = axios.post("http://localhost:3000/seller/addReplyToAReview", reviewReplyForm,{
      headers:{
        Authorization: `bearer ${token2}`
      }
   
    })
    if(response.data){
      router.push("/seller/14/review"); 
    }
  }
  return (
    <>
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

                  {/* {


                    review.replies?.map((reply) => {
                      const {replyId, replyDetails, createdAt} = reply;
                      return(
                      <>
                      {replyId} : {replyDetails}  : {createdAt} 
                      </>
                    )
                    }
                    )
                  } */}

                  <div className="max-w-md mx-auto p-4 border">
                        {review.replies.slice(0, showAllReplies ? review.replies.length : 1).map((reply, index) => (
                          <div key={index} className="reply">
                            <p>{reply.replyDetails}</p>
                          </div>
                        ))}
                        {review.replies.length > 1 && (
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
                    <button className='btn'>
                    <BiLike />
                    <BiSolidLike />

                       5</button>
                    <button className='btn'>
                    <BiDislike />
                    <BiSolidDislike />
                       5</button>

                    {/* // ekhane reply er input form thakbe ..  */}
                    {/* /////////////////flowbite/////////////////////// */}
                    
                    <form className='flex  gap-3' onSubmit={handleReplySubmit}>
                      
                        <input  type="text" onChange={onChange} id="replyDetails" name='replyDetails' class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Give Reply..." required/>
                      
                      
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
    </>
  )
}
