import { useEffect, useState } from 'react';

async function fetchTodos() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/');

    if (res.status !== 200) {
      throw new Error('Error Fetch')
    }

    return res.json();
  } catch (error) {
    console.error(error.message);
  }
}

export function useFetchTodoList() {
  const [todoList, setTodoList] = useState(null);

  useEffect(() => {
    const data =  fetchTodos();

    data.then((res) => setTodoList(res));
  }, []);

  return todoList;
}