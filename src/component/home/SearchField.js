

import React from 'react'

function SearchField() {
  return (
    <>
    <div className="border-solid border-2 overflow-hidden">
    
        <form class="flex justify-center content-center" role="search">
            
            <input className='rounded-lg w-56' type='search' placeholder='Search'/>
            <button type="submit" className='border-2 rounded-lg ml-3 p-1'>Search</button>
        </form>


    </div>
    
    
    </>
  )
}

export default SearchField