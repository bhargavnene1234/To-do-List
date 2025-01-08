import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/todos/');
        setTodos(response.data);
    };

    const addTodo = async () => {
        if (task.trim()) {
            const response = await axios.post('http://127.0.0.1:8000/api/todos/', { task });
            setTodos([...todos, response.data]);
            setTask('');
        }
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`);
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter a task"
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.task}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
