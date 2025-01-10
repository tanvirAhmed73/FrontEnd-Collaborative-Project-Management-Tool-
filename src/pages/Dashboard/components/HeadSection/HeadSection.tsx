import React from 'react';

const HeadSection: React.FC = () => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
        Project Dashboard
      </h1>
    </div>
  );
};

export default HeadSection;
