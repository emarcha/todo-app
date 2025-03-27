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
    <li key={itemKey}>
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
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onChange(itemKey, todo)}
            />
            {todo.text}
          </label>
          <button onClick={() => setEditing(true)}>&#9998;</button>
          <button onClick={() => onDelete(itemKey)}>&#215;</button>
        </>
      )}
    </li>
  );
};

export default Item;
