class View{
    constructor(){
        this.model = null;
        this.table = document.getElementById('table');
        const btn = document.getElementById('add');
        btn.onclick = () => this.addTodo('New Title', 'New Description');
    }

    setModel(model) {
        this.model = model;
    }

    addTodo(title, description) {
        
    }
}