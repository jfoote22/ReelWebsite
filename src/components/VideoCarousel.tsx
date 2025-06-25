'use client';

import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import YouTubeEmbed from '@/components/youtube-embed';

// Define the interface for video items
export interface VideoItem {
  src: string;
  thumbnail: string;
  fallbackSrc?: string; // Optional fallback source if main source fails
  type?: 'video' | 'youtube'; // Add type to differentiate between normal videos and YouTube embeds
  videoId?: string; // YouTube video ID if type is 'youtube'
  title?: string; // Title for the video
  description?: string; // Description for the video
}

// Technical VFX work videos array - reordered per user request
export const technicalVfxVideos: VideoItem[] = [
  {
    src: '/video_reels/generated-buildings.mp4',
    thumbnail: 'https://img.youtube.com/vi/DT5G3mxiBoo/maxresdefault.jpg',
    type: 'youtube',
    videoId: 'DT5G3mxiBoo',
    title: 'Procedural Building Generator',
    description: 'A Houdini-based tool for generating randomized building structures with configurable parameters. This system creates diverse architectural elements including walls, windows, doors, and roofing details, allowing for rapid prototyping of urban environments with realistic variation.'
  },
  {
    src: '/video_reels/ground-cable-generator.mp4',
    thumbnail: 'https://img.youtube.com/vi/5Xl0kXeAL5E/maxresdefault.jpg',
    type: 'youtube',
    videoId: '5Xl0kXeAL5E',
    title: 'Physics Based Cable Generator',
    description: 'An advanced cable simulation system that automatically generates realistic power lines and cables that conform to terrain geometry. The tool calculates proper tension, sag, and physics-based behavior while maintaining performance optimization for real-time applications.'
  },
  {
    src: '/video_reels/foliage-generator.mp4',
    thumbnail: 'https://img.youtube.com/vi/WXFde915cDo/hqdefault.jpg',
    type: 'youtube',
    videoId: 'WXFde915cDo',
    title: 'Top Surface Foliage Generator',
    description: 'A Houdini-based procedural system for generating realistic foliage and vegetation on terrain surfaces. This tool automatically distributes grass, plants, and ground cover based on surface properties, slope angles, and environmental factors for natural-looking landscape generation.'
  },
  {
    src: '/video_reels/cable-generator.mp4',
    thumbnail: 'https://img.youtube.com/vi/fMpmnO3q7w8/maxresdefault.jpg',
    type: 'youtube',
    videoId: 'fMpmnO3q7w8',
    title: 'Stylized Tree Generator',
    description: 'A sophisticated tree generation system built in Houdini that creates realistic tree structures with natural branching patterns, seasonal variations, and wind simulation. Includes bark texturing, leaf distribution, and optimization tools for game-ready assets.'
  },
  {
    src: '/video_reels/vine-generator.mp4',
    thumbnail: 'https://img.youtube.com/vi/cXx5G3UhGKs/maxresdefault.jpg',
    type: 'youtube',
    videoId: 'cXx5G3UhGKs',
    title: 'Curve Based Cable Generator',
    description: 'A comprehensive cable generation system for creating overhead power lines, suspension cables, and industrial wire networks. Features dynamic length calculation, automatic pole placement, and realistic physics simulation with customizable materials and weathering effects.'
  },
  {
    src: '/video_reels/fountain-simulation-vat-FINAL.mp4',
    thumbnail: 'https://img.youtube.com/vi/eyx92HTPlc0/hqdefault.jpg',
    type: 'youtube',
    videoId: 'eyx92HTPlc0',
    title: 'Procedural Vine Generator',
    description: 'A procedural vine and vegetation growth system that creates natural-looking organic structures. The tool simulates realistic growth patterns, branch distribution, and leaf placement while providing artist-friendly controls for shaping and directing growth behavior.'
  },
  {
    src: '/video_reels/pipe-generator.mp4',
    thumbnail: 'https://img.youtube.com/vi/sLYg3IkzJZM/hqdefault.jpg',
    type: 'youtube',
    videoId: 'sLYg3IkzJZM',
    title: 'Pipe Generator',
    description: 'Houdini based tool for generating pipes and sprinkler systems along ceilings or for industrial or plumbing situations.'
  },
  {
    src: '/video_reels/tree-generator.mp4',
    thumbnail: 'https://img.youtube.com/vi/nA7jJctTQgo/maxresdefault.jpg',
    type: 'youtube',
    videoId: 'nA7jJctTQgo',
    title: 'Fountain Simulation',
    description: 'A complex fluid simulation system showcasing advanced water dynamics for fountain and water feature design. Utilizes Vertex Animation Textures (VAT) for efficient real-time playback while maintaining high-quality fluid behavior and realistic water interaction physics.'
  }
];

