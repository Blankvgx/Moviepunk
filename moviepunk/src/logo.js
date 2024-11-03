import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

const imageList = new Map([
    ["logo.png", "./images/logo.png"]
]);

const maxWidth = 300;
const maxHeight = 300;
const minWidth = 300;
const minHeight = 300;

let imagePicker = document.getElementById("logo"); // Targeting the Borders container

// Wait for the SDK to be ready before rendering elements in the DOM.
AddOnSdk.ready.then(async () => {
    imageList.forEach((url, id) => {
        const image = document.createElement("img");
        image.id = id;
        image.src = url;
        
        image.addEventListener("click", addToDocument);

        // Enable drag to document for the image.
        AddOnSdk.app.enableDragToDocument(image, {
            previewCallback: preview => {
                return new URL(preview.src);
            },
            completionCallback: async (preview) => {
                return [{ blob: await getBlob(preview.src) }];
            }
        });
        
        image.draggable = true;
        image.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", image.src);
        });

        imagePicker.appendChild(image); // Append to the Borders container
    });
});

// Adds the resized image to the document.
async function addToDocument(event) {
    const url = event.currentTarget.src;
    const originalImage = new Image();

    originalImage.onload = () => {
        resizeImage(originalImage, (resizedBlob) => {
            AddOnSdk.app.document.addImage(resizedBlob);
        });
    };
    originalImage.src = url;
}

async function resizeImage(image, callback){
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const scaleWidth = image.naturalWidth > maxWidth ? maxWidth / image.naturalWidth
                        : image.naturalWidth < minWidth ? minWidth / image.naturalWidth : 1;
                        
    const scaleHeight = image.naturalHeight > maxWidth ? maxHeight / image.naturalHeight
                        : image.naturalHeight < minWidth ? minHeight / image.naturalHeight : 1;

    const scale = Math.min(scaleWidth, scaleHeight);
    

    canvas.width = image.naturalWidth * scale;
    canvas.height = image.naturalHeight * scale;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
        if(blob) {
            callback(blob);
        }
        else{
            console.error("blob creation failed");
        }
    });

}

/**
 * Get the binary object for the image.
 */
async function getBlob(url) {
    return await fetch(url).then(response => response.blob());
}