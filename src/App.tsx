import ObjectDetection from './components/ObjectDetection'
import './App.css'

function App() {

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Detector de Objetos con TensorFlowJS</h1>
      <ObjectDetection />
    </div>
  )
}

export default App
