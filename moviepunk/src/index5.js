import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

let todoList;
let todoItemInput;
let clearAllButton;
let store;

AddOnSdk.ready.then(async () => {
    try {
        store = await AddOnSdk.instance.clientStorage;

        const todoContainer = document.createElement("div");
        todoContainer.style.margin = "20px";

        todoItemInput = document.createElement("input");
        todoItemInput.setAttribute("type", "text");
        todoItemInput.maxLength = 50;
        todoItemInput.placeholder = "ToDo Item";
        todoItemInput.addEventListener("keypress", handleAdd);

        todoList = document.createElement("ul");

        clearAllButton = document.createElement("button");
        clearAllButton.innerHTML = "Clear All";
        clearAllButton.addEventListener("click", clearAllItems);

        todoContainer.appendChild(todoItemInput);
        todoContainer.appendChild(clearAllButton);
        todoContainer.appendChild(todoList);

        document.body.appendChild(todoContainer);

        await displayAllItems();
    } catch (error) {
        console.error("Error initializing ToDo list:", error);
    }
});

async function handleAdd(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const item = todoItemInput.value.trim();
        if (item) {
            await setItem(item, false);
            addItemToList(item, false);
        }
    }
}

async function setItem(item, isComplete) {
    try {
        await store.setItem(item, isComplete);
        todoItemInput.value = "";
    } catch (error) {
        console.error("Error setting item:", error);
    }
}

async function handleChange(event) {
    const todoItem = event.target;
    const isComplete = todoItem.checked;
    try {
        await store.setItem(todoItem.name, isComplete);
    } catch (error) {
        console.error("Error updating item status:", error);
    }
}

function addItemToList(item, isComplete) {
    const todoCheckbox = document.createElement("input");
    todoCheckbox.setAttribute("type", "checkbox");
    todoCheckbox.name = item;
    todoCheckbox.checked = isComplete;
    todoCheckbox.addEventListener("change", handleChange);

    const todoItem = document.createElement("li");
    todoItem.append(todoCheckbox);
    todoItem.append(item);
    
    todoItem.style.backgroundColor = "#ffcc00";
    todoItem.style.color = "#002d3a";
    todoItem.style.padding = "10px";
    todoItem.style.margin = "5px 0";
    todoItem.style.borderRadius = "8px";
    todoItem.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";

    todoList.appendChild(todoItem);
}


async function displayAllItems() {
    try {
        const todoItems = await store.keys();
        for (const item of todoItems) {
            const isComplete = await store.getItem(item);
            addItemToList(item, isComplete);
        }
    } catch (error) {
        console.error("Error displaying items:", error);
    }
}

async function clearAllItems() {
    try {
        const todoItems = await store.keys();
        for (const item of todoItems) {
            await store.removeItem(item);
        }
        todoList.innerHTML = "";
    } catch (error) {
        console.error("Error clearing items:", error);
    }
}
