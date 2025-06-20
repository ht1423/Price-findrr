import React from 'react';
import Link from 'next/link';
import { FaFireFlameCurved } from "react-icons/fa6";
import Button from './Button';

const Navbar = () => {
  return (
    <header className="sticky top-0 w-full bg-black text-white border-b border-gray-800 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text hover:from-blue-400 hover:to-purple-400 transition-all duration-300">
          Price Findrr
        </Link>
        <div className="flex items-center gap-5">
          <Button label={<FaFireFlameCurved className='text-xl md:text-2xl font-semibold'/>} navigate='/trending'></Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;