import { CircleNotch } from 'phosphor-react'
import React from 'react'

export  function Loading() {
  return (
    <div className='w-6 h-6 flex items-center justify-center'>
      <CircleNotch weight="bold" className='w-6 h-6 animate-spin' />
    </div>
  )
}
