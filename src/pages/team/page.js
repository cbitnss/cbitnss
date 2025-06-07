import React from 'react'
import ExecutivePage from '@/components/ExecutivePage'
import App from '@/components/Navbar'
const ExecutiveTeam = () => {
  return (
    <div>
      <App />
      <div className="lg:mt-16 lg:block">
      <ExecutivePage />
      </div>
    </div>
  )
}

export default ExecutiveTeam