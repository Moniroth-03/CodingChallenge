import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');


  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('/api/todo');
      const data = await response.json();
      setTodos(data);
    };

    fetchTodos();
  }, []);



  const handleAddTodo = (e) => {
  if (e.key === 'Enter' && input.trim() !== '') {
    if (!todos.some(todo => todo.todo === input.trim())) {
      setTodos([...todos, { id: uuidv4(), todo: input.trim(), isCompleted: false, createdAt: new Date() }]);
      setInput('');
    } else {
      alert('Duplicate todo item!');
    }
  }
};


const handleRemoveTodo = (id) => {
  setTodos(todos.filter(todo => todo.id !== id));
};

const [editId, setEditId] = useState(null);

const handleEditTodo = (id, newTodo) => {
  setTodos(todos.map(todo => todo.id === id ? { ...todo, todo: newTodo } : todo));
  setEditId(null);
  setInput('');
};

const handleStartEdit = (id, currentTodo) => {
  setEditId(id);
  setInput(currentTodo);
};

const handleKeyDown = (e) => {
  if (editId) {
    if (e.key === 'Enter' && input.trim() !== '') {
      handleEditTodo(editId, input.trim());
    }
  } else {
    handleAddTodo(e);
  }
};

const [filter, setFilter] = useState('');

const filteredTodos = todos.filter(todo => todo.todo.toLowerCase().includes(filter.toLowerCase()));

const handleToggleComplete = (id) => {
  setTodos(todos.map(todo => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo));
};

return (
  <div>
    <input 
      type="text" 
      value={input} 
      onChange={(e) => setInput(e.target.value)} 
      onKeyDown={handleKeyDown} 
      placeholder="Add or edit todo"
    />
    <input 
      type="text" 
      value={filter} 
      onChange={(e) => setFilter(e.target.value)} 
      placeholder="Filter todos"
    />
    <ul>
      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
            {todo.todo}
            <button onClick={() => handleStartEdit(todo.id, todo.todo)}>Edit</button>
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
            <button onClick={() => handleToggleComplete(todo.id)}>
              {todo.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
          </li>
        ))
      ) : (
        <li>No result. Create a new one instead!</li>
      )}
    </ul>
  </div>
);
};
export default TodoList;
