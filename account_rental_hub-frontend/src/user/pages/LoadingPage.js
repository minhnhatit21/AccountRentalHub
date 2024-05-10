import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-blue-400 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingPage;