import React from 'react'
import Link from 'next/link'

interface NavbarProps {
  username: string;
}


const Navbar = ({ username }: NavbarProps) => {
  return (
    <div>
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <span>Welcome, {username}</span>
          <div className='flex gap-10'>
            <Link href={`/home?username=${username}`}  className="hover:underline">
              DashBoard
            </Link>
            <Link href={`/contact-form?username=${username}`} className="hover:underline">
              Contact Form
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
