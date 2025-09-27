import React from "react";
import { Pencil, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { dummyUserData } from "../assets/assets";

const ProfileModal = ({ setShowModal }) => {
  const user = dummyUserData;
  const [editForm, setEditForm] = React.useState({
    full_name: user.full_name,
    username: user.username,
    location: user.location,
    bio: user.bio,
    profile_picture: null,
  });

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", editForm);
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur z-[110] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowModal(false)} // ✅ close on background click
      >
        <motion.div
          className="max-w-2xl w-full sm:py-6 mx-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()} // ✅ prevent close when clicking inside modal
        >
          <div className="bg-white rounded-lg shadow p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 cursor-pointer"
              aria-label="Close modal"
            >
              <X />
            </button>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Edit Profile
            </h1>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Profile Picture */}
              <div className="flex flex-col items-center space-y-2">
                <div className="relative group">
                  <img
                    src={
                      editForm.profile_picture
                        ? URL.createObjectURL(editForm.profile_picture)
                        : user.profile_picture
                    }
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full object-cover border"
                  />
                  <label
                    htmlFor="profile_picture"
                    className="absolute hidden group-hover:flex items-center justify-center top-0 left-0 w-full h-full bg-black/50 rounded-full cursor-pointer"
                  >
                    <Pencil className="text-white" />
                  </label>
                  <input
                    type="file"
                    id="profile_picture"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        profile_picture: e.target.files[0],
                      })
                    }
                  />
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.full_name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, full_name: e.target.value })
                  }
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) =>
                    setEditForm({ ...editForm, username: e.target.value })
                  }
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) =>
                    setEditForm({ ...editForm, bio: e.target.value })
                  }
                  className="border border-gray-300 rounded p-2 w-full"
                  rows={3}
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded w-full hover:bg-indigo-700 active:scale-95 transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileModal;
