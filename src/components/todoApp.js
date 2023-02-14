import {useState} from "react";
import Todo from "./todo";
import "./todoApp.css";

export default function TodoApp (){

    const [title, setTitle] = useState ("");
    const [todos, setTodos] = useState([]);

    
    function handleChange(event) {
        const value = event.target.value;

        setTitle(value)
    }

    function handleSubmit (event) {
        event.preventDefault ();

        const newTodo = {
            id: crypto.randomUUID(),
            title: title,
            completed: false
        };

        //Existen 2 formas de actualiar este estado de todos:

        // 1-
        // const temp = [...todos];
        // temp.unshift(newTodo);

        // setTodos(temp);

        //2-
        setTodos([
            ...todos,
             newTodo
        ])

        setTitle(" ");

    }

    function handleUpdate(id, value) {
        const temp = [...todos];
        const item = temp.find(item => item.id ===id);
        item.title = value;
        setTodos(temp);
    }

    function handleOnDelete(id){
        const temp = todos.filter(item => item.id !== id);

        setTodos(temp);
    }

    return (
        <div className="todoContainer">
            <form className="todoCreateForm" onSubmit={handleSubmit}>
            <input 
            onChange={handleChange} 
            className="todoInput" 
            value={title} 
            />
            <input 
            type="submit" 
            value="Create To Do" 
            className="buttonCreate" 
            onClick={handleSubmit 
            }
            />                      
            </form>

            <div className="todosContainer">
                {
                    todos.map(item => (
                        <Todo 
                        key={item.id} 
                        item={item} 
                        onUpdate={handleUpdate}
                        onDelete={handleOnDelete}
                        />   //siempre que usemos un recorrido agregar un key - para que REACT no confunda recorridos. Le ponemos ID porque siempre sera un valor unico.
                    ))
                }
            </div>
        
        </div>
    )
}

