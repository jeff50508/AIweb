"use client"
import React from "react";
import { usePathname } from 'next/navigation'
import Image from "next/image";
const Header = () => {
  const pathname  = usePathname()
  return (
      <nav className="container">
        <div className="flex items-center">
          <Image alt="logo" src="/icon.png" width={150} height={150}/>
          <ul className="flex gap-4 w-full text-4xl font-bold justify-end h-24 items-center">
            <li>
              <a href="/machinelearning" className={pathname === "/machinelearning" ? "p-4 bg-color-1 rounded-xl" : ""}>
                Home
              </a>
            </li>
            <li>
              <a href="/model" className={pathname === "/model" ? "p-4 bg-color-1 rounded-xl" : ""}>
                Result
              </a>
            </li>
          </ul>
        </div>
      </nav>
  );
};

export default Header;
