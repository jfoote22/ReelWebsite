import { motion } from "framer-motion"

export default function PDFEmbed() {
  return (
    <div className="mb-24">
      <h2 className="text-2xl font-light mb-6 tracking-wide">RESUME</h2>
      <motion.div 
        className="relative overflow-hidden flex justify-center"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative w-[800px] h-[1036px] overflow-y-auto bg-transparent">
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