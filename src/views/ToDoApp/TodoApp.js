import React from "react";
import { toast } from "react-toastify";
import CreateToDo from "./CreacteToDo";
import './ToDoApp.css';

class TodoApp extends React.Component{
    state = {
        TodoList: [
            {id:'todo1', title:'Pham Van Phong'},
            {id:'todo2', title:'Pham Van Phu'},
            {id:'todo3', title:'Pham Thi Phu'},
        ],
        editTodo: {}
    }

    addTodoList = (todo) => {
        console.log('>>>check add todo', todo);
        this.setState({
            TodoList: [
                ...this.state.TodoList,
                todo
            ]
        });
    }

    handleOnclickDelete = (todo) => {
        console.log('>>>check delete todo', todo);
        const copyTodoList = [...this.state.TodoList];
        const newTodoList = copyTodoList.filter(item => item.id !== todo.id);
        this.setState({
            TodoList:newTodoList
        });
        toast.success('wow edit easy!');
    }
    handleOnclickEdit = (todo) => {
        const { editTodo } = this.state;
        const isEmptry = Object.keys(editTodo).length === 0;
        if(isEmptry === false && editTodo.id === todo.id) {
            const copyTodoList = [...this.state.TodoList];
            const IndexEdit = copyTodoList.findIndex(item => item.id === todo.id);
            copyTodoList[IndexEdit].title = editTodo.title;
            this.setState({
                TodoList: copyTodoList,
                editTodo:{}
            })
            toast.success('wow save easy!');
            return;
        }
        console.log('>>>check edit todo', todo);
        this.setState({
            editTodo:todo
        })
    }
    handleOnchangeEdit = (event) => {
        const newEditTodo = {
            ...this.state.editTodo,
            title:event.target.value
        }
        this.setState({
            editTodo:newEditTodo
        })
    }
    render() {
        const {TodoList, editTodo } = this.state;
        const isEmptry = Object.keys(editTodo).length === 0;
        console.log('isEmtry', isEmptry);
        console.log('edittodo', editTodo);
        
        return (
            <div className="todo-container">
                <CreateToDo addTodoList = {this.addTodoList}/>
                <div className="todo-content">
                    {TodoList.map((item, index) => {
                        return (
                            <div className="todo-children children-first" key={item.id}>
                                {isEmptry === true?
                                    <span className="text-children">{index + 1} - {item.title}</span>
                                :
                                <div>
                                    {isEmptry === false && item.id === editTodo.id ?
                                        <span>{index + 1} - <input type="text" value={editTodo.title}
                                            onChange={(event) => this.handleOnchangeEdit(event)} />
                                        </span>
                                    :
                                        <div>
                                            <span className="text-children">{index + 1} - {item.title}</span>
                                        </div>
                                    }
                                </div>

                            
                            }
                                <div className="btn btn-all">
                                    <button 
                                        className="btn btn-edit"
                                        onClick={() => this.handleOnclickEdit(item)}
                                    >{isEmptry === false && item.id === editTodo.id ? "Save" : "Edit"}</button>
                                    <button 
                                        className="btn btn-delete"
                                        onClick={() => this.handleOnclickDelete(item)}
                                    >Delete</button>


                                    
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default TodoApp;
