"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

// Project carousel images - using all images from the img directory
const projectImages = [
  "/img/vfx-carousel.jpg",
  "/img/d2-carousel.jpg",
  "/img/mea-carousel3.jpg",
  "/img/dai-carousel.jpg",
  "/img/dai-carousel2.jpg",
  "/img/swtor-carousel.jpg",
  "/img/wtwta-carousel.jpg",
  "/img/shrek-carousel.jpg",
  "/img/cod-carousel.jpg",
  "/img/mea-carousel2.jpg",
  "/img/mhl-carousel.jpg",
  "/img/mea-carousel.jpg"
]

export default function BackgroundSlider() {
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const [scale, setScale] = useState(1)
  const [translateY, setTranslateY] = useState(0)
  const [containerOpacity, setContainerOpacity] = useState(1)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Start with the first image
    setActiveImage(0)

    // Start the animation cycle
    const cycle = () => {
      timeoutRef.current = setTimeout(() => {
        setActiveImage((current) => {
          if (current === null) return 0
          return (current + 1) % projectImages.length
        })
        cycle() // Schedule next cycle
      }, 4000) // Total time for each image (animation + pause)
    }

    cycle()

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const windowWidth = window.innerWidth
      const halfwayPoint = windowHeight / 2
      
      // Calculate scale, position, and opacity based on scroll position
      if (scrollPosition <= halfwayPoint) {
        const progress = scrollPosition / halfwayPoint
        // Calculate scale needed to fit within viewport
        const containerWidth = windowWidth * (windowWidth < 768 ? 0.8 : 0.6)
        const containerHeight = windowHeight * (windowWidth < 768 ? 0.5 : 0.4)
        
        // Calculate the maximum scale that keeps the image within viewport bounds
        const scaleToFitWidth = windowWidth / containerWidth
        const scaleToFitHeight = windowHeight / containerHeight
        const maxScale = Math.min(scaleToFitWidth, scaleToFitHeight) // Use min instead of max to ensure it fits
        
        const newScale = 1 + (progress * (maxScale - 1))
        const newTranslateY = progress * (windowWidth < 768 ? 100 : 150)
        const newOpacity = 1 - (progress * 0.7)
        setScale(newScale)
        setTranslateY(newTranslateY)
        setContainerOpacity(newOpacity)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 bg-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-[60%] h-[40%] md:w-[60%] md:h-[40%] sm:w-[80%] sm:h-[50%] relative transition-all duration-100 ease-out"
          style={{ 
            transform: `scale(${scale}) translateY(${translateY}px)`,
            transformOrigin: 'center center',
            opacity: containerOpacity
          }}
        >
          {projectImages.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className={`absolute inset-0 transition-all duration-2000 ease-in-out`}
              style={{
                opacity: activeImage === index ? 1 : 0,
                transform: `translateX(${
                  activeImage === index
                    ? "0%"
                    : activeImage === (index - 1 + projectImages.length) % projectImages.length
                    ? "-100%"
                    : "100%"
                })`,
                zIndex: activeImage === index ? 1 : 0,
                transition: activeImage === index 
                  ? 'opacity 2000ms cubic-bezier(0.1, 0.2, 0.8, 1), transform 2000ms ease-in-out' 
                  : 'opacity 2000ms cubic-bezier(0.1, 0.2, 0.8, 1), transform 2000ms ease-in-out',
              }}
            >
              <Image
                src={image}
                alt={`Project background ${index + 1}`}
                fill
                priority={index === 0}
                className="object-contain rounded-md"
                sizes="(max-width: 768px) 80vw, 60vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 