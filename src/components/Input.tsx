import { useState, useCallback, ChangeEvent } from 'react'

interface ImageInputProps {
    imageDataLoaded: (imageData: ImageData) => void;
    handleRotation: (angle: number) => void;
}

export const ImageInput = (props: ImageInputProps) => {
    const { imageDataLoaded, handleRotation } = props
    const [image, setImage] = useState<HTMLCanvasElement>(null as unknown as HTMLCanvasElement)
    const [angle, setAngle] = useState<number>(0.0)

    const setImageRef = useCallback((image: HTMLCanvasElement) => {
        setImage(image)
    }, [])

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (!e.target.files.length) {
                return;
            }
            const newImage: HTMLImageElement = new Image();
            newImage.src = URL.createObjectURL(e.target.files[0]);
            newImage.onload = () => {
                image.width = newImage.width;
                image.height = newImage.height;
                if (image) {
                    const ctx = image.getContext('2d');
                    if (ctx) {
                        ctx.drawImage(newImage, 0, 0);
                        const imageData = ctx.getImageData(0, 0, image.width, image.height);
                        console.log(imageData)
                        imageDataLoaded(imageData);
                    }
                }
            }
        }
    }

    const handleAngle = (e: ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setAngle(val);
    }

    const handleRotationClick = () => {
        handleRotation(angle);
    }

    return (
        <div className='mt-6'>
            <div className='flex justify-center items-center space-x-10'>
                <input
                    type='file'
                    name='image' accept='image/*' onChange={handleImage} className="block w-[600px] text-sm p-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
                <input
                    type='number' name='angle' placeholder='Angle' className="block p-2 w-1/2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    onChange={(e) => handleAngle(e)} min={0} max={360} minLength={1} maxLength={3} />
                <button onClick={handleRotationClick} className="block p-2 w-auto text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none">Rotate</button>
            </div>
            <canvas className='hidden' ref={setImageRef} />
        </div>
    )
}