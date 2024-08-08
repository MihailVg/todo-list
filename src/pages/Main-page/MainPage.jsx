import Header from '../../components/Header/Header';
import TodoItem from '../../components/Todo-item/TodoItem';
import { useFetchTodoList } from '../../hooks/useFetchTodoList/useFetchTodoList';
import { useCallback, useEffect, useState } from 'react';
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

  const onComplete = useCallback((id) => {
    const updatedTodoList = todoList.map(todo =>
      todo.id === id ? { ...todo, completed: true } : todo
    );
    setTodoList(updatedTodoList);
  }, [todoList])

  const onDelete = useCallback((id) => {
    const updatedTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(updatedTodoList);
  }, [todoList])

  const onRedo = useCallback((id) => {
    const updatedTodoList = todoList.map(todo =>
      todo.id === id ? { ...todo, completed: false } : todo
    );
    setTodoList(updatedTodoList);
  }, [todoList])

  const onAdd = useCallback((title) => {
    const newTodo = {
      userId: 1,
      id: count,
      title: title,
      completed: false,
    }
    setCount((prev) => prev + 1)
    setTodoList([newTodo, ...todoList])
  }, [todoList, count])

  if (!todoList) {
    return null;
  }

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
