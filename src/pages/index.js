import Image from 'next/image'
// import { Inter } from 'next/font/google'

import Layout from '@/layout/layout'
import MainCategory from '@/layout/mainCategory'
import Banner from '@/component/home/Banner'
import SearchField from '@/component/home/SearchField'
import Categories from '@/component/common/category/categories'
import Products from '@/component/common/product/products'


// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className='border-2  relative'>
      {/* min-h-[300vh] */}
        <div className="border-2  grid grid-cols-12 ">
            <div class="col-span-3 lg:col-span-3 border-2  w-[210px] h-14 rounded-full group flex">
                <div className='pt-[70px] border-2 bg-PrimaryColorDark'>
              <MainCategory/>
                </div>
            </div>
            
            <div className="col-span-9 lg:col-span-6 border-2 ">
              <div className='pt-[70px] border-2 bg-PrimaryColorDark'>
                <Banner/>
              </div>
                
              <div class='pt-[10px] border-2 bg-PrimaryColorDark'>
                  <SearchField/>
              </div>
              
              
              <div class='pt-[10px] border-2 bg-PrimaryColorDark'>
                  <Categories/>
              </div>
              


            </div>
            
            <div class="hidden lg:block lg:col-span-3  border-2 ">
                <div className='pt-[70px] border-2 bg-PrimaryColorDark'>
              <MainCategory/>
            </div>
        </div> 

            
        </div>
        <div className='container mx-auto'>
          {/* // ekhane amra product gula show korbo  */}
            <Products  brandName="PC"/>
            <Products  brandName="Router"/>
        </div>

        
      </div>
      
    </>
  )
}

{/*
            2xl:px-[30%] -> normal -> 100% 
            xl:px-[25%] -> 120% - 150% 
            lg:px-[20%] ->  160px - 180% - 230% 
            md:px-[10%]
            sm:px-[1%] -> */}