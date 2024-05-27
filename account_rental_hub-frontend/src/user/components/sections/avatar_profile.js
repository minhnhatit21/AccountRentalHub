import React from "react";

const AvatarProfile = ({ imageSrc, username, email }) => {
  return (
    <div className="max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden">
      <div className="sm:flex sm:items-center px-2 py-2">
        <img
          className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-12 sm:h-10 rounded-full object-cover"
          src={imageSrc}
          alt="Avatar"
        />
        <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
          <p className="text-base font-bold text-[#989AAF]">{username}</p>
        </div>
      </div>
    </div>
  );
};

export default AvatarProfile;
