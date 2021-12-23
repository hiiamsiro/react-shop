import React , {useState} from 'react';
import PropTypes from 'prop-types';
import TodoList from '../../Components/TodoList';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import queryString from 'query-string'
import { useEffect } from 'react';
import TodoForm from '../../Components/TodoForm';

ListPage.propTypes = {
    
};

function ListPage(props) {
    const initTodoList = [
        {
            id: 1,
            title: 'Eat',
            status: 'new'
        },
        {
            id: 2,
            title: 'Sleep',
            status: 'completed'
        },
        {
            id: 3,
            title: 'Code',
            status: 'new'
        }
    ];

    const location = useLocation();
    const match = useRouteMatch();
    const history = useHistory();
    const [todoList, setTodoList] = useState(initTodoList);
    const [filterList, setFilterList] = useState(() => {
        const params = queryString.parse(location.search);
        return params.status || 'all';
    });
    
    useEffect(() => {
        const params = queryString.parse(location.search);
        setFilterList(params.status || 'all');
    },[location.search])

    const handleClick = (todo,idx) => {
        console.log(todo,idx);
        const newTodoList = [...todoList];

        newTodoList[idx]={
            ...newTodoList[idx],
            status: newTodoList[idx].status === 'new' ? 'completed' : 'new',
        }

        setTodoList(newTodoList);
    }

    const handleFilterAll = () =>{
        // setFilterList('all');
        const filterParams = {
            status: 'all'
        }
        const newParams = queryString.stringify(filterParams);
        history.push({
            pathname: match.path,
            search: newParams,
        })
    }
    const handleFilterNew = () =>{
        // setFilterList('new');
        const filterParams = {
            status: 'new'
        }
        const newParams = queryString.stringify(filterParams);
        history.push({
            pathname: match.path,
            search: newParams,
        })
    }
    const handleFilterCompleted = () =>{
        // setFilterList('completed');
        const filterParams = {
            status: 'completed'
        }
        const newParams = queryString.stringify(filterParams);
        history.push({
            pathname: match.path,
            search: newParams,
        })
    }

    const renderedFilterList = todoList.filter((todo) => filterList === 'all' ||  filterList === todo.status);

    const handleSubmitForm = (value) => {
        const newTodo = {
            id: todoList.length + 1,
            title: value.title,
            status: 'new'
        }
        const newList = [...todoList];
        newList.push(newTodo);
        setTodoList(newList);
    }

    return (
        <div>
            <TodoForm onSubmitForm={handleSubmitForm}/>

            <h3>TODO LIST</h3>
            <TodoList todoList={renderedFilterList} onTodoClick={handleClick} />     

            <button onClick={handleFilterAll}>Filter All</button>
            <button onClick={handleFilterNew}>Filter New</button>
            <button onClick={handleFilterCompleted}>Filter Completed</button>
            {/* todoList là props của Component TodoList(component con), {todoList} là dữ 
            liệu được truyền vào */}


        </div>
    );
}

export default ListPage;