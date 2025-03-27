import { Dispatch, FC, FormEvent, SetStateAction } from 'react';

type NewTodoFormProps = {
  todos: Map<string, Todo>;
  setTodos: Dispatch<SetStateAction<Map<string, Todo>>>;
};

type Todo = {
  text: string;
  completed: boolean;
};

const NewTodoForm: FC<NewTodoFormProps> = ({ todos, setTodos }) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const value = event.target.todo.value;

    if (value) {
      const newTodo: Todo = {
        text: event.target.todo.value,
        completed: false,
      };
      const updatedTodos = new Map<string, Todo>(todos);
      updatedTodos.set(self.crypto.randomUUID(), newTodo);
      setTodos(updatedTodos);
      event.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="text" name="todo" id="todo" placeholder="Add a new task" />
      </label>
      <button type={'submit'}>Add</button>
    </form>
  );
};

export default NewTodoForm;
