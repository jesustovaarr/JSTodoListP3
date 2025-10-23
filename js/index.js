import Model from './model.js';
import View from './view.js';
document.addEventListener('DOMContentLoaded', () => {
    const model = new Model();
    const view = new View();
    model.setView(view);
    view.setModel(model);
})

function test(num , fn){
    return f(num)
}

function dup(num, fn) {
    return fn(num * 2);
}
