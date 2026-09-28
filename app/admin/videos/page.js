"use client";

import { useState } from "react";
import { FaYoutube, FaPlus, FaTrash, FaEdit, FaLink, FaImage, FaClock, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// Dummy data for now
const initialVideos = [
  {
    id: "v1",
    title: "10kW Hybrid Solar System Installation with Elevated Structure in Karachi",
    videoId: "XRYCaSaxHdM",
    duration: "14:20",
    views: "18.4K",
    category: "Rooftop Installation",
    status: "Published",
    date: "2023-10-15",
  },
  {
    id: "v2",
    title: "How to Choose the Right Solar Inverter: Hybrid vs On-Grid in Karachi",
    videoId: "S5PHqqgaBSQ",
    duration: "09:45",
    views: "12.8K",
    category: "Inverter Guide",
    status: "Published",
    date: "2023-11-02",
  },
  {
    id: "v3",
    title: "K-Electric Green Net Meter Application & Meter Replacement Walkthrough",
    videoId: "4l9RHRa2CIM",
    duration: "16:02",
    views: "22.5K",
    category: "Net Metering",
    status: "Published",
    date: "2023-12-20",
  },
];

export default function AdminVideos() {
  const [videos, setVideos] = useState(initialVideos);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddVideo = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Basic extraction of video ID from URL
      let videoId = "new_video";
      try {
        if (newVideoUrl.includes("youtube.com/watch")) {
          videoId = new URL(newVideoUrl).searchParams.get("v");
        } else if (newVideoUrl.includes("youtu.be/")) {
          videoId = newVideoUrl.split("youtu.be/")[1]?.split("?")[0];
        } else {
            videoId = newVideoUrl;
        }
      } catch (err) {
        videoId = newVideoUrl;
      }

      const newVid = {
        id: `v${Date.now()}`,
        title: "New Video Processing...", // In reality, we'd fetch info from YouTube API
        videoId: videoId,
        duration: "00:00",
        views: "0",
        category: "Uncategorized",
        status: "Processing",
        date: new Date().toISOString().split("T")[0],
      };
      
      setVideos([newVid, ...videos]);
      setNewVideoUrl("");
      setIsSubmitting(false);
      setShowAddModal(false);
    }, 1500);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this video from the website?")) {
      setVideos(videos.filter(v => v.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Video Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your YouTube showcase videos that appear on the homepage.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-red-500/20 hover:-translate-y-0.5 text-sm whitespace-nowrap shrink-0"
        >
          <FaPlus size={12} />
          Add New Video
        </button>
      </div>

      {/* Videos List */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
               <FaYoutube size={16} />
             </div>
             <h2 className="text-base font-bold text-gray-900">Showcase Library</h2>
          </div>
          <span className="text-xs font-bold text-gray-500">
            {videos.length} / 12 Videos
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Video Details</th>
                <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Stats</th>
                <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {videos.map((video) => (
                <tr key={video.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {/* Thumbnail Placeholder */}
                      <div className="w-24 h-14 bg-gray-100 rounded-md overflow-hidden relative shrink-0 border border-gray-200 group-hover:border-red-300 transition-colors">
                        <img 
                          src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                         <div className="absolute inset-0 hidden items-center justify-center text-gray-400 bg-gray-100">
                            <FaImage />
                         </div>
                      </div>
                      <div className="max-w-xs xl:max-w-md">
                        <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-red-600 transition-colors">{video.title}</h3>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                          <span className="flex items-center gap-1.5"><FaLink size={10} /> {video.videoId}</span>
                          <span className="flex items-center gap-1.5"><FaClock size={10} /> {video.date}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-gray-50 text-gray-600 border border-gray-100">
                      {video.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-gray-900">{video.views} views</span>
                      <span className="text-[11px] text-gray-500">{video.duration} runtime</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                       {video.status === "Published" ? (
                           <>
                             <FaCheckCircle className="text-green-500" size={14} />
                             <span className="text-xs font-bold text-green-500">{video.status}</span>
                           </>
                       ) : (
                           <>
                             <FaExclamationCircle className="text-yellow-500" size={14} />
                             <span className="text-xs font-bold text-yellow-500">{video.status}</span>
                           </>
                       )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-400 flex items-center justify-center transition-all border border-transparent hover:border-blue-200">
                        <FaEdit size={12} />
                      </button>
                      <button 
                        onClick={() => handleDelete(video.id)}
                        className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-400 flex items-center justify-center transition-all border border-transparent hover:border-red-200"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {videos.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500 text-sm">
                    No videos found. Add your first YouTube video to display on the website.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Video Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl border border-gray-100 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaYoutube className="text-red-600" />
                Add YouTube Video
              </h3>
              <button 
                onClick={() => !isSubmitting && setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddVideo} className="p-6">
              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  YouTube Video URL
                </label>
                <div className="relative">
                  <FaLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    required
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-11 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all focus:bg-white"
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-2">
                  Paste the full YouTube URL. We will automatically fetch the title, thumbnail, and duration.
                </p>
              </div>

              <div className="flex gap-3 justify-end mt-8">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-lg text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !newVideoUrl}
                  className="px-6 py-2.5 rounded-lg text-sm font-bold bg-red-600 hover:bg-red-500 text-white transition-all shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:shadow-none flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Add Video"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
