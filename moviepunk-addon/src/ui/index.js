import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Map of image files for the gallery
const IMAGES = new Map([
    ["hat.png", "./images/hat.png"]
]);

// Wait for the SDK to be ready
addOnUISdk.ready.then(async () => {
    console.log("addOnUISdk is ready for use.");
    
    // Get the UI runtime and the document sandbox proxy
    const { runtime } = addOnUISdk.instance;
    const sandboxProxy = await runtime.apiProxy("documentSandbox");

    // Set up buttons for creating rectangle and image in the document
    const createRectangleButton = document.getElementById("createRectangle");
    const createImageButton = document.getElementById("createImage");

    // Enable the buttons when SDK is ready
    createRectangleButton.disabled = false;
    createImageButton.disabled = false;

    // Event listener for creating a rectangle in the document
    createRectangleButton.addEventListener("click", async () => {
        await sandboxProxy.createRectangle();
    });

    // Event listener for creating an image in the document
    createImageButton.addEventListener("click", async () => {
        await sandboxProxy.createHatImage();
    });

    // Initialize the gallery of images with drag-to-document functionality
    const gallery = document.createElement("div");
    gallery.className = "gallery";

    IMAGES.forEach((url, id) => {
        const image = document.createElement("img");
        image.id = id;
        image.src = url;
        image.addEventListener("click", addToDocument);

        // Enable drag-and-drop for the image
        addOnUISdk.app.enableDragToDocument(image, {
            previewCallback: element => new URL(element.src),
            completionCallback: async (element) => {
                return [{ blob: await getBlob(element.src) }];
            }
        });

        gallery.appendChild(image);
    });

    document.body.appendChild(gallery);

    addOnUISdk.app.on("dragstart", startDrag);
    addOnUISdk.app.on("dragend", endDrag);
});

async function addToDocument(event) {
    const url = event.currentTarget.src;
    const blob = await getBlob(url);
    addOnUISdk.app.document.addImage(blob);
}

function startDrag(eventData) {
    console.log("The drag event has started for", eventData.element.id);
}

function endDrag(eventData) {
    if (!eventData.dropCancelled) {
        console.log("The drag event has ended for", eventData.element.id);
    } else {
        console.log("The drag event was cancelled for", eventData.element.id);
    }
}

async function getBlob(url) {
    return await fetch(url).then(response => response.blob());
}
