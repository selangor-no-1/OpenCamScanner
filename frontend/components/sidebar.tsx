import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="flex h-screen w-64 flex-col bg-gray-800 text-white ">
      <div className="p-4">
        <h1 className="text-xl font-bold">My Folders</h1>
      </div>
      <ul className="grow">
        <li className="cursor-pointer p-4 hover:bg-gray-700">Folder 1</li>
        <li className="cursor-pointer p-4 hover:bg-gray-700">Folder 2</li>
        <li className="cursor-pointer p-4 hover:bg-gray-700">Folder 3</li>
      </ul>
    </div>
  );
};

export default Sidebar;