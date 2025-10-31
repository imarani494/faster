import React, { useState, useRef } from 'react'
import { Share2, Download, Move } from 'lide-react'

const ImageSuperimpose = ({ restaurantImage, logoImage, onShare }) => {
  const [logoPosition, setLogoPosition] = useState({ x: 50, y: 50 })
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    updateLogoPosition(e)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    updateLogoPosition(e)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const updateLogoPosition = (e) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setLogoPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    })
  }

  const handleShare = async () => {
    if (onShare) {
      onShare()
    } else if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out ${restaurantImage.name} on Fastor!`,
          text: 'I found this amazing restaurant on Fastor app',
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    }
  }

  const handleDownload = () => {
    // In a real app, you would generate and download the composite image
    alert('Download functionality would be implemented here')
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image Container */}
          <div className="flex-1">
            <div
              ref={containerRef}
              className="relative bg-gray-100 rounded-lg overflow-hidden"
              style={{ paddingBottom: '75%' }} // 4:3 aspect ratio
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img
                src={restaurantImage}
                alt="Restaurant"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Fastor Logo Overlay */}
              <div
                className="absolute cursor-move select-none"
                style={{
                  left: `${logoPosition.x}%`,
                  top: `${logoPosition.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseDown={handleMouseDown}
              >
                <div className="relative group">
                  <img
                    src={logoImage || '/fastor-logo.png'}
                    alt="Fastor Logo"
                    className="h-16 w-16 object-contain filter drop-shadow-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Move className="h-6 w-6 text-white drop-shadow-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="lg:w-64 space-y-4">
            <div className="text-center lg:text-left">
              <h3 className="font-semibold text-lg mb-2">Customize & Share</h3>
              <p className="text-gray-600 text-sm">
                Drag the Fastor logo to reposition it anywhere on the image
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleShare}
                className="btn btn-primary w-full"
              >
                <Share2 className="h-4 w-4" />
                Share Image
              </button>

              <button
                onClick={handleDownload}
                className="btn btn-secondary w-full"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Tip:</strong> Drag the Fastor logo to any position on the image, then share it with your friends!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageSuperimpose