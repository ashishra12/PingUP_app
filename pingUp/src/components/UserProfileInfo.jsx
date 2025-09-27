import React from 'react'
import { MapPin, Verified, Calendar, PenBox } from 'lucide-react'
import moment from 'moment'

const UserProfileInfo = ({ user, posts, profileId, setShowEdit }) => {
  return (
    <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      {/* Profile Picture + Name Section */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
        {/* Profile Picture */}
        <div className="relative -mt-20">
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white shadow-md overflow-hidden">
            <img
              src={user.profile_picture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-2">
          {/* Name + Verified */}
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{user.full_name}</h1>
            {user.is_verified && <Verified className="h-5 w-5 text-blue-500" />}
          </div>

          {/* Username */}
          <p className="text-gray-600 text-sm">
            {user.username ? `@${user.username}` : 'Add a username'}
          </p>

          {/* Bio */}
          <p className="text-gray-700 text-center md:text-left text-sm max-w-md mt-2">
            {user.bio || 'No bio available'}
          </p>

          {/* Location + Joined Date */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mt-3">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-gray-500" />
              {user.location || 'Unknown'}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-gray-500" />
              Joined {moment(user.createdAt).fromNow()}
            </span>
          </div>
          <div className='flex gap-6 mt-4 text-sm text-gray-600 items-center border-t border-gray-200 pt-4'>
             <div>
              <span className='sm:text-xl font-bold text-gray-900'>{posts.length}</span>
              <span className='text-gray-500'> Posts</span>
             </div>
              <div>
              <span className='sm:text-xl font-bold text-gray-900'>{user.followers.length}</span>
              <span className='text-gray-500'> Followers</span>
             </div>
              <div>
              <span className='sm:text-xl font-bold text-gray-900'>{user.following.length}</span>
              <span className='text-gray-500'> Following</span>
             </div>

          </div>
        </div>

        {/* Edit Button */}
        {!profileId && (
          <button
            onClick={() => setShowEdit(true)}
            className="flex items-center gap-2 border border-gray-300 rounded-xl bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 hover:shadow transition duration-200 cursor-pointer"
          >
            <PenBox className="h-5 w-5" />
            Edit Profile
          </button>
        )}
      </div>
    </div>
  )
}

export default UserProfileInfo
