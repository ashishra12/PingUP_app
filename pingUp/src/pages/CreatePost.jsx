import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets'
import { X } from 'lucide-react' // for remove button icon

const CreatePost = () => {
  const [content, setContent] = useState('')
  const [images, setImages] = useState([]) // store multiple images
  const [loading, setLoading] = useState(false)
  const user = dummyUserData

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)

    // Filter out non-images and append to current state
    const validImages = files.filter((file) => file.type.startsWith('image/'))

    setImages((prevImages) => [...prevImages, ...validImages])
  }

  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== indexToRemove))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content && images.length === 0) {
      return alert('Please add some text or at least one image!')
    }
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log({
        content,
        images,
        createdBy: user.username,
      })
      setContent('')
      setImages([])
      setLoading(false)
      alert('Post created successfully!')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="max-w-3xl mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Create a New Post
          </h1>
          <p className="text-slate-600">
            Share your thoughts and experiences with the community.
          </p>
        </div>

        {/* Post Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xl bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-6"
        >
          {/* User Info */}
          <div className="flex items-center gap-3">
            <img
              src={user.profile_picture}
              alt="User Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="font-semibold">{user.full_name}</h2>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>

          {/* Post Content */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full border border-black-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            rows="4"
          />

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add images (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full border border-black-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />

            {/* Preview Images */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="w-full h-32 object-cover rounded-lg shadow"
                    />
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
