import React from 'react'
import LenovoPc124 from '../../../../public/images/Products/LenovoPc124.jpg';
import Image from 'next/image';
import SingleMessage from './SingleReceiverMessage';
import SingleReceiverMessage from './SingleReceiverMessage';
import SingleSenderMessage from './SingleSenderMessage';


export default function ConversationBody() {
  return (
    <>
    
      {/* conversationBody */}
      {/* // conversation top margin */}
      <div className='w-auto h-8 bg-PrimaryColorDark'>
      </div>
      <div className='w-auto border-2 overflow-hidden' style={{height:"300px", overflowBlock:"hidden", overflowY:"scroll"}} >
      {/* style={{width: "100%", overflowBlock:"hidden" }} */}
        {/* /////////////////design bug/////// */}
        <SingleSenderMessage textAlign="right" message="sender 0" date="12/21/12"/>
        <SingleReceiverMessage textAlign="left" message="receiver 1" date="12/21/12"/>
        <SingleReceiverMessage textAlign="left" message="receiver 2" date="12/21/12"/>
        
        {/* //////////////////////// */}

        {/* //////////////////////// */}

        <div className=''>
        <SingleSenderMessage textAlign="right" message="sender 1" date="12/21/12"/>
        </div>
        <div>
        <SingleSenderMessage textAlign="right" message="sender 2" date="12/21/12"/>
        
        </div>
        
        
        <SingleReceiverMessage textAlign="left" message="receiver 3" date="12/21/12"/>
        <SingleReceiverMessage textAlign="left" message="receiver 4" date="12/21/12"/>
        

        <SingleSenderMessage textAlign="right" message="sender 3" date="12/21/12"/>

        <SingleReceiverMessage textAlign="left" message="receiver 5" date="12/21/12"/>

        <SingleSenderMessage textAlign="right" message="sender 4" date="12/21/12"/>
        

        {/* /////////////////////////////// */}

        
        
      </div>
      <div>
        {/* Reply input form ..  */}

                <form>
                    <div class="flex">
                      {/* ekhane image, file submit korar bebostha thakte hobe  */}
                      <input type="file" id="file" style={{padding:"2px", width:"110px", height:"41px", borderRadius:"50px"}} class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                      
                      <input type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Text Here ..." required/>
                      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>
                </form>
      </div>
      
    </>
  )
}
