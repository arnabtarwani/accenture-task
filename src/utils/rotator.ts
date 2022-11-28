import { PI_OVER_TWO, TWO_PI } from "./constants";

export default class Rotator {

    private rotationPoint = (pointX: number, pointY: number, centerX: number, centerY: number, sinAngle: number, cosAngle: number) => {
        const x = pointX - centerX;
        const y = pointY - centerY;
        return {
            x: Math.round((x * cosAngle) - (y * sinAngle) + centerX),
            y: Math.round((x * sinAngle) + (y * cosAngle) + centerY),
        };
    }

    private calculateImageDimensions = (width: number, height: number, angle: number) => {
        const sinAngle = Math.sin(angle);
        const sinValForSupposedWidth = Math.sin(PI_OVER_TWO - angle);

        const newWidth = Math.round(width * Math.abs(sinValForSupposedWidth) + height * Math.abs(sinAngle));
        const newHeight = Math.round(height * Math.abs(sinValForSupposedWidth) + width * Math.abs(sinAngle));

        return { width: newWidth, height: newHeight };
    }

    private rotatePixelArray(pixelArray: ImageData['data'], width: ImageData['width'], height: ImageData['height'], angle: number) {


        return { pixelArray, width, height };
    }

    // In typescript, you double is defined as number 
    public rotate = (imageData: ImageData, angle: number): ImageData => {

        if (typeof imageData !== 'object' || !imageData.data || !imageData.width || !imageData.height) {
            throw new Error('Invalid image provided');
        }

        const { data, width, height } = imageData;

        const pixelCount = data.length / 4;
        const imagePixelCount = width * height;

        if (pixelCount !== imagePixelCount) {
            throw new Error('Invalid image dimensions provided');
        }

        if (typeof angle !== 'number') {
            throw new Error('Invalid angle provided');
        }

        const angleRouned = parseFloat(angle.toFixed(2));

        if (Math.abs(angleRouned) % TWO_PI === 0.00) {
            return imageData;
        }

        // Rotate the pixel array
        const rotatedPixelArray = this.rotatePixelArray(data, width, height, angle);


        return new ImageData(Uint8ClampedArray.from(rotatedPixelArray.pixelArray), rotatedPixelArray.width, rotatedPixelArray.height);
    }
} 