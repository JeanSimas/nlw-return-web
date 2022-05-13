import { ArrowLeft } from 'phosphor-react'
import React, { FormEvent, useState } from 'react'
import {FeedbackType, feedbackTypes} from '..'
import { CloseButton } from '../../CloseButton'
import { ScreenshotButton } from './ScreenshotButton'

interface FeedbackTypeContentProps {
  feedbackType: FeedbackType
  onFeedbackRestartRequested: () => void
  onFeedbackSent: () => void
}
export  function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent
}: FeedbackTypeContentProps) {
  const feedbackTypeInfo = feedbackTypes[feedbackType]

  const [screenshot, setScreenShot] = useState<null | string>(null)
  const [comment, setComment] = useState('')

  async function handleSendFeedback(event: FormEvent) {
    event.preventDefault()
    console.log({
      screenshot,
      comment
    })
    onFeedbackSent()
  }

  return (
    <>
      <header>
        <button 
          onClick={onFeedbackRestartRequested}
          type="button" 
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className='w-4 h-4'/>
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img 
            src={feedbackTypeInfo.image.source} 
            alt={feedbackTypeInfo.image.alt} 
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSendFeedback}>
        <textarea
          className='min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'
          placeholder='Conte com detalhes o que está acontecendo...'
          onChange={event => setComment(event.target.value)}
          ></textarea>
        <footer className='flex gap-2 mt-2'>
          <ScreenshotButton onScreenshotChange={setScreenShot} screenshot={screenshot} />

          <button 
            className="p-2 bg-brand-500 rounded-md border-transparent flex flex-1 justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:bg-brand-500"
            type='submit'
            disabled={comment.length === 0}
          >
            Enviar Feedback
          </button>
        </footer>
      </form>

      
    </>
  )
}
