import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

const maxWidth = 300;
const maxHeight = 300;
const minWidth = 300;
const minHeight = 300;

let imagePicker = document.getElementById("imagePickerUploads");
let uploadInput = document.getElementById("uploadInput");

AddOnSdk.ready.then(() => {
    uploadInput.addEventListener("change", handleFiles);
    
    // This enables dragging images from the uploads container into the document
    AddOnSdk.app.enableDragToDocument(imagePicker, {
        previewCallback: preview => {
            return new URL(preview.src);
        },
        completionCallback: async (preview) => {
            return [{ blob: await getBlob(preview.src) }];
        }
    });
});

function handleFiles(event) {
    const files = event.target.files;

    for (const file of files) {
        if (file.type.startsWith("image/")) {
            const image = document.createElement("img");
            const url = URL.createObjectURL(file);
            image.id = file.name; // Ensure unique IDs for each image
            image.src = url;
            image.style.maxWidth = "100px"; // Optional: Control image display size
            image.style.margin = "10px"; // Optional: Add spacing between images

            image.addEventListener("click", addToDocument);

            imagePicker.appendChild(image);
        } else {
            console.error("File is not an image:", file.name);
        }
    }
}

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

async function resizeImage(image, callback) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let scale = 1;

    if (image.naturalWidth > maxWidth || image.naturalHeight > maxHeight) {
        scale = Math.min(maxWidth / image.naturalWidth, maxHeight / image.naturalHeight);
    } else if (image.naturalHeight < minHeight || image.naturalWidth < minWidth) {
        scale = Math.max(minWidth / image.naturalWidth, minHeight / image.naturalHeight);
    }

    canvas.width = image.naturalWidth * scale;
    canvas.height = image.naturalHeight * scale;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
        if (blob) {
            callback(blob);
        } else {
            console.error("Blob creation failed");
        }
    });
}

async function getBlob(url) {
    return await fetch(url).then(response => response.blob());
}
