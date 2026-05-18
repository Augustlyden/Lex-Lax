import React from 'react'
import '../styles/loading.css'
import pencilLoader from '../assets/pencil-animated.png'


const Loading = () => {
  return (
    <div className="pencil-loader-container">
      <img 
        src={pencilLoader} 
        className="pencil-loader" 
        alt="Laddar..." 
      />
    </div>
  )
}

export default Loading