import { useEffect, useState } from "react";
import classes from "./styles.module.css";
import TodoItem from "./components/todo-item/Index";
import TodoDetails from "./components/Todo-details/Index";
import { Skeleton } from "@mui/material";
import TodoList from "./components/todo-List/index";

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

    try {
      const apiResponse = await fetch(
        `https://dummyjson.com/todos/${getCurrentTodoID}`
      );
      const details = await apiResponse.json();
      if (details) {
        setTodoDetails(details);
        setOpenDialog(true);
      } else {
        setTodoDetails(null);
        setOpenDialog(false);
      }

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchListOfTodos();
  }, []);

  if (loading)
    return <Skeleton variant="rectangular" width={650} height={650} />;

  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>Simple ToDo App Using Material UI</h1>
      <div className={classes.todoListWrapper}>
        {TodoList && TodoList.length > 0
          ? TodoList.map((TodoItem) => (
              <TodoItem
                fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo}
                // key={todo.id}
                Todo={TodoItem}
              />
            ))
          : null}
      </div>
      <TodoDetails
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        TodoDetails={TodoDetails}
        setTodoDetails={setTodoDetails}
      />
    </div>
  );
}

export default App;
