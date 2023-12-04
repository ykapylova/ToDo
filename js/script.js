const todo_control = document.querySelector('.todo-control'), 
header_input = document.querySelector('.header-input'),
todo_list = document.querySelector(".todo-list"),
todo_completed = document.querySelector(".todo-completed"),
addButton = document.querySelector(".header-button");

// The global array to store all items 
let todo_data = [];

/**
 *  The program's engine: function performs the following operations:
 *      1. Clears both lists 
 *      2. creates new li item
 *      3. Add event listener for Complete button
 *      4. Add event listener for Delete button 
 */
function add_to_do() {
    
    // Clear both lists 
    todo_list.textContent = "";
    todo_completed.textContent = "";
    
    todo_data.forEach( function(item, i, arr) {
        
        // // debugging. delete me.
        // console.log("ITEM.name = " + item.name);
        // console.log("Index = " + i);
        // console.log("Arr = " + arr);
        
        // Create new li item 
        let new_li =  createNewElement( item.name);
    
        // If item is not completed add it to "todo" list, otherwise add it to "todo_completed" list 
        ( !item.isCompleted ) ? todo_list.append( new_li ) : todo_completed.append( new_li );    

        // get todo-complete button  (green checkmark)
        const btn_todo_complete = new_li.querySelector('.todo-complete');
        // add even listener 
        btn_todo_complete.addEventListener('click', function(){
            
            // check the status of the task from incompled to completed
            if ( !item.isCompleted) {
                // mark task as completed
                item.isCompleted = true;
            } else {
                item.isCompleted = false;
            }
            // call function again 
            add_to_do();
        })

        // get todo-remove button (garbage bin)
        const btn_todo_remove =  new_li.querySelector('.todo-remove');
        // add event listener
        btn_todo_remove.addEventListener('click', function(){
            // display warning message            
            let text = `Вы уверены что хотите удалить эту ${(item.isCompleted) ? "выполненную" : ""} задачу ?`;
            if (confirm(text) == true ) {
                // remove item from the array of items
                console.log(i)
                todo_data.splice(i, 1);
                // remove deleted item from the screen 
                new_li.remove();

                console.log(todo_data)
            }
        })        
    })
};

/**
 *  Create "li" for a new task, add classname and the same 
 *  DOM structure as all other tasks 
 * 
 * @param {*} itemName - the name of the new task
 * @returns 
 */
function createNewElement( itemName ) {

    let new_li = document.createElement('li');
    new_li.className = "todo-item";
    new_li.innerHTML = `<span class='text-todo'>${itemName}</span>
    <div class ="todo-buttons">
        <button class = "todo-remove"></button>
        <button class = "todo-complete"></button>
    </div>`;
    
    return new_li;
}

/**
 *  Event Listener for plus button 
 */
addButton.addEventListener('click', function(event) {
    
    event.preventDefault();
    
    // Create tmp object which by default always not completed (isCompleted = false )
    let tmpItem = {
        name:  header_input.value,
        isCompleted: false,
    };
    // Push new object to the array of items 
    todo_data.push(tmpItem);
    
    // Call add_to_do() function  
    add_to_do();

    // Clear text field 
    header_input.value = "";
})
