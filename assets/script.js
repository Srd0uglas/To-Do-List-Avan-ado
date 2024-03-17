// Seleção de Elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;
// Funções
 
// função para salvar a tarefa  >>>
const saveTodo = (text) => {
    // Criando as tags e colocando as classes nelas >>>
    const todo = document.createElement("div"); // criei uma variável e dentro dela coloquei o elemento div dentro
    // Colocar uma classe nessa div
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text; // texto que eu recebo da função
    todo.appendChild(todoTitle);

    // Botões
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    // colocar o texto com os botões no todo ao add uma tarefa nova >>>
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML =  '<i class="fa-solid fa-pen"></i>';
    // colocar o texto com os botões no todo ao add uma tarefa nova >>>
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML =  '<i class="fa-solid fa-xmark"></i>';
    // colocar o texto com os botões no todo ao add uma tarefa nova >>>
    todo.appendChild(deleteBtn);


    todoList.appendChild(todo);

    // Limpar o valor qunado o usuário parar de digitar (Limpa a caixa de texto) >>
    todoInput.value ="";
    // Focar na caixa de testo quando o usuário clicar no botão de "+"
    todo.focus();
};
// mostar o formulário de edição quando o botão for clicado.
const toggleForms =  () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if(todoTitle.innerText === oldInputValue){
        todoTitle.innerText = text;
    }
    });
};

// Criar um evento para o formulario 
todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); // não permitir que o formulário não seja enviado quando pressionado o botão
    // console.log("Enviou")

    // pegar o valor do input (informação que o usuário digitou) para criar tarefa nova >>>

    // 1º selecionei o input e peguei o tetxo dentro dele
    const inputValue = todoInput.value;
    // 2º Verificação para checar se o usuário criou tarefa sem
    if(inputValue){
        // função para salvar a tarefa  >>>
        saveTodo(inputValue);
    }
});

// Eventos

// identificar os clicks nos botões das tarefas
document.addEventListener("click" , (e) => {
    // dentro desse eveto eu consigo identificar qual o elemento que foi clicado.
    const targetEl = e.target; // pegar o elemento que foi clicado 
    const parentEl = targetEl.closest("div");  // selecionei a div mais próx do elelemento que tem a class finish-todo
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    // BOTÃO DE ADD >>>
    if(targetEl.classList.contains("finish-todo")){ // checar se o targtEl tem uma classe chamada finish-todo
        // console.log("clicou");
        parentEl.classList.toggle("done"); // adicionando a class done para os botões que eu clico
    }
    // BOTÃO DE EXCLUIR >>>
    if(targetEl.classList.contains("remove-todo")){ 
        parentEl.remove(); // excluir tarefa
    }
    // BOTÃO DE EDITAR >>> 
    if(targetEl.classList.contains("edit-todo")){ 
      toggleForms(); // editar tarefa

      editInput.value = todoTitle;
      oldInputValue = todoTitle;
    }

});

// cancelar ação quando for editar uma tarefa 
cancelEditBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    toggleForms();
});

editForm.addEventListener("submit" , (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){
        updateTodo(editInputValue);
    }

    toggleForms();
});