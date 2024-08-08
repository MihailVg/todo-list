import Header from '../../components/Header/Header';
import TodoItem from '../../components/Todo-item/TodoItem';
import { useFetchTodoList } from '../../hooks/useFetchTodoList/useFetchTodoList';
import { useEffect, useState } from 'react';
import Form from '../../components/Form/Form';

export default function MainPage() {
  const data = useFetchTodoList();
  const [todoList, setTodoList] = useState(null);
  const [count, setCount] = useState(201)

  useEffect(() => {
    if (!data) {
      return;
    }

    const filteredTodoList = data.filter(todo => todo.userId === 1);

    setTodoList(filteredTodoList);
  }, [data]);

  if (!todoList) {
    return null;
  }

  const onAdd = (title) => {
    const newTodo = {
      userId: 1,
      id: count,
      title: title,
      completed: false,
    }
    setCount(count + 1)
    setTodoList([...todoList, newTodo])
  }

  const onComplete = id => {
    const updatedTodoList = todoList.map(todo =>
      todo.id === id ? { ...todo, completed: true } : todo
    );
    setTodoList(updatedTodoList);
  };

  const onRedo = id => {
    const updatedTodoList = todoList.map(todo =>
      todo.id === id ? { ...todo, completed: false } : todo
    );
    setTodoList(updatedTodoList);
  };

  const onDelete = id => {
    const updatedTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  return (
    <div className='container'>
      <Header />
      <div className='form__wrapper'>
        <Form onAdd={onAdd} />
      </div>
      <ul className='todo__list'>
        {todoList.map(
          todo =>
            !todo.completed && (
              <li className='todo__item' key={todo.id}>
                <TodoItem
                  todo={todo}
                  onComplete={onComplete}
                  onDelete={onDelete}
                />
              </li>
            )
        )}
      </ul>
      {todoList.length ? <h3>Completed</h3> : <h3>You haven not any tasks</h3>}
      <ul className='todo__list'>
        {todoList.map(
          todo =>
            todo.completed && (
              <li className='todo__item' key={todo.id}>
                <TodoItem todo={todo} onDelete={onDelete} onRedo={onRedo} />
              </li>
            )
        )}
      </ul>
    </div>
  );
}
