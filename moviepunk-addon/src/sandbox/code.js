import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor } from "express-document-sdk";

// Get the document sandbox runtime.
const { runtime } = addOnSandboxSdk.instance;

function start() {
    const sandboxApi = {
        createRectangle: () => {
            const rectangle = editor.createRectangle();
            rectangle.width = 240;
            rectangle.height = 180;
            rectangle.translation = { x: 10, y: 10 };
            const color = { red: 0.32, green: 0.34, blue: 0.89, alpha: 1 };
            const rectangleFill = editor.makeColorFill(color);
            rectangle.fill = rectangleFill;
            const insertionParent = editor.context.insertionParent;
            insertionParent.children.append(rectangle);
        },
        createHatImage: async () => {
            const imagePath = "https://img1.picmix.com/output/stamp/normal/0/4/3/8/1598340_d2334.png";  // Use a fully-qualified URL
        
            try {
                console.log("Attempting to create image element...");
                
                // Create an image element directly using Adobe's editor API
                const imageElement = editor.createImage();
                console.log("Image element created:", imageElement);
        
                // Set the image source, width, height, and position
                imageElement.source = imagePath;
                imageElement.width = 240;
                imageElement.height = 180;
                imageElement.translation = { x: 10, y: 10 };
                console.log("Image properties set.");
        
                // Append the image element to the document
                const insertionParent = editor.context.insertionParent;
                insertionParent.children.append(imageElement);
                console.log("Image added successfully from:", imagePath);
        
            } catch (error) {
                console.error('Error adding image:', error);
            }
        }
               
    };

    runtime.exposeApi(sandboxApi);
}

start();
