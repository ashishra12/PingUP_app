import React from "react";
import { ArrowLeft, Sparkle, TextIcon, Upload } from "lucide-react";
import { toast } from "react-hot-toast";

const StoryModal = ({ setShowModal, fetchStories }) => {
  const bgColors = ["#4f46e5", "#7c3aed", "#db2777", "#e11d48", "#ca8a04", "#0d9488"];
  const [mode, setMode] = React.useState("text");
  const [backgroundColor, setBackgroundColor] = React.useState(bgColors[0]);
  const [text, setText] = React.useState("");
  const [media, setMedia] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      toast.error("Only images or videos are allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setMedia(file);
    setPreviewUrl(URL.createObjectURL(file));
    setMode("media");
  };

  const handleCreateStory = async () => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (text.trim() || media) {
          resolve("success");
          fetchStories?.(); // refresh stories if provided
          setShowModal(false);
        } else {
          reject(new Error("Please add text or media before creating a story"));
        }
      }, 1500);
    });
  };

  return (
    <div className="fixed inset-0 z-[110] min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setShowModal(false)}
            className="text-white p-2 cursor-pointer"
            aria-label="Close story modal"
          >
            <ArrowLeft />
          </button>
          <h2 className="text-lg font-semibold">Create Story</h2>
          <span className="w-10" />
        </div>

        {/* Story Preview */}
        <div
          className="rounded-lg h-96 flex items-center justify-center relative overflow-hidden"
          style={{ backgroundColor }}
        >
          {mode === "text" && (
            <textarea
              className="w-full h-full p-6 text-white text-lg bg-transparent resize-none focus:outline-none"
              placeholder="Share your story..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          )}

          {mode === "media" && previewUrl && (
            media?.type.startsWith("image/") ? (
              <img src={previewUrl} alt="Story preview" className="w-full h-full object-cover" />
            ) : media?.type.startsWith("video/") ? (
              <video src={previewUrl} controls className="w-full h-full object-cover" />
            ) : null
          )}
        </div>

        {/* Background Color Selector */}
        {mode === "text" && (
          <div className="flex mt-4 gap-2">
            {bgColors.map((color) => (
              <button
                key={color}
                onClick={() => setBackgroundColor(color)}
                className={`w-10 h-10 rounded-full border-2 ${
                  backgroundColor === color ? "border-white" : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Set background ${color}`}
              />
            ))}
          </div>
        )}

        {/* Mode Selector */}
        <div className="flex gap-2 mt-4">
          <button
            className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${
              mode === "text" ? "bg-white text-black" : "bg-zinc-800"
            }`}
            onClick={() => {
              setMode("text");
              setMedia(null);
              setPreviewUrl(null);
            }}
          >
            <TextIcon size={18} /> Text
          </button>

          <label
            className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${
              mode === "media" ? "bg-white text-black" : "bg-zinc-800"
            }`}
          >
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaUpload}
              className="hidden"
            />
            <Upload size={18} /> Photo/Video
          </label>
        </div>

        {/* Create Button */}
        <button
          onClick={() =>
            toast.promise(handleCreateStory(), {
              loading: "Saving...",
              success: <p>Story created successfully!</p>,
              error: (e) => <p>Error: {e.message}</p>,
            })
          }
          className="flex items-center justify-center gap-2 p-2 rounded cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 hover:to-purple-700 active:scale-95 transition py-3 mt-4 w-full"
        >
          <Sparkle size={18} /> Create Story
        </button>
      </div>
    </div>
  );
};

export default StoryModal;
