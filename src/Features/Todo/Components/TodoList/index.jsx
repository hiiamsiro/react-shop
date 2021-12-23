import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import classNames from 'classnames';

TodoList.propTypes = {
    todoList: PropTypes.array,
};
TodoList.defaultProps={
    todoList: []
}

function TodoList(props) {
    const {todoList, onTodoClick} = props;
    const handleClick = function(todo,idx){
        if(!onTodoClick) return;
        
        onTodoClick(todo,idx); //gọi hàm handleClick bên kia
    }

    return (
        <ul>
            {
                todoList.map( (todo,idx) => (
                    <li key={todo.id}
                    className={classNames({
                        'todo-item': true,
                        completed: todo.status === 'completed'
                    })}
                    onClick={() => handleClick(todo, idx)}
                    >{todo.title}</li>
                ))
            }
        </ul>
    );
}

export default TodoList;