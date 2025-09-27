import React from 'react'
import { dummyUserData } from '../assets/assets'
import { MapPin, MessageCircle, Plus, UserPlus } from 'lucide-react'

const UserCard = () => {
  const user = dummyUserData

  const handleFollow = async () => {
    // follow logic here
  }

  const handleConnectionRequest = async () => {
    // connection request logic here
  }

  return (
    <div
      key={user._id}
      className="p-4 pt-6 w-72 max-w-xl flex flex-col justify-between gap-5 bg-white rounded-md shadow border border-gray-200"
    >
      {/* Profile Info */}
      <div className="text-center">
        <img
          src={user.profile_picture}
          alt=""
          className="size-16 mx-auto rounded-full"
        />
        <p className="mt-4 font-semibold">{user.full_name}</p>
        {user.username && (
          <p className="text-sm text-gray-500">@{user.username}</p>
        )}
        {user.bio && (
          <p className="text-sm text-gray-600 mt-2">
            {user.bio.slice(0, 30)}...
          </p>
        )}
      </div>

      {/* Location & Followers */}
      <div className="flex items-center gap-4 justify-center mt-4 text-xs text-gray-600">
        <div className="text-center flex gap-1 border border-gray-300 rounded-full px-3 py-1">
          <MapPin className="w-4 h-4" />
          {user.location}
        </div>
        <div className="text-center flex gap-1 border border-gray-300 rounded-full px-3 py-1">
          <span>{user.followers.length} followers</span>
        </div>
      </div>

      {/* Buttons Row ✅ */}
      <div className="flex items-center gap-3 mt-4">
        {/* Follow Button */}
        <button
          onClick={handleFollow}
          disabled={user?.following.includes(user._id)}
          className="flex-1 py-2 rounded-md flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 active:scale-95 transition text-white cursor-pointer"
        >
          <UserPlus className="w-5 h-5 flex" />
          {user?.following.includes(user._id) ? 'Following' : 'Follow'}
        </button>

        {/* Connection Button */}
        <button
          onClick={handleConnectionRequest}
          className="flex items-center justify-center w-12 h-11 border text-slate-500 group rounded-md cursor-pointer active:scale-95 transition"
        >
          {user?.connections.includes(user.id) ? (
            <MessageCircle className="w-5 h-5 flex group-hover:scale-105 transition" />
          ) : (
            <Plus className="w-5 h-5 flex group-hover:scale-105 transition" />
          )}
        </button>
      </div>
    </div>
  )
}

export default UserCard
