import React from 'react'
import Events from './Events'
// import App from '@/components/Navbar' // removed
const MyEvents = () => {
  return (
    <div>
      {/* Navbar is provided by layout */}
      <div className="lg:mt-16 lg:block">
        <Events />
      </div>
    </div>
  )
}

export default MyEvents