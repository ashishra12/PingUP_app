import { BadgeCheck } from 'lucide-react'
import { X } from 'lucide-react'

import React from 'react'

function StoryViewer({ viewStory, setViewStory }) {
  const [Progress, setProgress] = React.useState(0);
    React.useEffect(() => {
        let timer,progressInterval ;
        if(viewStory &&viewStory.media_type !== "video"){
            setProgress(0);
           const duration =10000;
           const stepTime = 100; // update every 100ms
           let elapsed=0;
          progressInterval = setInterval(() => {
            elapsed += stepTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);
        }, stepTime);
            timer = setTimeout(() => {
                setViewStory(null);
            }, duration);

        }
      },[viewStory,setViewStory])
    const handleClose = () => {
        setViewStory(null);
    }
    const renderContent = () => {
        switch (viewStory.media_type) {
            case "image":
                return (
                    <img src={viewStory.media_url} alt="profile" className="max-w-full max-h-screen object-contain" />
                );
            case "video":
                return (
                    <video onEnded={handleClose} src={viewStory.media_url} className="max-h-screen" controls autoPlay />
                );
                 case "text":
                return (
                    <div className="w-full h-full flex items-center justify-center p-8 text-white text-2xl text-center" style={{ backgroundColor: viewStory.background_color || "#111827" }}>
                        {viewStory.content}
                    </div>
                );

                default:
                    return null ;
            }
        }
  return (
    <div
      className="fixed inset-0 z-110 h-screen bg-black bg-opacity-90 flex items-center justify-center p-4"
      style={{
        backgroundColor:
          viewStory?.media_type === "text"
            ? viewStory.background_color || "#111827" // fallback bg
            : "#000000",
      }}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
        <div
          className="h-full bg-white transition-all duration-100 linear"
          style={{ width: `${Progress}%` }} // <-- fixed %
        ></div>
      </div>

      {/* Header */}
      <div className="absolute top-4 left-4 flex items-center gap-2 space-x-3 p-2 px-4 sm:p-4 sm:px-8 backdrop-blur-2xl rounded bg-black/50">
        <img
          src={viewStory?.user.profile_picture}
          alt="profile"
          className="size-7 sm:size-8 rounded-full object-cover border border-white"
        />
        <div className="text-white font-medium flex items-center gap-2">
          <span>{viewStory?.user?.fullname}</span>
          <BadgeCheck size={18} />
        </div>
      </div>
      <button onClick={handleClose} className='absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none '>
         <X className='w-8 h-8 hover:scale-110 transition cursor-pointer' />
      </button>
      <div className='max-w-[90vw] max-h-[90vh] flex items-center justify-center'>
        {renderContent()}
      </div>
     
    </div>
  )
}

export default StoryViewer
