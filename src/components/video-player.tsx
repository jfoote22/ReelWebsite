"use client"

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, RotateCcw } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  src: string
  thumbnail?: string
  isPlaying: boolean
  onPlayToggle: () => void
  onRewind: () => void
  onRestart: () => void
}

export function VideoPlayer({ 
  src, 
  thumbnail, 
  isPlaying, 
  onPlayToggle, 
  onRewind, 
  onRestart 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsLoading(false)
      setError(null)
    }

    const handleError = () => {
      setIsLoading(false)
      setError('Failed to load video. Please try again later.')
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('error', handleError)
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(err => {
          console.error('Error playing video:', err)
          setError('Failed to play video. Please try again later.')
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying])

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <p className="text-white text-center">{error}</p>
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        poster={thumbnail}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPlayToggle}
            className="text-white hover:text-white/80"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRewind}
            className="text-white hover:text-white/80"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRestart}
            className="text-white hover:text-white/80"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 