// In-Game VFX work videos array - two videos for the featured section
export const inGameVfxVideos: VideoItem[] = [
  {
    src: '/video_reels/in-game-vfx-reel-2.mp4',
    thumbnail: 'https://img.youtube.com/vi/Byraswh5Rk8/hqdefault.jpg',
    type: 'youtube',
    videoId: 'Byraswh5Rk8' // Justin Foote In-Game VFX Reel
  },
  {
    src: '/video_reels/in-game-vfx-reel.mp4',
    thumbnail: 'https://img.youtube.com/vi/4h8lpa2iuso/hqdefault.jpg',
    type: 'youtube',
    videoId: '4h8lpa2iuso' // Arma Aura weapon BFX
  }
];

// Remove Hololens videos and use working videos only
export const videos: VideoItem[] = [
  {
    src: '/video_reels/vfx-reel--star-wars--the-old-republic.mp4',
    thumbnail: '/video_reels/thumbnails/star-wars-thumb.jpg',
    type: 'youtube',
    videoId: '21HXamqCyZY'
  },
  {
    src: '/video_reels/vfx-reel--where-the-wild-things-are.mp4',
    thumbnail: '/video_reels/thumbnails/wild-things-thumb.jpg',
    type: 'youtube',
    videoId: 'H5YUZWQqHaQ'
  },
  {
    src: '/video_reels/vfx-reel--call-of-duty--roads-to-victory.mp4',
    thumbnail: '/video_reels/thumbnails/cod2-thumb.jpg',
    type: 'youtube',
    videoId: 'O9vNye383zw'
  },
  {
    src: '/video_reels/destiny-effects.mp4',
    thumbnail: '/video_reels/thumbnails/hololens-thumb.jpg',
    type: 'youtube',
    videoId: 'ie3wRVpzd8o'
  },
  {
    src: '/video_reels/Tornadotorch.mp4',
    thumbnail: '/video_reels/thumbnails/tornadotorch-thumb.jpg',
    type: 'youtube',
    videoId: '3L3A2zv5v34'
  },
  {
    src: '/video_reels/TeleportationDeviceActivation.mp4',
    thumbnail: '/video_reels/thumbnails/teleportation-thumb.jpg',
    type: 'youtube',
    videoId: 'yidVFPRkmC8'
  },
  {
    src: '/video_reels/MortarShellExplodingInSoftDirt.mp4',
    thumbnail: '/video_reels/thumbnails/mortar-thumb.jpg',
    type: 'youtube',
    videoId: '2ComkznaI9o'
  },
  {
    src: '/video_reels/mass-effect-andromeda.mp4',
    thumbnail: '/video_reels/thumbnails/shipcrash-thumb.jpg',
    type: 'youtube',
    videoId: 'uGglLTqU10w'
  }
];

