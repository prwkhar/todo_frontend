import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 h-[9%] text-white p-4 text-center">
      <div className="space-y-2">
        <p>© 2025 Taskify. All rights reserved.</p>
        <div className="space-x-4">
          <a href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            GitHub
          </a>
          <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
