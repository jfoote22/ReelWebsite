"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function PDFEmbed() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const embed = document.querySelector('embed')
    if (embed) {
      embed.onload = () => {
        setIsLoading(false)
      }
      embed.onerror = () => {
        setError("Failed to load PDF")
        setIsLoading(false)
      }
    }
  }, [])

  return (
    <div className="mb-24">
      <h2 className="text-2xl font-light mb-6 tracking-wide">RESUME</h2>
      <motion.div 
        className="relative overflow-hidden flex justify-center"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative w-[800px] h-[1036px] overflow-y-auto bg-transparent">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              {error}
            </div>
          )}
          <embed
            src="/resume/JUSTIN_FOOTE_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
            type="application/pdf"
            className="w-full h-full"
            title="Justin Foote Resume"
            style={{ backgroundColor: 'transparent' }}
          />
        </div>
      </motion.div>
    </div>
  )
} 