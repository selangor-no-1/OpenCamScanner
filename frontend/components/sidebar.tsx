import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-64 flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Sidebar</h1>
      </div>
      <ul className="flex-grow">
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Dashboard</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">My Files</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;