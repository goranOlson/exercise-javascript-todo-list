const btnNew = document.querySelector('.todo-container .adding button');
btnNew.addEventListener('click', addNewPost);

const todoList = document.querySelector('.todo-container .todo-list');
todoList.addEventListener('click', listClicked);
 console.log(todoList.children);


const flagg_add_last = true;
//===========================
function addNewPost(e) {
    e.preventDefault();
    console.log('--> addNewPost()');

    const todoText = e.target.previousElementSibling.value.trim();
    const id = todoList.children.length + 1;

     console.log(todoText);
     console.log(id);

    if (todoText) {
        newPost = `
<article id="post_${id}" class="post">
    <div class="chore">${todoText}</div>
    <div class="actions">
        <i class='fa fa-arrow-up'></i>
        <i class='fa fa-arrow-down'></i>
        <i class="fas fa-trash-alt"></i>
        <i class="far fa-square"></i>
    </div>
</article>`;

        console.log(newPost);

        const positionText = (flagg_add_last) ? 'beforeend' : 'afterbegin';
        todoList.insertAdjacentHTML(positionText, newPost);
    }
}

function listClicked(e) {
    console.log('--> listClicked()');
    console.log(e.target.parentNode);
}

