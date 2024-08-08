import { useState } from 'react';

export default function Form({ onAdd }) {
  const [newTodo, setNewTodo] = useState('');

  const handleChange = ({ target }) => {
    setNewTodo(target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault()
    if(newTodo.trim().length) {
      onAdd(newTodo)
      setNewTodo('')
    }
  };

  return (
    <form>
      <input
        value={newTodo}
        onChange={handleChange}
        type='text'
        className='todo-input'
        placeholder='Add your items'
      />
      <button type='submit' onClick={handleAdd}>
        <img src='./images/plus-icon.png' alt='add-todo' />
      </button>
    </form>
  );
}
