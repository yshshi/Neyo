import { LoaderIcon } from 'lucide-react'
import React from 'react'

const PageLoader = () => {
  return (
    <div className=' min-h-screen flex items-center justify-center bg-blue-200 h-screen'>
      <LoaderIcon className=' animate-spin size-16 text-primary'/>
    </div>
  )
}

export default PageLoader
