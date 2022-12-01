import { PI_OVER_TWO, TWO_PI } from "./constants";

export default class Rotator {

    /** 
     * @method rotationPointInRadians - rotates a point around a center point by a given angle in radians
     * This method calculates the rotation point in radians 
     * by calculating the center of the image and the angle
     * and then rotating it on the given angle 
     * and then returning the new point from the center of the image
    */
    private rotationPointInRadians = (pointX: number, pointY: number, centerX: number, centerY: number, sinAngle: number, cosAngle: number) => {
        const x = pointX - centerX;
        const y = pointY - centerY;
        return {
            x: Math.round((x * cosAngle) - (y * sinAngle) + centerX),
            y: Math.round((x * sinAngle) + (y * cosAngle) + centerY),
        };
    }

    /** 
     * @method calculateImageDimensions - Calculates the dimensions of the image after rotation
     * This method calculates the new image dimensions 
     * by calculating the new width and height of the image
     * and then returning the new width and height
    */
    private calculateImageDimensions = (width: number, height: number, angle: number) => {
        const sinAngle = Math.sin(angle);
        const sinValForSupposedWidth = Math.sin(PI_OVER_TWO - angle);

        const newWidth = Math.round(width * Math.abs(sinValForSupposedWidth) + height * Math.abs(sinAngle));
        const newHeight = Math.round(height * Math.abs(sinValForSupposedWidth) + width * Math.abs(sinAngle));

        return { width: newWidth, height: newHeight };
    }

    /**
     * @method rotatePixelArray - Rotates the pixel array
     * This method takes the imageData properties - width, height, data and angle by which the image is to be rotated.
     * It then reads the source image, maps the pixels to the new location 4 blocks at a time, 
     * and writes the result to the destination image. Simultaniously it calculates the new image dimensions based on the provided angle
     * and instantiates a new array that holds the new image data 
     * Finally, it returns the new image data and the new image dimensions
     */
    private rotatePixelArray(pixelArray: ImageData['data'], width: ImageData['width'], height: ImageData['height'], angle: number) {
        const angles = { sin: Math.sin(angle), cos: Math.cos(angle) };
        const center = { x: Math.round(width / 2), y: Math.round(height / 2) };

        const rotatedImageDimensions = this.calculateImageDimensions(width, height, angle);
        const sourceWidth = width * 4;
        const rotatedImgWidth = rotatedImageDimensions.width * 4;

        const subX = Math.round((rotatedImageDimensions.width - width) / 2);
        const subY = Math.round((rotatedImageDimensions.height - height) / 2);

        const unit8Arr = new Uint8ClampedArray(rotatedImgWidth * rotatedImageDimensions.height);

        let index = 0;

        for (let i = 0; i < pixelArray.length; i += 2) {
            const x = Math.round((i % sourceWidth) / 4);
            const y = index;
            const rotatedImgPoint = this.rotationPointInRadians(x, y, center.x, center.y, angles.sin, angles.cos);

            rotatedImgPoint.x += subX;
            rotatedImgPoint.y += subY;
            if (rotatedImgPoint.x >= 0 || rotatedImgPoint.x < rotatedImageDimensions.width || rotatedImgPoint.y >= 0 || rotatedImgPoint.y < rotatedImageDimensions.height) {
                const rotatedImgIndex = (rotatedImgPoint.y * rotatedImgWidth) + (rotatedImgPoint.x * 4);
                unit8Arr[rotatedImgIndex] = pixelArray[i];
                unit8Arr[rotatedImgIndex + 1] = pixelArray[i + 1];
                unit8Arr[rotatedImgIndex + 2] = pixelArray[i + 2];
                unit8Arr[rotatedImgIndex + 3] = pixelArray[i + 3];
            }

            if (i % (width * 4) === 0) {
                index++;
            }
        }

        return { pixelArray: unit8Arr, width: rotatedImageDimensions.width, height: rotatedImageDimensions.height };
    }

    /**
     * @method rotateImage - Rotates the image
     * This method takes the image and angle by which the image is to be rotated.
     * It then reads the source image
     * and then rotates the image by the given angle
     * and then returns the rotated image
     * @param {HTMLImageElement} imageData - The image to be rotated
     * @param {number} angle - The angle by which the image is to be rotated which is a 
     * number as all number types in Typescript are treated as number
    */
    public rotate = (imageData: ImageData, angle: number): ImageData => {

        if (typeof imageData !== 'object' || !imageData.data || !imageData.width || !imageData.height) {
            throw new Error('Invalid image provided');
        }

        const { data, width, height } = imageData;

        const dataPixelCount = data.length / 4;
        const imagePixelCount = width * height;
        console.log(imagePixelCount, dataPixelCount);

        if (dataPixelCount !== imagePixelCount) {
            throw new Error('Invalid image dimensions provided');
        }

        if (typeof angle !== 'number') {
            throw new Error('Invalid angle provided');
        }

        const parsedAngle = parseFloat(angle.toFixed(2));

        if (Math.abs(parsedAngle) % TWO_PI === 0.00) {
            return imageData;
        }

        // Rotating the source Image here
        const rotatedPixelArray = this.rotatePixelArray(data, width, height, angle);

        return new ImageData(Uint8ClampedArray.from(rotatedPixelArray.pixelArray), rotatedPixelArray.width, rotatedPixelArray.height);
    }
} 
