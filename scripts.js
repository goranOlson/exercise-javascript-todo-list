const flagg_add_last = true;


//===========================
const btnNew = document.querySelector('.todo-container .adding button');
btnNew.addEventListener('click', addNewPost);

const todoList = document.querySelector('.todo-container .todo-list');
todoList.addEventListener('click', listClicked);
 console.log(todoList.children);



//===========================
function addNewPost(e) {
    e.preventDefault();

    const input = e.target.previousElementSibling;
    const todoText = input.value.trim();
    input.value = '';
    const id = todoList.children.length + 1;

    // console.log(`--> addNewPost('${todoText}') id: ${id}`);

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
</article>`;  // fa-square

        // console.log(newPost);

        const positionText = (flagg_add_last) ? 'beforeend' : 'afterbegin';  // Add first or last
        todoList.insertAdjacentHTML(positionText, newPost);
    }
}

function listClicked(e) {
    //console.log('--> listClicked()');
    
    // get clicked element type (first class)
    const length = e.target.classList.length;
    const targetClass = e.target.classList.item(0);
    // console.log(targetClass);

    const postNode = e.target.parentNode.parentNode;

    // Action
    switch (targetClass) {
        case 'check':
            postNode.classList.toggle('done');
            // console.log(postNode.classList);
            break;
        default:
            break;
    }
}

