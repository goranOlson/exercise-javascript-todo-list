const flagg_add_last = true;
const TODO = 'todo-list';

const btnNew = document.querySelector('.todo-container .adding button');
btnNew.addEventListener('click', addNewPost);

const todoList = document.querySelector('.todo-container .todo-list');
todoList.addEventListener('click', listClicked);


// Init system by importing todos from localStorage
getStoredItems();


function addNewPost(e) {
    e.preventDefault();

    const input = e.target.previousElementSibling;
    const todoText = input.value.trim();
    input.value = '';
    const id = todoList.children.length + 1;

    addTodo( [todoText] );  

    updateStoredItems();  // Add to localStorage

}

function getStoredItems() {
    const importedList = JSON.parse( localStorage.getItem(TODO) );
    //  console.log('importedList', importedList);

    if (importedList) {
        // 0 :['Henrik', 'done'], 1 :['Hanna']
        for (const todoPost of importedList) {
            // console.log(iterator);
            addTodo(todoPost);
        }
    }
}

function updateStoredItems() {  // Store all post in localStorage
    let postList = [];

    for (let i = 0; i < todoList.children.length; i++) {
        const element = todoList.children[i];

        if (todoList.children[i].classList.contains('done')) {
            postList.push( [element.children[0].innerText, 'done']);
        }
        else {
            postList.push( [element.children[0].innerText]);
        }
    }

    if (postList) {
        localStorage.setItem(TODO, JSON.stringify(postList));
    }
}

function addTodo(array) {
    if (array) {
        const txt = array[0];
        const done = (array.includes('done')) ? 'done' : '';

        const positionText = (flagg_add_last) ? 'beforeend' : 'afterbegin';  // Add first or last


        //  id="post_${(todoList.children.length + 1)}" - NOT IN USE

        newPost = `
        <article class="post ${done}">
            <div class="chore">${txt}</div>
            <div class="actions">
                <i class='up fa fa-arrow-up'></i>
                <i class='down fa fa-arrow-down'></i>
                <i class="throw fas fa-trash-alt"></i>
                <i class="check fas fa-check"></i>
            </div>
        </article>`;
        // console.log(newPost);

        
        todoList.insertAdjacentHTML(positionText, newPost);

        // to localStorage
    }

}

function listClicked(e) {
    const length = e.target.classList.length;
    const targetClass = e.target.classList.item(0);
    const actPost = e.target.parentNode.parentNode;

    switch (targetClass) {
        case 'check':
            actPost.classList.toggle('done');
            break;
        case 'throw':
            actPost.remove();
            break;
        case 'up':
            if (actPost.previousElementSibling) {
                const listNode = actPost.parentNode;
                const previousNode = actPost.previousElementSibling;
                const theNode = listNode.removeChild(actPost);
                listNode.insertBefore(theNode, previousNode);
            }
            break;
        case 'down':            
            if (actPost.nextElementSibling) {
                const listNode = actPost.parentNode;
                const nextNextNode = (actPost.nextElementSibling.nextElementSibling) ? actPost.nextElementSibling.nextElementSibling : null;
                const theNode = listNode.removeChild(actPost);
                listNode.insertBefore(theNode, nextNextNode);
            }
            break;
    }
    
    updateStoredItems(); // Update localStorage
}