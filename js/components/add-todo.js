class addTodo{
    constructor(){
        this.btn = document.getElementById('add');
        const title = document.getElementById('title');
        const description = document.getElementById('description');
    }

    onClick(callback){
        this.btn.onclick = () => {
            if (title.value === '' || description.value === '') {
                //alert.innerText = 'Title and description are required';
            }else {
                callback(this.title.value, this.description.value);
            }
        }
    }
}