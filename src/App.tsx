import { useState } from "react"
import { ImageInput } from "./components/Input"
import Rotator from "./utils/rotator"

function App() {

  const [uploadedImage, setUploadedImage] = useState<ImageData>(null as unknown as ImageData)
  const [rotatedImage, setRotatedImage] = useState<ImageData>(null as unknown as ImageData)
  const [rotationTime, setRotationTime] = useState<number>(0)

  const handleImageUpload = (imageData: ImageData) => {
    setUploadedImage(imageData)
  }

  const handleRotation = (angle: number) => {
    if (!uploadedImage) {
      return;
    }

    console.log('angle', angle)
    const radianVal = parseFloat((angle * Math.PI / 180).toFixed(2));
    const performanceVal = performance.now();
    const newRotator = new Rotator();
    const result = newRotator.rotate(uploadedImage, radianVal);
    const endPerformance = performance.now()
    setRotatedImage(result)
    setRotationTime(endPerformance - performanceVal)
  }

  return (
    <div className="bg-white text-gray-700 flex flex-col justify-start items-center text-center space-y-4 h-screen py-20">
      <div>
        <h1 className='text-2xl font-sans text-gray-700 font-bold'>
          Accenture Test
        </h1>
        <h2>
          To create the best image rotation algorithm.
        </h2>
      </div>
      <div>
        <ImageInput imageDataLoaded={handleImageUpload} handleRotation={handleRotation} />
      </div>
    </div>
  )
}

export default App
