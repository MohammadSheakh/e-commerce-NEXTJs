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
import axios from 'axios';
import Conversation from '@/component/seller/conversation/conversation';
import SingleSender from '@/component/seller/conversation/SingleSender';
import SingleReceiverMessage from '@/component/seller/conversation/SingleReceiverMessage';

export default function SellerProducts() {
  const router = useRouter();
  const {sellerId} = router.query;
  const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);

  // for conversation list
  const [conversationList, setConversationList] = useState([]); // from DB
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    // current logged in user email lagbe .. 
    const tokenString = localStorage.getItem('authForEcomerce');
    const loggedInUserEmail1 = JSON.parse(tokenString).user.userEmailAddress;
    setLoggedInUserEmail(loggedInUserEmail1);
    // console.log("loggedInUserEmail", JSON.parse(tokenString).user.userEmailAddress)
  },[])


  useEffect(() => {
    // db theke loggedInUser er shob conversation gula pull kore niye ashte hobe .. 

    const tokenString = localStorage.getItem('authForEcomerce');
    const token = JSON.parse(tokenString).accessToken;
    const loggedInUserEmail = JSON.parse(tokenString).user.userEmailAddress;
    
    const getConversationListFromDB = async() =>{
      const result = await axios.get(`http://localhost:3000/seller/message/showAllConversation?loggedInUserEmail=${loggedInUserEmail}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if(result.data){
        //console.log("result", result.data)
        setConversationList(result.data);
      }
      
    }
    getConversationListFromDB();
  },[selectedConversation])


  // for conversation list 
  const handleConversationClick = (conversation) => {
    //console.log("conversation clicked .. ", conversation);
    setSelectedConversation(conversation);
    setConversationId(conversation.conversationId); ////////////////////////////////////////////////
  };


  //////////////// 🟢🟢🟢🟢🟢  console.log("selected conversation id : ", selectedConversation?.id);
  const [conversationId, setConversationId] = useState(null);
  const [messageList, setMessageList] = useState([]); // from DB


  useEffect(() => {

    let id = selectedConversation?.conversationId;
    console.log("id::::", id)
      if(id == undefined){
        setConversationId(4);
        console.log("conversationId in if ::: ",conversationId)
        
      }else if(id == null){
        setConversationId(4);
        console.log("conversationId in else if::: ",conversationId)
        
      }
      else{
        console.log("conversationId in else::: ",conversationId)
        setConversationId(selectedConversation?.id); // 🟢🟢🟢🟢🟢
      }

    // ekhon db theke selected conversation er shob message gula pull kore niye ashte hobe ..
    // jehetu conversation id ta amar kase ase 

    const tokenString = localStorage.getItem('authForEcomerce');
    const token = JSON.parse(tokenString).accessToken;
    const loggedInUserEmail = JSON.parse(tokenString).user.userEmailAddress;

    const getConversationByConversationIDFromDB = async(token) =>{
      
        const response  = await axios.get(`http://localhost:3000/seller/message/showAllMessageOfAConversation/${conversationId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        );
        if(response.data){
          console.log(loggedInUserEmail)
          console.log("response.data from conversationBody : ", response.data);
          setMessageList(response.data);
        }
      
      };

      getConversationByConversationIDFromDB(token);
   
   
  },[conversationId])

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
                {/* ////////////////////////////////////// Conversations.js er code ta niye ashbo  ////////////// Start ///////////////////// */}
                <button className='btn btn-primary'>Create New Conversation</button>
                {/* <Conversations loggedInUserEmail={loggedInUserEmail}/> */}

                {/* conversations */}
                {/* // ekhane onek gula Conversation Call korbo  */}
                <div className='flex flex-col scrollbar-dark scrollbar-rounded' style={{height:"400px",overflowBlock:"hidden", overflowY:"scroll"}}>
                
                {/* // conversationList map korte hobe  */}
                {
                  conversationList ?? conversationList.map((conversation, index) =>(
                    <>
                      <button   onClick={() => handleConversationClick(conversation)}>
                        <Conversation key={index}  conversation={conversation}/>               
                      </button>
                    </>
                    
                    ))
                }
                
                </div>

                {/* ////////////////////////////////////////////////////////////////////////////////////////////// END ////////////////// */}
              </div>
              {/* converation body */}
              <div className='w-[900px] rounded-md  h-96 bg-navbarColorGray'>
                {/* /////////////////////////////////////////////////////////////////////////////// Conversation Body Start//////////// */}
                {/* <ConversationBody loggedInUserEmail={loggedInUserEmail} selectedConversation={selectedConversation}/> */}

                  <div className='w-auto border-2 h-8 bg-PrimaryColorDark ' >
                  </div>
                  <div className='w-auto  overflow-hidden bg-PrimaryColorDark' style={{position:"relative", height:"300px", overflowBlock:"hidden", overflowY:"scroll"}} >
                  
                    {
                      messageList ?? messageList.map((message, index) =>(
                        <>
                          {
                            
                            message.senderEmail == loggedInUserEmail ? (
                                <SingleSender  message={message.message} date={message.timeStamps}/>
                            ) :
                              message.receiverEmail == loggedInUserEmail ? (
                                <SingleReceiverMessage   message={message.message} date={message.timeStamps}/>
                            ):(
                              <></>
                            )

                          }
                        </>
                      ))
                    }

                  </div>
                  <div>
                  
                            <form>
                                <div class="flex">
                                  <input type="file" id="file" style={{padding:"2px", width:"110px", height:"41px", borderRadius:"50px"}} class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                  
                                  <input type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Text Here ..." required/>
                                  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                </div>
                            </form>
                  </div>
                  

                {/* /////////////////////////////////////////////////////////////////////////////// Conversation Body End //////////// */}
              </div>
          </div>
        </div>
      </div> 
    </>
    
  )
}

