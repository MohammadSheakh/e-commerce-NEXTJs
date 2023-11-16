import React from 'react'

export default function MainCategory() {
  return (
    // daisy ui -> menu
    <>
    <div>
    <ul className="menu bg-base-200 rounded-box block xs:hidden  sm:w-[150px] md:w-[200px] lg:w-[220px] ml-3">
    {/* w-[120px] */}
      <li>
          <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="">Item 1</label>
          <ul tabIndex={0} className="ml-[80px] relative top-2  dropdown-content z-[1] menu shadow bg-base-100 rounded-box ">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </li>
      

      <li>
          <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="">Item 1</label>
          <ul tabIndex={0} className="ml-[80px] relative top-2  dropdown-content z-[1] menu shadow bg-base-100 rounded-box ">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </li>


      <li>
          <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="">Item 1</label>
          <ul tabIndex={0} className="ml-[80px] relative top-2  dropdown-content z-[1] menu shadow bg-base-100 rounded-box ">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </li>


      <li>
          <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="">Item 1</label>
          <ul tabIndex={0} className="ml-[80px] relative top-2  dropdown-content z-[1] menu shadow bg-base-100 rounded-box ">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </li>


      <li>
          <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="">Item 1</label>
          <ul tabIndex={0} className="ml-[80px] relative top-2  dropdown-content z-[1] menu shadow bg-base-100 rounded-box ">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </li>
      
      
    </ul>
    </div>
    
    </>
  )
}
