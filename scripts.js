const flagg_add_last = true;

const btnNew = document.querySelector('.todo-container .adding button');
btnNew.addEventListener('click', addNewPost);

const todoList = document.querySelector('.todo-container .todo-list');
todoList.addEventListener('click', listClicked);

function addNewPost(e) {
    e.preventDefault();

    const input = e.target.previousElementSibling;
    const todoText = input.value.trim();
    input.value = '';
    const id = todoList.children.length + 1;

    if (todoText) {
        newPost = `
        <article id="post_${id}" class="post">
            <div class="chore">${todoText}</div>
            <div class="actions">
                <i class='up fa fa-arrow-up'></i>
                <i class='down fa fa-arrow-down'></i>
                <i class="throw fas fa-trash-alt"></i>
                <i class="check fas fa-check"></i>
            </div>
        </article>`;
        // console.log(newPost);

        const positionText = (flagg_add_last) ? 'beforeend' : 'afterbegin';  // Add first or last
        todoList.insertAdjacentHTML(positionText, newPost);
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
}