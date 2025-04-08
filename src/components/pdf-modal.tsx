"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface PDFModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PDFModal({ isOpen, onClose }: PDFModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] bg-white">
        <div className="relative w-full h-full">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <iframe
            src="/resume/JUSTIN_FOOTE_Resume.pdf#toolbar=0"
            className="w-full h-full"
            title="Resume PDF"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
} 