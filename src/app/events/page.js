import React from 'react'
import Events from './Events'
import App from '@/components/Navbar'
const MyEvents = () => {
  return (
    <div>
    <App />
    <div className="lg:mt-16 lg:block">
    <Events />
    </div>
    </div>
  )
}

export default MyEvents