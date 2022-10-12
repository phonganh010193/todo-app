import React from "react";
import { toast } from "react-toastify";

class CreateToDo extends React.Component{
    state = {
        title:''
    }

    handleOnchangeTitle = (event) => {
        this.setState({
            title:event.target.value
        });
    }
    handleOnclickAdd = (event) => {
        event.preventDefault();
        if(!this.state.title) {
            toast.error('Missing title..!')
            return;
        }
        const todo = {
            id:Math.floor(Math.random() * 1000),
            title:this.state.title
        }
        this.props.addTodoList(todo);
        this.setState({
            title:''
        });
        toast.success('wow add easy!')
    }
    render() {
        const { title } = this.state;
        return (
            <div className="todo-add">
                <input 
                    type="text" 
                    placeholder="UserName..."
                    value={title}
                    onChange={(event) => this.handleOnchangeTitle(event)}
                />
                <button
                    className="btn btn-add"
                    onClick={(event) => this.handleOnclickAdd(event)}
                >Add</button>
            </div>
        );
    }
}

export default CreateToDo;
