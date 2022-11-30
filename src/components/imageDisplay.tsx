import { useCallback, useEffect, useState } from 'react'

interface ImageDisplayProps {
    title: string;
    subTitle?: string;
    imageData: ImageData;
}

export const ImageDisplay = (props: ImageDisplayProps) => {
    const { title, subTitle, imageData } = props;
    const [image, setImage] = useState<HTMLCanvasElement>(null as unknown as HTMLCanvasElement);
    const setImageRef = useCallback((image: HTMLCanvasElement) => {
        setImage(image)
    }, [])

    useEffect(() => {
        if (image !== null && imageData !== null) {
            image.getContext('2d')?.putImageData(imageData, 0, 0);
        }
    }, [image, imageData])

    return (
        <>
            {
                image === null && imageData === null ? null : (
                    <div className='space-y-4 mt-10'>
                        <div className='flex flex-col justify-start items-start'>
                            <h1 className='text-xl text-left text-gray-700 font-bold'>{title}</h1>
                            <div className='flex justify-start items-start space-x-2'>
                                <h3>Image dimensions</h3>
                                <div className='flex justify-start items-start space-x-2'>
                                    <span>Width: <span className='font-bold'>{imageData.width} px</span></span>
                                    <span>Height: <span className='font-bold'>{imageData.height} px</span></span>
                                </div>
                            </div>
                        </div>
                        <canvas className='border-2 border-red-500 p-5' ref={setImageRef} width={imageData.width} height={imageData.height} />
                        {subTitle && <h2 className='text-lg text-left text-gray-700 font-bold mt-4'>{subTitle}</h2>}
                    </div>
                )
            }
        </>
    )
}    
