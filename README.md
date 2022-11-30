--- 
Title: Accenture Task
Author: Arnab Tarwani
Date: 30-11-2022
---

## Accenture Task

### How to run the app 

1. Clone the repository
2. Run `yarn install` to install all the dependencies
3. Run `yarn dev` to start the app

### How to run the production build that also runs on node
1. Run `yarn build`
2. Run `yarn start`

### Description

@method rotationPointInRadians - rotates a point around a center point by a given angle in radians
- This method calculates the rotation point in radians by calculating the center of the image and the angle and then rotating it on the given angle and then returning the new point from the center of the image

@method calculateImageDimensions - Calculates the dimensions of the image after rotation
- This method calculates the new image dimensions by calculating the new width and height of the image and then returning the new width and height 

@method rotatePixelArray - Rotates the pixel array
- This method takes the imageData properties - width, height, data and angle by which the image is to be rotated. It then reads the source image, maps the pixels to the new location 4 blocks at a time, and writes the result to the destination image. Simultaniously it calculates the new image dimensions based on the provided angle and instantiates a new array that holds the new image data. Finally, it returns the new image data and the new image dimensions

@method rotateImage - Rotates the image
- This method takes the image and angle by which the image is to be rotated. It then reads the source image and then rotates the image by the given angle and then returns the rotated image 
- **@param {number} angle** - The angle by which the image is to be rotated has a datatype number as all numbers in Typescript are treated as number 

### Inspiration for this project
- https://stackoverflow.com/a/15348177
- https://levelup.gitconnected.com/javascript-problem-solvers-rotate-image-matrix-c02323c1c2fb
- https://stackoverflow.com/a/65844039

### Tech stack
- React
- Typescript
- Vite (for bundling)
- TailwindCSS (for styling)