const VideoCarousel = () => {
  const [isVerticalView, setIsVerticalView] = useState(false);
  const [playingStates, setPlayingStates] = useState<boolean[]>([]);
  const [videoLoadErrors, setVideoLoadErrors] = useState<boolean[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
  
  // Function to generate thumbnails
  const generateThumbnails = async () => {
    for (const video of videos) {
      // Skip YouTube videos as they don't need generated thumbnails
      if (video.type === 'youtube') continue;

      const videoElement = document.createElement('video');
      videoElement.src = video.src;
      videoElement.currentTime = 1; // Seek to 1 second
      
      try {
        await new Promise((resolve) => {
          const onError = () => {
            // Try fallback source if available
            if (video.fallbackSrc) {
              videoElement.src = video.fallbackSrc;
              videoElement.load();
            } else {
              resolve(null);
            }
          };
          
          videoElement.addEventListener('error', onError, { once: true });
          
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
  };

  useEffect(() => {
    // Initialize playing states
    setPlayingStates(new Array(videos.length).fill(false));
    setVideoLoadErrors(new Array(videos.length).fill(false));
    
    // Initialize video refs
    videoRefs.current = videoRefs.current.slice(0, videos.length);
    
    // Generate thumbnails if needed
    generateThumbnails();
  }, []);

  const handlePlay = (index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRefs.current[index];
    if (video) {
      video.play();
      const newPlayingStates = [...playingStates];
      newPlayingStates[index] = true;
      setPlayingStates(newPlayingStates);
    }
  };

  const handlePause = (index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      const newPlayingStates = [...playingStates];
      newPlayingStates[index] = false;
      setPlayingStates(newPlayingStates);
    }
  };

  const handleRewind = (index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      video.play();
      const newPlayingStates = [...playingStates];
      newPlayingStates[index] = true;
      setPlayingStates(newPlayingStates);
    }
  };
  
  // Add a function to handle video selection
  const handleVideoSelect = (index: number) => {
    setSelectedVideoIndex(index);
    setIsVerticalView(true);
  };
  
  // Add a function to close the modal
  const handleCloseModal = () => {
    setIsVerticalView(false);
    setSelectedVideoIndex(null);
  };
  
  return (
    <section className="w-full py-6 sm:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {videos.map((video, index) => (
          <div 
            key={index} 
            className="relative bg-gray-900 rounded-md overflow-hidden border-[2px] sm:border-[3px] border-gray-500/20 animate-[shimmer_4s_ease-in-out_infinite] aspect-video cursor-pointer"
            onClick={() => handleVideoSelect(index)}
          >
            {videoLoadErrors[index] ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <Image 
                  src={video.thumbnail} 
                  alt="Video thumbnail" 
                  width={600} 
                  height={337} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <p className="text-white text-center p-4">Video could not be loaded</p>
                </div>
              </div>
            ) : video.type === 'youtube' ? (
              <div className="w-full h-full">
                <YouTubeEmbed
                  videoId={video.videoId as string}
                  title={`Video ${index + 1}`}
                  autoplay={false}
                  showControls={true}
                />
              </div>
            ) : (
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                style={{
                  objectFit: 'cover',
                }}
                className="w-full h-full object-cover rounded-[2px] sm:rounded-[4px]"
                src={video.src}
                poster={video.thumbnail}
                autoPlay
                preload="auto"
                playsInline
                muted
                loop
                onError={(e) => {
                  const target = e.target as HTMLVideoElement;
                  // Try fallback if available
                  if (video.fallbackSrc && target.src !== video.fallbackSrc) {
                    console.log(`Trying fallback for video ${index}`);
                    target.src = video.fallbackSrc;
                    target.load();
                  } else {
                    console.error(`Video ${index} failed to load:`, e);
                    const newErrors = [...videoLoadErrors];
                    newErrors[index] = true;
                    setVideoLoadErrors(newErrors);
                  }
                }}
              />
            )}
            
            {/* Video controls overlay */}
            {!video.type && !videoLoadErrors[index] && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-2">
                  {playingStates[index] ? (
                    <Button 
                      variant="ghost" 
                      className="rounded-full bg-black/50 hover:bg-white/20 transition-colors duration-200"
                      onClick={(e) => handlePause(index, e)}
                    >
                      <Pause className="h-5 w-5 text-white" />
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost" 
                      className="rounded-full bg-black/50 hover:bg-white/20 transition-colors duration-200"
                      onClick={(e) => handlePlay(index, e)}
                    >
                      <Play className="h-5 w-5 text-white" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    className="rounded-full bg-black/50 hover:bg-white/20 transition-colors duration-200"
                    onClick={(e) => handleRewind(index, e)}
                  >
                    <RotateCcw className="h-5 w-5 text-white" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Modal for expanded video view */}
      {isVerticalView && selectedVideoIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 p-4 flex items-center justify-center" onClick={handleCloseModal}>
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-lg" onClick={(e) => e.stopPropagation()}>
            {videos[selectedVideoIndex].type === 'youtube' ? (
              <div className="aspect-video w-full">
                <YouTubeEmbed
                  videoId={videos[selectedVideoIndex].videoId as string}
                  title={`Video ${selectedVideoIndex + 1}`}
                  autoplay={true}
                  showControls={true}
                  loop={true}
                />
              </div>
            ) : (
              <video
                className="w-full aspect-video object-contain"
                src={videos[selectedVideoIndex].src}
                controls
                autoPlay
                loop
                playsInline
              />
            )}
            
            <Button
              variant="ghost"
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-white/20 rounded-full z-10 p-2"
              onClick={handleCloseModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoCarousel; 