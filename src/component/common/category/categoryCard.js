import React from 'react'

export default function CategoryCard({categoryName}) {
  return (
    <>
    <div  className="border-2">
   
    <button style={{width: "90px", height:"90px", border:"1px solid red", borderRadius:"9px" }}  className="flex justify-center content-center">

        <img style={{width: "40px"}} src="~/Content/images/home/category/processor.png" alt="image not found from categoryCard" />

      {categoryName}
    </button>
</div>

    </>
  )
}
