import React from 'react';

const Header = () => {
  return (
    <header className="bg-white px-8 py-4 flex justify-between items-center border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center rounded-lg font-bold text-xl">
            M
          </div>
          <span className="text-lg font-semibold">Hey sai santhosh</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-sm text-gray-600">
          Subscription <span className="bg-green-500 text-white px-3 py-1 rounded-xl font-semibold ml-2">Active</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition font-bold text-gray-600">
          ?
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
            R
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Sai Santhosh</span>
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
