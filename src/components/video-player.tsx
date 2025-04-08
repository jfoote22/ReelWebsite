"use client"

import { useState, useRef } from "react"
import { Play, Pause, RotateCcw, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  title: string
  featured?: boolean
  videoSrc?: string
}

export default function VideoPlayer({ title, featured = false, videoSrc }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const rewindTenSeconds = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10)
    }
  }

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div className="relative overflow-hidden rounded-md group">
      <div className={`bg-zinc-900 relative ${featured ? "aspect-video" : "aspect-video"}`}>
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
          />
        ) : (
          <div className="w-full h-full bg-zinc-800" />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="icon"
            variant="outline"
            onClick={togglePlay}
            className={`${featured ? "w-20 h-20" : "w-14 h-14"} rounded-full border-2 border-white bg-black/30 text-white hover:bg-white hover:text-black transition-colors`}
          >
            {isPlaying ? (
              <Pause className={`${featured ? "h-10 w-10" : "h-7 w-7"} fill-current`} />
            ) : (
              <Play className={`${featured ? "h-10 w-10" : "h-7 w-7"} fill-current`} />
            )}
            <span className="sr-only">{isPlaying ? "Pause" : "Play"} video</span>
          </Button>
          <div className="flex gap-4">
            <Button
              size="icon"
              variant="outline"
              onClick={rewindTenSeconds}
              className={`${featured ? "w-12 h-12" : "w-10 h-10"} rounded-full border-2 border-white bg-black/30 text-white hover:bg-white hover:text-black transition-colors`}
            >
              <RotateCcw className={`${featured ? "h-6 w-6" : "h-5 w-5"}`} />
              <span className="sr-only">Rewind 10 seconds</span>
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={restartVideo}
              className={`${featured ? "w-12 h-12" : "w-10 h-10"} rounded-full border-2 border-white bg-black/30 text-white hover:bg-white hover:text-black transition-colors`}
            >
              <RefreshCw className={`${featured ? "h-6 w-6" : "h-5 w-5"}`} />
              <span className="sr-only">Restart video</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className={`${featured ? "text-xl" : "text-lg"} font-light tracking-wide`}>{title}</h3>
      </div>
    </div>
  )
} 