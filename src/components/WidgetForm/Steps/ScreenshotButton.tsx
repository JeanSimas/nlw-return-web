import { Camera, Trash } from 'phosphor-react'
import React, { useState } from 'react'
import html2canvas from 'html2canvas'
import { Loading } from '../../Loading'

interface ScreenshotButtonProps {
  onScreenshotChange: (screenshot: string | null) => void,
  screenshot: string | null
}

export  function ScreenshotButton({onScreenshotChange, screenshot}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true)
    const canvas = await html2canvas(document.querySelector('html')!)
    const base64Image = canvas.toDataURL('image/png')
    onScreenshotChange(base64Image)
    setIsTakingScreenshot(false)
  }

  if(screenshot) {
    return (
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        style={{backgroundImage: `url(${screenshot})`}}
        onClick={()=> onScreenshotChange(null)}
        >
        <Trash weight="fill" />
      </button>
    )
  }
  return (
    <button 
      type="button"
      onClick={handleTakeScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors"
    >
      {isTakingScreenshot ? <Loading /> : <Camera className='w-6 h-6'/>}
    </button>
  )
}
