import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import styled from '@emotion/styled';
import { AddInput } from './components/AddInput';
import { TodoItem } from './components/TodoItem';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 450,
});

const initialData: Todo[] = [
  {
    id: uuid(),
    label: 'Upgrad MacBook to Sonoma',
    checked: false,
    visible: false,
    created_at: '2023-09-15T09:15:00.100Z',
    completed_at: '',
  },
  {
    id: uuid(),
    label: 'Grocery Shopping',
    checked: false,
    visible: false,
    created_at: '2023-10-13T15:30:00.500Z',
    completed_at: '',
  },
  {
    id: uuid(),
    label: 'Call Pharmacy',
    checked: false,
    visible: false,
    created_at: '2023-10-14T11:05:05.482Z',
    completed_at: '',
  },
  {
    id: uuid(),
    label: 'Schedule Oil Change',
    checked: false,
    visible: false,
    created_at: '2023-10-12T10:10:10.010Z',
    completed_at: '',
  },
  {
    id: uuid(),
    label: 'Front-end Alignment - Jeep',
    checked: false,
    visible: false,
    created_at: '2023-10-12T11:45:00.250Z',
    completed_at: '',
  },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem('todos')) || initialData
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((label: string) => {
    setTodos((prev) => [
      {
        id: uuid(),
        label,
        checked: false,
        visible: false,
        created_at: new Date().toISOString(),
        completed_at: '',
      },
      ...prev,
    ]);
  }, []);

  const handleChange = useCallback(
    (id: string, checked: boolean) => {
      const idx = todos.findIndex((t) => t.id == id);
      const completed_at = checked === true ? new Date().toISOString() : '';

      const newTodos = todos.map((item, i) => {
        if (idx === i) {
          return { ...item, checked, completed_at };
        } else {
          return item;
        }
      });

      setTodos(newTodos);
    },
    [todos]
  );

  const handleDelete = useCallback(
    (id: string) => {
      const newTodos = todos.filter((t) => t.id !== id);

      setTodos(newTodos);
    },
    [todos]
  );

  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {todos
          .filter((t) => t.checked === false)
          .sort((x, y) => {
            return x.created_at === y.created_at
              ? 0
              : x.created_at < y.created_at
              ? 1
              : -1;
          })
          .map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              onChange={handleChange}
              onDelete={handleDelete}
            />
          ))}
        {todos
          .filter((t) => t.checked === true)
          .sort((x, y) => {
            return x.completed_at === y.completed_at
              ? 0
              : x.completed_at > y.completed_at
              ? 1
              : -1;
          })
          .map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              onChange={handleChange}
              onDelete={handleDelete}
            />
          ))}
      </TodoList>
    </Wrapper>
  );
}

export default App;
