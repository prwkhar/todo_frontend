import React from 'react';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 h-[5%] flex justify-between items-center text-white">
      <div className="text-xl font-bold">Taskify</div>
      <div className="space-x-4">
        <a href="/login" className="hover:text-gray-300">Login</a>
        <a href="/register" className="hover:text-gray-300">Register</a>
        <span className="hover:text-gray-300">Username</span>
        <a 
          href="https://github.com/your-github-profile" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-gray-300"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
