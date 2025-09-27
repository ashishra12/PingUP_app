import React, { useEffect, useRef, useState } from "react";
import { dummyMessagesData, dummyUserData } from "../assets/assets";
import { Paperclip, Send, X } from "lucide-react";

const ChatBox = () => {
  const [messages, setMessages] = useState(dummyMessagesData);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [user] = useState(dummyUserData);
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const sendMessage = () => {
    if (!text.trim() && images.length === 0) return;

    const newMessages = [];

    if (text.trim()) {
      newMessages.push({
        _id: Date.now(),
        text,
        message_type: "text",
        from_user_id: "me", // current user
        to_user_id: user._id,
        createdAt: new Date(),
      });
    }

    images.forEach((img) => {
      newMessages.push({
        _id: Date.now() + Math.random(),
        message_type: "image",
        media_url: URL.createObjectURL(img),
        from_user_id: "me",
        to_user_id: user._id,
        createdAt: new Date(),
      });
    });

    setMessages((prev) => [...prev, ...newMessages]);
    setText("");
    setImages([]);
  };

  return (
    user && (
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Header */}
        <div className="flex items-center gap-2 p-3 md:px-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-300">
          <img src={user.profile_picture} alt="" className="size-8 rounded-full" />
          <div>
            <p className="font-medium">{user.full_name}</p>
            <p className="text-gray-500 text-sm -mt-1.5">@{user.username}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-5 md:px-10 overflow-y-auto">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages
              .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((message, index) => {
                const isMe = message.from_user_id === "me";
                return (
                  <div
                    key={index}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`p-3 text-sm max-w-xs md:max-w-md rounded-lg shadow ${
                        isMe
                          ? "bg-indigo-600 text-white rounded-br-none"
                          : "bg-white text-slate-700 rounded-bl-none"
                      }`}
                    >
                      {message.message_type === "image" && (
                        <img
                          src={message.media_url}
                          alt=""
                          className="max-h-60 rounded-lg mb-2"
                        />
                      )}
                      {message.text && <p>{message.text}</p>}
                    </div>
                  </div>
                );
              })}
            <div ref={messageEndRef} />
          </div>
        </div>

        {/* Image Previews */}
        {images.length > 0 && (
          <div className="flex gap-2 p-3 border-t bg-gray-100 overflow-x-auto">
            {images.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="h-20 w-20 object-cover rounded-lg shadow"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex items-center gap-2 p-3 border-t bg-white">
          <label className="cursor-pointer">
            <Paperclip className="text-gray-500 hover:text-gray-700" />
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2 transition"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    )
  );
};

export default ChatBox;
