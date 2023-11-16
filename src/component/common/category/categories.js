import React from 'react'
import CategoryCard from './categoryCard'

export default function Categories() {
  return (
    <>
    <div className='border-2'>
      <div className='flex flex-wrap justify-center content-center'>
        <CategoryCard categoryName="PC" categoryImage= "src"/>
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </div>
    </>
  )
}
