import React from "react";
import {
  Users,
  UserCheck,
  UserRoundPen,
  UserPlus,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyPendingConnectionsData as pendingConnections,
  dummyConnectionsData as connections,
} from "../assets/assets";

const Connections = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = React.useState("Followers");

  const dataArray = [
    { label: "Followers", value: followers, icon: Users },
    { label: "Following", value: following, icon: UserCheck },
    { label: "Pending", value: pendingConnections, icon: UserRoundPen },
    { label: "Connections", value: connections, icon: UserPlus },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Connections
          </h1>
          <p className="text-slate-600">
            Manage your connections and discover new ones
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-8 flex flex-wrap gap-6">
          {dataArray.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 flex items-center gap-4 w-full max-w-xs"
            >
              <item.icon className="w-6 h-6 text-slate-500" />
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {item.label}
                </h2>
                <p className="text-sm text-slate-600">
                  {item.value.length} {item.label.toLowerCase()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="inline-flex flex-wrap items-center border border-gray-200 rounded-md p-1 bg-white shadow-sm">
          {dataArray.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setCurrentTab(tab.label)}
              className={`cursor-pointer px-3 py-1 flex items-center rounded-md text-sm font-medium ${
                currentTab === tab.label
                  ? "bg-gray-100 text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              <tab.icon className="w-4 h-4 mr-1" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* User List */}
        <div className="flex flex-col gap-6 mt-6">
          {dataArray
            .find((item) => item.label === currentTab)
            .value.map((user) => (
              <div
                key={user._id}
                className="max-w-xl flex flex-wrap gap-5 bg-white p-6 rounded-md shadow"
              >
                <img
                  src={user.profile_picture}
                  alt={user.username}
                  className="size-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">
                    {user.full_name}
                  </p>
                  <p className="text-sm text-slate-600">@{user.username}</p>
                  <p className="text-sm text-gray-600">
                    {user.bio ? user.bio.slice(0, 30) : "No bio"}...
                  </p>

                  {/* Action Buttons */}
                  <div className="flex max-sm:flex-col gap-2 mt-4">
                    <button
                      className="w-full p-2 text-sm rounded bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 active:scale-95 transition"
                      onClick={() => navigate(`/profile/${user._id}`)}
                    >
                      View Profile
                    </button>

                    {currentTab === "Followers" && (
                      <button className="w-full p-2 text-sm rounded bg-slate-100 text-slate-800 hover:bg-slate-200 active:scale-95 transition">
                        Follow Back
                      </button>
                    )}

                    {currentTab === "Pending" && (
                      <button className="w-full p-2 text-sm rounded bg-green-100 text-green-800 hover:bg-green-200 active:scale-95 transition">
                        Accept Request
                      </button>
                    )}

                    {currentTab === "Connections" && (
                      <button
                        onClick={() => navigate(`/messages/${user._id}`)}
                        className="w-full p-2 text-sm rounded bg-slate-100 text-slate-800 hover:bg-slate-200 active:scale-95 transition"
                      >
                        <MessageSquare className="w-4 h-4 inline-block mr-1" />
                        Message
                      </button>
                    )}

                    {currentTab === "Following" && (
                      <button className="w-full p-2 text-sm rounded bg-red-100 text-red-800 hover:bg-red-200 active:scale-95 transition">
                        Unfollow
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;
