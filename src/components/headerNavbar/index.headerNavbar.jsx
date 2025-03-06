import React from 'react'


export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow-md 
                    font-[Poppins] font-medium text-[20px] leading-[30px]">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <img src="src/assets/images/logo.png" alt="Pre Clinic Logo" className="w-8 h-8" />
        <span className="text-blue-600">Doctors App</span>

        {/* Search Bar */}
        <div className="hidden md:flex bg-gray-100 px-3 py-1 rounded-lg ml-4">
          <span className="text-gray-400">🔍</span>
          <input type="text" placeholder="Search here" className="bg-transparent outline-none px-2 text-gray-600" />
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-gray-600 text-xl ml-4">☰</button>
      </div>

      {/* Right Section (More Space Added) */}
      <div className="flex items-center gap-6">
        <span className="hidden md:flex text-gray-600 text-xl">📩</span>
        <span className="hidden md:flex text-gray-600 text-xl">🔔</span>
        
        {/* User Info */}
        <div className="flex items-center gap-2">
          <div className="text-gray-800 font-semibold">Liam Michael</div>
          <div className="text-gray-500 text-sm">Admin</div>
        </div>

        {/* Profile Image */}
        <img src="https://via.placeholder.com/40" alt="profile" className="w-10 h-10 rounded-full" />
        
        {/* Settings Button */}
        <button className="text-gray-600 text-xl">⚙️</button>
      </div>
    </nav>
  );
}



