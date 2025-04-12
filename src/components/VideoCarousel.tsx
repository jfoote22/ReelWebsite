'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  const [playingStates, setPlayingStates] = useState<boolean[]>(new Array(videos.length).fill(true));
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
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
    const scrollThreshold = scrollWidth - clientWidth - 10; // Add small threshold for better detection

    const scroll = () => {
      if (!container) return;
      
      if (container.scrollLeft >= scrollThreshold) {
        // When we reach the end, quickly reset to start
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 1; // Smoother scrolling speed
      }
    };

    // Increase frequency for smoother animation
    const intervalId = setInterval(scroll, 20);

    // Cleanup function
    return () => {
      clearInterval(intervalId);
      if (container) {
        container.scrollLeft = 0; // Reset scroll position on cleanup
      }
    };
  }, [isVerticalView, isHovered]);

  // Add click outside handler
  useEffect(() => {
    if (!isVerticalView) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsVerticalView(false);
        // Keep videos playing when collapsing
        videoRefs.current.forEach((video, index) => {
          if (video) {
            video.play().catch(() => {
              setPlayingStates(prev => {
                const newStates = [...prev];
                newStates[index] = false;
                return newStates;
              });
            });
          }
        });
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isVerticalView]);

  const toggleView = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from bubbling to document
    setIsVerticalView(!isVerticalView);
    // Keep videos playing when switching views
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.play().catch(() => {
          setPlayingStates(prev => {
            const newStates = [...prev];
            newStates[index] = false;
            return newStates;
          });
        });
      }
    });
  };

  const togglePlay = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (playingStates[index]) {
        video.pause();
      } else {
        video.play().catch(() => {
          setPlayingStates(prev => {
            const newStates = [...prev];
            newStates[index] = false;
            return newStates;
          });
        });
      }
    }
  };

  const rewindTenSeconds = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = Math.max(0, video.currentTime - 10);
    }
  };

  const restartVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
    }
  };

  useEffect(() => {
    // Add event listeners for each video
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      const handlePlay = () => {
        setPlayingStates(prev => {
          const newStates = [...prev];
          newStates[index] = true;
          return newStates;
        });
      };

      const handlePause = () => {
        setPlayingStates(prev => {
          const newStates = [...prev];
          newStates[index] = false;
          return newStates;
        });
      };

      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);

      return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    });
  }, [isVerticalView]); // Re-run when view changes

  return (
    <section 
      className="w-full py-6 sm:py-12"
    >
      <h2 className="text-xl sm:text-2xl font-light tracking-wide mb-4 sm:mb-6">PREVIOUS WORK</h2>
      <div 
        ref={containerRef}
        className={`relative w-full ${isVerticalView ? '' : 'overflow-x-hidden'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ WebkitOverflowScrolling: 'touch' }} // Improve mobile scrolling
      >
        <div 
          className={`${isVerticalView ? 'flex flex-col gap-4 sm:gap-8 px-4 sm:px-8' : 'flex gap-2 sm:gap-4 px-4 sm:px-8'}`}
          onClick={(e) => {
            if (!isVerticalView) {
              e.stopPropagation();
              setIsVerticalView(true);
              // Keep videos playing when expanding
              videoRefs.current.forEach((video, index) => {
                if (video) {
                  video.play().catch(() => {
                    setPlayingStates(prev => {
                      const newStates = [...prev];
                      newStates[index] = false;
                      return newStates;
                    });
                  });
                }
              });
            }
          }}
        >
          {videos.map((video, index) => (
            <div 
              key={index} 
              className={`${
                isVerticalView 
                  ? 'w-full h-[200px] sm:h-[400px] md:h-[500px] lg:h-[600px] transition-all duration-500' 
                  : 'min-w-[280px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] h-[157px] sm:h-[225px] md:h-[281px] lg:h-[337px] cursor-pointer'
              } relative bg-gray-900 rounded-md overflow-hidden border-[2px] sm:border-[3px] border-gray-500/20 animate-[shimmer_4s_ease-in-out_infinite]`}
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                className="w-full h-full object-cover rounded-[2px] sm:rounded-[4px]"
                src={video.src}
                poster={video.thumbnail}
                autoPlay={true}
                loop
                muted
                playsInline
                onPlay={() => {
                  setPlayingStates(prev => {
                    const newStates = [...prev];
                    newStates[index] = true;
                    return newStates;
                  });
                }}
              />
              {isVerticalView && (
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 hover:opacity-100 transition-opacity duration-200"
                  onClick={(e) => e.stopPropagation()} // Prevent collapse when clicking controls
                >
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => togglePlay(index)}
                    className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-white bg-black/30 text-white hover:bg-white hover:text-black transition-colors"
                  >
                    {playingStates[index] ? (
                      <Pause className="h-7 w-7 sm:h-10 sm:w-10 fill-current" />
                    ) : (
                      <Play className="h-7 w-7 sm:h-10 sm:w-10 fill-current" />
                    )}
                    <span className="sr-only">{playingStates[index] ? "Pause" : "Play"} video</span>
                  </Button>
                  <div className="flex gap-4">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => rewindTenSeconds(index)}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-black/30 text-white hover:bg-white hover:text-black transition-colors"
                    >
                      <RotateCcw className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span className="sr-only">Rewind 10 seconds</span>
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => restartVideo(index)}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-black/30 text-white hover:bg-white hover:text-black transition-colors"
                    >
                      <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span className="sr-only">Restart video</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {/* Duplicate first few videos for seamless loop */}
          {!isVerticalView && videos.slice(0, 3).map((video, index) => (
            <div 
              key={`duplicate-${index}`} 
              className="min-w-[280px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] h-[157px] sm:h-[225px] md:h-[281px] lg:h-[337px] bg-gray-900 rounded-md overflow-hidden border-[2px] sm:border-[3px] border-gray-500/20 animate-[shimmer_4s_ease-in-out_infinite]"
            >
              <video
                className="w-full h-full object-cover rounded-[2px] sm:rounded-[4px]"
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