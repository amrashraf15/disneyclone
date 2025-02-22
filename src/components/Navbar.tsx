"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { HiHome, HiPlus } from "react-icons/hi";
import { HiMagnifyingGlass, HiPlayCircle, HiTv } from "react-icons/hi2";
import React from "react";
import Link from "next/link";



const Navbar = () => {
    const links=[
        {id:1,title:"Home",icon:HiHome,href:"/"},
        {id:2,title:"Search",icon:HiMagnifyingGlass,href:""},
        {id:3,title:"watch list",icon:HiPlus,href:"/watchlist"},
        {id:4,title:"movies",icon:HiPlayCircle,href:"/movie"},
        {id:5,title:"series",icon:HiTv,href:"/series"},
    ]
    const [open, setOpen] = useState(false);
    return (
        <header className="relative">
            <div className="container px-8 flex justify-between items-center py-4">
                <div className="relative left-4 top-2 w-[80px] md:w-[115px] h-[40px]  "><Image src="/assets/Images/logo.png" alt="logo" fill className="object-cover"  /></div>
                
                    <ul className="hidden md:flex items-center  gap-8 text-white">
                        {links.map((l)=>(
                            <li key={l.id} className="cursor-pointer font-semibold text-[18px] flex items-center gap-2  group hover:border-b-2 border-white">
                                <l.icon className="w-5 h-5"/>
                                <Link href={l.href}>{l.title}</Link>
                            </li>
                        ))}
                    </ul>
                    <div className="relative w-[40px] h-[40px] top-3 mx-4 rounded-full overflow-hidden">
                        <Image src="/amr.jpg" alt="user image" fill className="object-cover"/>
                    </div>
                    <div className="md:hidden absolute top-8 right-4 " onClick={()=>setOpen(!open)}>
                        {open?(<X className="text-white"/>):(<Menu className="text-white"/>)}
                    </div>
                    {open&&(<div className=" absolute left-0 top-20 w-screen h-[calc(100vh-9rem)] text-white z-20">
                        <ul className="flex flex-col items-center justify-center gap-8 text-white">
                        {links.map((l)=>(
                            <li key={l.id} className="cursor-pointer flex items-center font-semibold text-[18px] gap-2 group hover:border-b-2 border-white">
                                <l.icon className="w-5 h-5"/>
                                <Link href={l.href}>{l.title}</Link>
                            </li>
                        ))}
                    </ul>
                    </div>)}
            </div>
        </header>
    )
}

export default Navbar
