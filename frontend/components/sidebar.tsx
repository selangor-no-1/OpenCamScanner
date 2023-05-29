import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="flex h-screen w-64 flex-col bg-gray-100/30 dark:bg-gray-900/30 text-black dark:text-white rounded-lg shadow shadow-lg">
      <div className="p-4 border-b-2 border-gray-700/25 dark:border-gray-300/25">
        <h1 className="text-xl font-bold">Folders</h1>
      </div>
      <ul className="grow">
        <li className="cursor-pointer p-4 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-xl">Folder A</li>
        <li className="cursor-pointer p-4 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-xl">Folder B</li>
        <li className="cursor-pointer p-4 hover:bg-gray-300 dark:hover:bg-gray-500 first-letter:rounded-xl">Folder C</li>
      </ul>
    </div>
  );
};

export default Sidebar;