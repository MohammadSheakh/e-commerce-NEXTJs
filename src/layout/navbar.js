import {useEffect, useState} from 'react'
import { FaAlignJustify } from "react-icons/fa";
import Link from "next/link";
import Nav from './Nav';
import { MdLogin, MdNightlight } from "react-icons/md";
import {logo} from "../../public/assets/icons/home/logo.png";
import Image from 'next/image';

export default function Navbar() {
  const [theme, setTheme] = useState(null);
const user = null;
  const logout = () => {
    //dispatch(userLoggedOut()); // AuthSlice er userLoggedOut Action ta dispatch kore dilam ..
    localStorage.clear(); // localStorage tao clear kore dite hobe ..
    console.log("userLoggedOut is dispatched and localstorage is cleared");
};

  useEffect(() => {
    // to check prefered theme
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
    } else {
        setTheme("light");
    }
}, []);

const handleThemeSwitch = () => {
  console.log(
      "-------------------------------------------------- btn clicked "
  );
  setTheme(theme === "dark" ? "Light" : "dark");
};

useEffect(() => {
  if (theme === "dark") {
      document.documentElement.classList.add("dark");
  } else {
      document.documentElement.classList.remove("dark");
  }
  // jokhon e theme er value change hobe .. tokhon e eita ghotbe ..
}, [theme]);

  return (
    <>
        <div className="h-14 w-full bg-navbarColorGray grid grid-cols-12 fixed z-50">
            {/* bg-slate-600 */}
            <div class="col-span-1 sm:col-span-3 xl:col-span-3 w-[210px] h-14 rounded-full group flex">
                <Link href="/" className=" h-12 w-10 rounded-full ml-4 mt-1  hover:ring-4 hover:ring-PrimaryColorDark">
                    {/* <img
                        class=" h-12 w-10 rounded-full ml-4 mt-1  hover:ring-4 hover:ring-PrimaryColorDark"
                        src={logo}
                        alt="Logo"
                    /> */}

                <Image

                src={logo}
                width={40}
                // height={200}
                quality={75} // default is 75
                alt="Logo"
                />
                </Link>

                <div className="hidden md:block h-8 w-[0px] rounded-md ml-2 mt-3 pl-2 pr-2 pt-1 pb-1 invisible group-hover:w-36 group-hover:visible transition-all duration-1000 hover:duration-0 delay-0 bg-PrimaryColorLight  ">
                    <h2 className=" text-orange leading-3 text-sm w-36 invisible group-hover:visible transition-all duration-1000 hover:delay-400 ">
                        ABC E-Commerce
                    </h2>
                </div>
            </div>
            {/*
            2xl:px-[30%] -> normal -> 100% 
            xl:px-[25%] -> 120% - 150% 
            lg:px-[20%] ->  160px - 180% - 230% 
            md:px-[10%]
            sm:px-[1%] -> */}
            <div className=" col-span-0">

            </div>
            <div className=" col-span-7   xl:col-span-8 w-full flex flex-nowrap xl:ml-56 lg:ml-[-20px] md:ml-[-120px] sm:ml-[-100px] mt-3 h-10 relative">
            {/* path="/" */}
                <Nav path="/" styleProps="group-hover:w-10 text-PureWhite">
                    Home
                </Nav>
                
                <Nav
                    path="/about"
                    styleProps="group-hover:w-[50px] text-PureWhite"
                    stylePropsForBtn ="hidden lg:block"
                >
                    New Arrivals
                </Nav>
                <Nav path="/projects" styleProps="group-hover:w-14">
                    Offers
                </Nav>
                <Nav path="/timeline" styleProps="group-hover:w-14">
                    Contact
                </Nav>
                <Nav path="/story" styleProps="group-hover:w-10">
                    About
                </Nav>
                <Nav path="/achievements" styleProps="group-hover:w-24">
                    FAQ
                </Nav>
                <Nav path="/dashboard" styleProps="group-hover:w-20">
                    Blog
                </Nav>
                <div className="dropdown">
                    <button tabIndex={0} className="text-orange group w-auto ml-3 h-7 leading-6 rounded-md pl-2 pr-2 bg-PureWhite hover:shadow hover:shadow-homeColor">
                    Login
                    <span>
                        {" "}
                        <div
                            className={` w-0 h-0.5 absolute bottom-1 rounded-xl group-hover:w-10  bg-PureWhite hover:invisible  group-hover:visible transition-all duration-1000 hover:duration-75 delay-0`}
                        ></div>
                    </span>
                </button>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {/* <li><a href='/seller/login'>Seller</a></li> */}
                        <li><a href='/seller/1'>Seller</a></li>
                        
                        <li><a href='/buyer/login'>Buyer</a></li>
                        <li><a href='/admin/login'>Admin</a></li>
                    </ul>
                </div>
            </div>
            {/*
            2xl:px-[30%] -> normal -> 100% 
            xl:px-[25%] -> 120% - 150% 
            lg:px-[20%] ->  160px - 180% - 230% 
            md:px-[10%]
            sm:px-[1%] -> */}

            
        </div>
    </>
);
}


{/* <div class="hidden md:block xl:col-span-1  col-span-2 sm:col-span-1 md:col-span-1 w-full flex mt-2 h-10 ">
                
                <div class="group h-10 w-auto  absolute ">
                    <button
                        class="bg-PrimaryColorLight h-10 w-10" // bg-slate-100
                        onClick={handleThemeSwitch}
                    >
                        <MdNightlight />
                        
                    </button>
                    <span class=" relative  top-6 right-16  p-1 rounded-md invisible  group-hover:text-PureWhite group-hover:visible bg-tooltip ">
                        Night mode
                    </span>
                </div>
                <div class="group h-10 rounded-full w-auto ml-14 absolute ">
                    <Link
                        to="/login"
                        class=" bg-slate-800 h-10 w-10 rounded-full"
                    >
                        
                        <MdLogin/>
                    </Link>
                    <span class="relative h-10 w-0 top-1  p-1 rounded-md invisible group-hover:w-36 group-hover:visible bg-tooltip group-hover:text-PureWhite">
                        Author Sign in
                    </span>
                </div>
                
                {user ? (
                   
                    <>
                        <div class="group h-10 rounded-full w-auto ml-28 absolute ">
                            <span
                                onClick={logout}
                                class=" bg-slate-800 h-10 w-10 rounded-full"
                            >
                                
                                <img
                                    src={logoutIcon}
                                    class=" h-10 w-auto "
                                />
                            </span>
                            <span class="relative h-10 w-0 top-1  p-1 rounded-md invisible group-hover:w-36 group-hover:visible bg-tooltip group-hover:text-PureWhite">
                                Logout
                            </span>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div> */}