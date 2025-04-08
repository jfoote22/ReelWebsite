'use client';

import { useEffect, useRef, useState } from 'react';

const videos = [
  {
    src: '/video_reels/vfx-reel--star-wars--the-old-republic.mp4',
    thumbnail: '/video_reels/thumbnails/star-wars-thumb.jpg'
  },
  {
    src: '/video_reels/vfx-reel--where-the-wild-things-are.mp4',
    thumbnail: '/video_reels/thumbnails/wild-things-thumb.jpg'
  },
  {
    src: '/video_reels/vfx-reel--call-of-duty--roads-to-victory.mp4',
    thumbnail: '/video_reels/thumbnails/cod-thumb.jpg'
  },
  {
    src: '/video_reels/TeleportationDeviceActivation.mp4',
    thumbnail: '/video_reels/thumbnails/teleportation-thumb.jpg'
  },
  {
    src: '/video_reels/MortarShellExplodingInSoftDirt.mp4',
    thumbnail: '/video_reels/thumbnails/mortar-thumb.jpg'
  }
];

const VideoCarousel = () => {
  const [isVerticalView, setIsVerticalView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [thumbnailsGenerated, setThumbnailsGenerated] = useState(false);

  useEffect(() => {
    // Function to generate thumbnails
    const generateThumbnails = async () => {
      for (const video of videos) {
        const videoElement = document.createElement('video');
        videoElement.src = video.src;
        videoElement.currentTime = 1; // Seek to 1 second
        
        try {
          await new Promise((resolve) => {
            videoElement.addEventListener('seeked', () => {
              const canvas = document.createElement('canvas');
              canvas.width = 600;
              canvas.height = 337;
              const ctx = canvas.getContext('2d');
              ctx?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
              
              // Convert to blob and save
              canvas.toBlob((blob) => {
                if (blob) {
                  const formData = new FormData();
                  formData.append('thumbnail', blob);
                  formData.append('filename', video.thumbnail.split('/').pop() || '');
                  
                  fetch('/api/save-thumbnail', {
                    method: 'POST',
                    body: formData
                  });
                }
                resolve(null);
              }, 'image/jpeg', 0.8);
            }, { once: true });
          });
        } catch (error) {
          console.error('Error generating thumbnail:', error);
        }
      }
      setThumbnailsGenerated(true);
    };

    if (!thumbnailsGenerated) {
      generateThumbnails();
    }
  }, [thumbnailsGenerated]);

  useEffect(() => {
    if (!containerRef.current || isVerticalView || isHovered) return;
    
    const container = containerRef.current;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    
    const scroll = () => {
      if (container.scrollLeft >= scrollWidth - clientWidth) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 0.8;
      }
    };

    const intervalId = setInterval(scroll, 16);

    return () => clearInterval(intervalId);
  }, [isVerticalView, isHovered]);

  const toggleView = (e: React.MouseEvent) => {
    setIsVerticalView(!isVerticalView);
  };

  return (
    <section 
      className="w-full py-12 cursor-pointer"
      onClick={toggleView}
    >
      <h2 className="text-4xl font-bold text-white mb-8 px-8">PREVIOUS WORK</h2>
      <div 
        ref={containerRef}
        className={`relative w-full ${isVerticalView ? '' : 'overflow-x-hidden'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`${isVerticalView ? 'flex flex-col gap-8 px-8' : 'flex gap-4 px-8'}`}>
          {videos.map((video, index) => (
            <div 
              key={index} 
              className={`${isVerticalView ? 'w-full h-[600px] transition-all duration-500' : 'min-w-[600px] h-[337px]'} bg-gray-900 rounded-lg overflow-hidden`}
            >
              <video
                className="w-full h-full object-cover"
                src={video.src}
                poster={video.thumbnail}
                autoPlay={true}
                loop
                muted
                playsInline
              />
            </div>
          ))}
          {/* Duplicate videos for seamless loop - only show in horizontal mode */}
          {!isVerticalView && videos.slice(0, 2).map((video, index) => (
            <div 
              key={`duplicate-${index}`} 
              className="min-w-[600px] h-[337px] bg-gray-900 rounded-lg overflow-hidden"
            >
              <video
                className="w-full h-full object-cover"
                src={video.src}
                poster={video.thumbnail}
                autoPlay={true}
                loop
                muted
                playsInline
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoCarousel; 