"use client"
import Link from "next/link"
import { Menu } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import BackgroundSlider from "@/components/background-slider"
import VideoPlayer from "@/components/video-player"
import PDFModal from "@/components/pdf-modal"
import VideoCarousel from "@/components/VideoCarousel"

export default function Home() {
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <BackgroundSlider />

      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-light tracking-wider">
            JUSTIN FOOTE - VFX ARTIST
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Button 
              variant="ghost" 
              className="text-white hover:text-gray-300 transition-colors p-0 h-auto font-normal text-base"
              onClick={() => setIsPDFModalOpen(true)}
              style={{ fontFamily: 'inherit' }}
            >
              Resume
            </Button>
            <Link href="#reels" className="hover:text-gray-300 transition-colors">
              Reels
            </Link>
            <Link href="#about" className="hover:text-gray-300 transition-colors">
              About
            </Link>
            <Link href="#contact" className="hover:text-gray-300 transition-colors">
              Contact
            </Link>
          </nav>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-black/95 text-white border-gray-800">
              <div className="flex flex-col gap-6 mt-10">
                <Button 
                  variant="ghost" 
                  className="text-xl text-white hover:text-gray-300 transition-colors justify-start p-0 h-auto"
                  onClick={() => setIsPDFModalOpen(true)}
                >
                  Resume
                </Button>
                <Link href="#reels" className="text-xl hover:text-gray-300 transition-colors">
                  Reels
                </Link>
                <Link href="#about" className="text-xl hover:text-gray-300 transition-colors">
                  About
                </Link>
                <Link href="#contact" className="text-xl hover:text-gray-300 transition-colors">
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <PDFModal isOpen={isPDFModalOpen} onClose={() => setIsPDFModalOpen(false)} />

      <main className="pt-[calc(50vh+396px)] pb-16 relative z-10">
        <section id="reels" className="container mx-auto px-4 md:px-6">
          {/* Featured Reel */}
          <div className="mb-16">
            <h2 className="text-2xl font-light mb-6 tracking-wide">LATEST WORK</h2>
            <VideoPlayer 
              title="2016 VFX Demo Reel" 
              featured={true} 
              videoSrc="/video_reels/JustinFoote_Reel_2016.mp4"
            />
          </div>

          {/* Older Reels */}
          <div className="mb-24">
            <VideoCarousel />
          </div>

          {/* About Section */}
          <section id="about" className="mb-24">
            <h2 className="text-2xl font-light mb-8 tracking-wide">ABOUT</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <img
                  src="/placeholder.svg?height=600&width=600"
                  alt="VFX Artist Portrait"
                  className="w-full rounded-md"
                />
              </div>
              <div className="space-y-6 text-gray-300">
                <p className="text-lg">
                  For the past 21 years, I've been crafting visual stories through the art of visual effects. My journey
                  began in 2003 when I first discovered the magic of digital compositing.
                </p>
                <p className="text-lg">
                  Starting as a rotoscope artist at a small studio in Los Angeles, I quickly developed a passion for
                  bringing impossible worlds to life. By 2007, I had moved into more complex compositing work,
                  contributing to several independent films that gained recognition at festivals around the country.
                </p>
                <p className="text-lg">
                  The 2010s saw me expand into 3D animation and simulation, working with major studios on blockbuster
                  films. I've been fortunate to contribute to projects that have won technical achievement awards and
                  have been recognized for their groundbreaking visual effects.
                </p>
                <p className="text-lg">
                  Today, I split my time between high-end commercial work and personal artistic projects that push the
                  boundaries of what's possible with modern VFX tools. My approach combines technical precision with
                  artistic sensibility, always in service of the story being told.
                </p>
                <p className="text-lg">
                  When I'm not in front of a computer, you'll find me photographing landscapes, studying film, or
                  mentoring the next generation of VFX artists.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="text-center">
            <h2 className="text-2xl font-light mb-6 tracking-wide">CONTACT</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Interested in collaboration? Let's create something amazing together.
            </p>
            <div className="flex justify-center gap-8">
              <a href="mailto:contact@johndoe.com" className="text-white hover:text-gray-300 transition-colors">
                contact@johndoe.com
              </a>
              <a
                href="https://vimeo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Vimeo
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Instagram
              </a>
            </div>
          </section>
        </section>
      </main>

      <footer className="py-6 border-t border-gray-800/30 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} John Doe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
