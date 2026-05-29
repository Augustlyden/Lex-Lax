import pencilLoader from '../../assets/pencil-animated.png'
import '../../styles/loading.css'


const Loading = () => {
  return (
    <div className="pencil-loader-container">
      <img 
        src={pencilLoader} 
        className="pencil-loader" 
        alt="Laddar..." 
      />
      <p>Laddar...</p>
    </div>
  )
}

export default Loading