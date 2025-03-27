import styled from 'styled-components';
import { ChangeEvent, FC, FormEvent, useState } from 'react';

type Todo = {
  text: string;
  completed: boolean;
};

type ItemProps = {
  itemKey: string;
  todo: Todo;
  onChange: (itemKey: string, todo: Todo) => void;
  onDelete: (itemKey: string) => void;
  onEdit: (itemKey: string, editedTodo: Todo) => void;
};

const StyledListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 4px;

  &:hover {
    background-color: lightgray;
  }
`;

const StyledCheckboxLabel = styled.label<{ $completed: boolean }>`
  flex-grow: 1;
  text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
  color: ${(props) => (props.$completed ? 'grey' : 'black')};

  input {
    margin-right: 8px;
  }
`;

const Item: FC<ItemProps> = ({ itemKey, todo, onChange, onDelete, onEdit }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [todoText, setTodoText] = useState<string>(todo.text);

  const handleChange = (event: ChangeEvent) => {
    setTodoText(event.target?.value);
  };

  const handleSave = (event: FormEvent) => {
    event.preventDefault();
    const editedTodo = { ...todo, text: todoText };
    onEdit(itemKey, editedTodo);
    setEditing(false);
  };

  return (
    <StyledListItem key={itemKey}>
      {editing ? (
        <>
          <form onSubmit={handleSave}>
            <label>
              <input
                type="text"
                name="todo"
                id="todo"
                value={todoText}
                onChange={handleChange}
              />
            </label>
            <button type={'submit'}>Save</button>
          </form>
        </>
      ) : (
        <>
          <StyledCheckboxLabel $completed={todo.completed}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onChange(itemKey, todo)}
            />
            {todo.text}
          </StyledCheckboxLabel>
          <div>
            <button onClick={() => setEditing(true)}>&#9998;</button>
            <button onClick={() => onDelete(itemKey)}>&#215;</button>
          </div>
        </>
      )}
    </StyledListItem>
  );
};

export default Item;
