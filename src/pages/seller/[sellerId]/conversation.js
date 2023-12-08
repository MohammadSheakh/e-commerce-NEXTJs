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
  const [selectedConversation, setSelectedConversation] = useState([]);// null chilo 
  

  const [formData, setFormData] = useState({
    message: "",
    receiverEmail: "",
    senderEmail: "",
  });

  const [senderEmail, setSenderEmail] = useState(null);
  const [receiverEmail, setReceiverEmail] = useState(null);
   

  useEffect(() => {
    // current logged in user email lagbe .. 
    const tokenString = localStorage.getItem('authForEcomerce');
    const loggedInUserEmail1 = JSON.parse(tokenString).user.userEmailAddress;
    setLoggedInUserEmail(loggedInUserEmail1);
    // console.log("loggedInUserEmail", JSON.parse(tokenString).user.userEmailAddress)
    //console.log("selected conversation 🟢🟢🟢: ", selectedConversation)


    
      
  },[])//messageList


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
    // ekhane amra senderEmail and receiverEmail set korte hobe ..

    // messageList.map((message, index) => {
    //   //console.log(message);
    //   if(message.senderEmail == loggedInUserEmail) {
    //     setSenderEmail(message.senderEmail);
    //   }else if (message.receiverEmail == loggedInUserEmail){
    //     setSenderEmail(message.receiverEmail);
    //   }else if(message.senderEmail != loggedInUserEmail){
    //     setReceiverEmail(message.senderEmail);
    //   }else if(message.receiverEmail != loggedInUserEmail){
    //     setReceiverEmail(message.receiverEmail);
    //   };
    // });


    //🟢🟢🟢 console.log(conversation);
    //🟢🟢🟢 conversation.sellerEmailAddress is receiverEmail  
    //🟢🟢🟢 loggedin userEmail is senderEmail
    setSenderEmail(loggedInUserEmail);
    setReceiverEmail(conversation.sellerEmailAddress);

    
  };


  //////////////// 🟢🟢🟢🟢🟢  console.log("selected conversation id : ", selectedConversation?.id);
  const [conversationId, setConversationId] = useState(null); // age null chilo
  const [messageList, setMessageList] = useState([]); // from DB


  useEffect(() => {

    let id = selectedConversation?.conversationId;
    // console.log("id from useEffect 1 :::: ", id)
    //console.log("id::::", id)
      if(id == undefined){
        // console.log("if block");
        setConversationId(4);
        // console.log("conversationId in if after set value 4::: ",conversationId)
        
      }else if(id == null){
        // console.log("else if block");
        setConversationId(4);
        // console.log("conversationId in else if::: ",conversationId)
        
      }
      else{
        //console.log("else block");
       // console.log("conversationId in else::: ",conversationId)
        setConversationId(id); // 🟢🟢🟢🟢🟢
      }

    // ekhon db theke selected conversation er shob message gula pull kore niye ashte hobe ..
    // jehetu conversation id ta amar kase ase 

    const tokenString = localStorage.getItem('authForEcomerce');
    const token = JSON.parse(tokenString).accessToken;
    const loggedInUserEmail = JSON.parse(tokenString).user.userEmailAddress;

    const getConversationByConversationIDFromDB = async(token,id) =>{
      
      if(conversationId){
        //console.log("before response: ", conversationId)
        const response  = await axios.get(`http://localhost:3000/seller/message/showAllMessageOfAConversation/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        );
        if(response.data){
          // console.log(loggedInUserEmail)
          //console.log("response.data from conversationBody : ", response.data);
          setMessageList(response.data);
        }
      }
      
      };

      getConversationByConversationIDFromDB(token, conversationId);
   
      // setInterval(() => {
        
      // }, 2);

      
   
  },[conversationId, messageList])//messageList chilo na 🔰🔰🔰🔰🔰

  const onChange = (e) =>{
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, // ei ta xoss way to play with form data
  }));
  }

  const handleMessageSubmit = async(e) =>{
    e.preventDefault();
    //console.log(receiverEmail, senderEmail)
    // console.log(e.target[1].name,e.target[2].name )
    // e.target[1].name = receiverEmail;
    // e.target[2].value = senderEmail;
    formData.senderEmail = senderEmail;
    formData.receiverEmail = receiverEmail;
    

    console.log("formData from handleMessageSubmit: ", formData);

    // ekhon data amader ke db te post korte hobe .. axios er maddhome 
    const tokenString = localStorage.getItem('authForEcomerce');
    const token = JSON.parse(tokenString).accessToken;


    const response = await axios.post('http://localhost:3000/seller/message/createNewMessage', formData,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    );

    if(response.data){
      console.log("successfully submit : ", response.data);
      router.push(`/seller/${sellerId}/conversation`);
    }

  }

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
                  conversationList.map((conversation, index) =>(
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
                      messageList.map((message, index) =>(
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
                          {/* // ekhane logged in user selected conversation er moddhe message send korbe  */}
                            <form noValidate onSubmit={handleMessageSubmit}>
                                <div class="flex">
                                  <input type="file" id="file" style={{padding:"2px", width:"110px", height:"41px", borderRadius:"50px"}} class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                  
                                  {/* <input type="hidden" onChange={onChange} id="receiverEmail" name='receiverEmail' value={receiverEmail} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Text Here ..." required/>
                                  <input type="hidden" onChange={onChange} id="senderEmail" name='senderEmail' value={senderEmail} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Text Here ..." required/>
                                   */}
                                  {
                                    //console.log(senderEmail, receiverEmail)
                                  }
                                  <input type="text" id="message" name='message'onChange={onChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Text Here ..." required/>
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

