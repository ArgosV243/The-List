let itemsContainer = document.getElementById('listItems')
let itemsTemplate = document.getElementById('itemTemplate')
let addButton = document.getElementById('addToList')
//SAVE FUNCTION
let saveButton = document.getElementById('saveItems')
//REMOVE FUNCTION
let removeAllButton = document.getElementById('removeItems');

//////////////////////////////
let items = getItems()

function getItems() {
    let value = localStorage.getItem('toDo') || '[]'

    return JSON.parse(value)
}
getItems()

function setItems(items) {
    let itemsJson = JSON.stringify(items)

    localStorage.setItem('toDo', itemsJson)
}
//ADDS ITEM TO THE TODO CATOGORY
function addItem() {
    items.unshift({
        description: '',
        completed: false
    })

    setItems(items)
    refreshList()
}

//FIXED REMOVE
function removeItems() {
    items = items.filter(item => !item.completed);
    setItems(items);
    refreshList();
  }


function updateItem(item, key, value) {
    item[key] = value;

    setItems(items);
    refreshList();
}

function refreshList() {
//SORT ITEMS from checked to not checked
    items.sort((a, b) => {
        if (a.completed) {
            return 1
        }
        if (b.completed) {
            return -1
        }
        return a.description < b.description ? -1 : 1
    })
//CONTROLS ITEMS in the list ex the input fields 
//BUG TO NOTE does not like singular items unless checked or another item is added
    itemsContainer.innerHTML = '';

    for(let item of items) {
    let itemElement = itemsTemplate.content.cloneNode(true);
    let descriptionInput = itemElement.querySelector('.itemInput')
    let completedInput = itemElement.querySelector('.listItemCompleted')

    descriptionInput.value = item.description;
    completedInput.checked = item.completed;

    descriptionInput.addEventListener('change', () => {
        updateItem(item,'description', descriptionInput.value)
    })

    completedInput.addEventListener('change', () => {
        updateItem(item,'completed', completedInput.checked)
    })



    itemsContainer.append(itemElement);
    }
}

addButton.addEventListener('click', () => {
    addItem();
})

//REMOVE FIX
removeAllButton.addEventListener('click', removeItems);

saveButton.addEventListener('click', () => alert
('To-Do List Saved'))

refreshList()
