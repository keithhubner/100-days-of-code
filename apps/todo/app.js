const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');

//const form = document.querySelector('form');
// create elements and render todo
function renderTask(doc) {
    let li = document.createElement('li');
    let name =document.createElement('span');
    

    li.setAttribute('data-id', doc.id);

    name.textContent = doc.data().name;


    li.appendChild(name);

    list.appendChild(li);

}

const search = document.querySelector('.search input');

const generateTemplate = (todo, id) => {

    const html = `
    <li data-id="${id}" class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo.name}</span>
        <i class="far fa-trash-alt delete"></i>
      </li>
    `;    

    list.innerHTML += html;


}


db.collection('habbits').get().then((snapshot) => {
//    console.log(snapshot.docs);
snapshot.docs.forEach(doc => {
//console.log(doc.data);

//renderTask(doc);
generateTemplate(doc.data(), doc.id);
})

})





addForm.addEventListener('submit', e => {

    e.preventDefault();

    const todo = addForm.add.value.trim().toLowerCase();

    const now = new Date();


    if(todo.length){

        //generateTemplate(todo);

        const newtodo = {
            name: todo,
            created_at: firebase.firestore.Timestamp.fromDate(now),


        };

        db.collection('habbits').add(newtodo).then(() => {
        console.log('todo added');
        }).catch(err => {
            console.log(err);
        });

        addForm.reset();
    }

    
});

//delete todos

list.addEventListener('click', e => {

    if (e.target.classList.contains('delete')){
        const id = e.target.parentElement.getAttribute('data-id');
//console.log(id);

db.collection('habbits').doc(id).delete().then(() => {

    console.log('recipe deleted');
});

    }
    });


        //e.target.parentElement.remove();


const filterTodos = (term) => {

    Array.from(list.children)
        .filter((todo) =>  !todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.add('filtered'));

        Array.from(list.children)
        .filter((todo) =>  todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove('filtered'));        

};

// keyup event

search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
filterTodos(term);

});
