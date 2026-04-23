import React from "react";

const Profile = () => {
  return (
    <div className=" bg-gray-100 flex justify-center items-start pt-10 mt-16 mb-10">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-md overflow-hidden">
        
        {/* Header Gradient */}
        <div className="h-24 bg-gradient-to-r from-blue-200 via-gray-200 to-yellow-100"></div>

        {/* Profile Section */}
        <div className="px-8 pb-8 -mt-20">
          <div className="flex items-center justify-between">
            
            {/* Left Profile Info */}
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/100"
                alt="profile"
                className="w-16 h-16 rounded-full border-4 border-white shadow"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Alexa Rawles
                </h2>
                <p className="text-sm text-gray-500">
                  alexrawles@gmail.com
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <button className="bg-blue-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-600">
              Edit
            </button>
          </div>

          {/* Form Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="Your First Name"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Clinic Name */}
            <div>
              <label className="text-sm text-gray-600">Clinic Name</label>
              <input
                type="text"
                placeholder="Your Clinic Name"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm text-gray-600">Gender</label>
              <select className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none">
                <option disabled>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="text-sm text-gray-600">Country</label>
              <select className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none">
                <option disabled>Select Country</option>
                <option>India</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="text-sm text-gray-600">Language</label>
              <select className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none">
                <option disabled>Select Language</option>
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>

            {/* Time Zone */}
            <div>
              <div>
              <label className="text-sm text-gray-600">specialization</label>
              <input
                type="text"
                placeholder="Your specialization"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            </div>
          </div>

          {/* Email Section */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700">
              My email Address
            </h3>

            <div className="mt-3 flex items-center justify-between bg-gray-50 border rounded-md px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full text-xs">
                  ✓
                </div>
                <div>
                  <p className="text-sm text-gray-800">
                    alexrawles@gmail.com
                  </p>
                  <p className="text-xs text-gray-400">
                    1 month ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;