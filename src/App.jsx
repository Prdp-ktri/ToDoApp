import { useEffect, useState } from "react";
import classes from "./styles.module.css";
import TodoItem from "./components/todo-item";

function App() {
  const [loading, setLoading] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [todoDetails, setTodoDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  async function fetchListOfTodos() {
    try {
      setLoading(true);
      const apiResponse = await fetch("https://dummyjson.com/todos");
      const result = await apiResponse.json();
      console.log(result);
      if (result?.todos && result?.todos?.length > 0) {
        setTodoList(result?.todos);
        setLoading(false);
        setErrorMsg("");
      } else {
        setTodoList([]);
        setLoading(false);
        setErrorMsg("");
      }
    } catch (e) {
      console.log(e);
      setErrorMsg("Some error occurred");
    }
  }

  async function fetchDetailsOfCurrentTodo(getCurrentTodoID) {
    console.log(getCurrentTodoID);
  }

  useEffect(() => {
    fetchListOfTodos();
  }, []);

  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>Simple ToDo App Using Material UI</h1>
      <div className={classes.todoListWrapper}>
        {todoList && todoList.length > 0
          ? todoList.map((todo) => (
              <TodoItem
                fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo}
                key={todo.id}
                todo={TodoItem}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default App;
