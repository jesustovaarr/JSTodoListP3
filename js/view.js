import addTodo from './components/add-todo.js';

class View{
    constructor(){
        this.model = null;
        this.table = document.getElementById('table');
        this.addTodoForm = new addTodo();
        this.addTodoForm.onClick(this.addTodo.bind(this));
    
        this.addTodoForm.onClick(title, description => this.addTodo(title, description));
        
    }

    setModel(model) {
        this.model = model;
    }

    addTodo(title, description) {
        const todo =this.model.addTodo(title, description);
        this.createRow(todo);
    }

    toggleCompleted(id){
        this.model.toggleCompleted(id);
    }

    removeTodo(id) {
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    createRow(todo){
        row.setAttribute('id', id++);
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.value}</td>
            <td class="text-center">
            </td>
            <td class="text-right">
                <button class="btn btn-primary mb-1">
                    <i class="fa fa-pencil"></i>
                </button>
            </td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkbox);


        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1'); 
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(row.getAttribute(todo.id));
        row.children[3].appendChild(removeBtn);
        }
}