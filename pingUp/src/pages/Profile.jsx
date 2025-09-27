import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyPostsData, dummyUserData } from "../assets/assets";
import Loading from "../components/Loading";
import UserProfileInfo from "../components/UserProfileInfo";
import PostCard from "../components/PostCard";
import moment from "moment";
import ProfileModal from "../components/ProfileModal";

const Profile = () => {
  const { profileId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    // Simulate fetching user data
    setUser(dummyUserData);
    setPosts(dummyPostsData);
  }, []);

  return user ? (
    <div className="relative h-full overflow-y-scroll bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Cover Photo Section */}
        <div className="bg-white shadow rounded-2xl overflow-hidden">
          <div className="h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 relative">
            {user.cover_photo && (
              <img
                src={user.cover_photo}
                alt="Cover Photo"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* User Profile Info */}
          <UserProfileInfo
            user={user}
            posts={posts}
            profileId={profileId}
            setShowEdit={setShowEdit}
          />
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow p-2 flex max-w-lg md:max-w-2xl mx-auto">
            {["posts", "media", "likes"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 px-4 font-medium rounded-lg transition-colors text-sm text-center py-2 cursor-pointer ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Posts Tab */}
          {activeTab === "posts" && (
            <div className="mt-6 space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Media Tab */}
          {activeTab === "media" && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {posts
                .filter((post) => post.image_urls.length > 0)
                .map((post) =>
                  post.image_urls.map((image, index) => (
                    <Link
                      key={`${post.id}-${index}`}
                      to={image}
                      target="_blank"
                      className="relative group w-32 h-32 md:w-36 md:h-36 rounded-lg overflow-hidden shadow"
                    >
                      <img
                        src={image}
                        alt="Post image"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <p className="absolute bottom-0 right-0 text-xs p-1 px-3 bg-black/40 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition duration-300">
                        Posted {moment(post.created_at).fromNow()}
                      </p>
                    </Link>
                  ))
                )}
            </div>
          )}

          {/* Likes Tab */}
          {activeTab === "likes" && (
            <p className="text-center text-gray-500 mt-6">
              No liked posts available.
            </p>
          )}
        </div>
      </div>

      {/* ✅ Edit Profile Modal */}
      {showEdit && <ProfileModal setShowModal={setShowEdit} />}
    </div>
  ) : (
    <Loading />
  );
};

export default Profile;
