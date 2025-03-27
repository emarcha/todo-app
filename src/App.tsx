import styled from 'styled-components';
import { useEffect, useState } from 'react';

import NewTodoForm from './components/NewTodoForm.tsx';
import Item from './components/Item.tsx';

type Todo = {
  text: string;
  completed: boolean;
};

const StyledContainer = styled.div`
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  margin: 0 auto;
  max-width: 400px;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
`;

const App = () => {
  const [todos, setTodos] = useState(new Map<string, Todo>());

  useEffect(() => {
    const tempMap = new Map<string, Todo>();
    tempMap.set(self.crypto.randomUUID(), {
      text: 'Some New Task',
      completed: false,
    });
    setTodos(tempMap);
  }, []);

  const handleOnChange = (key: string, todo: Todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    const updatedTodos = new Map(todos);
    updatedTodos.set(key, updatedTodo);
    setTodos(updatedTodos);
  };

  const handleDelete = (key: string) => {
    const updatedTodos = new Map(todos);
    updatedTodos.delete(key);
    setTodos(updatedTodos);
  };

  const handleEdit = (itemKey: string, editedTodo: Todo) => {
    const updatedTodos = new Map(todos);
    updatedTodos.set(itemKey, editedTodo);
    setTodos(updatedTodos);
  };

  return (
    <StyledContainer>
      <h1>ToDo List</h1>
      <NewTodoForm todos={todos} setTodos={setTodos} />
      <StyledList>
        {Array.from(todos.keys()).map((key) => {
          return (
            <Item
              key={key}
              itemKey={key}
              todo={todos.get(key) as Todo}
              onChange={handleOnChange}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          );
        })}
      </StyledList>
    </StyledContainer>
  );
};

export default App;
