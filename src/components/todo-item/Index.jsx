import { Card, CardActions, CardContent, Typography } from "@mui/material";

function TodoItem({ todo, fetchDetailsOfCurrentTodo }) {
  console.log(todo);
  return (
    <Card
      sx={{
        maxWidth: 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h5" color={"text.secondary"}>
          {todo?.todo}
        </Typography>
      </CardContent>
      <CardActions>
        <button
          onClick={() => fetchDetailsOfCurrentTodo(todo?.id)}
          sx={{
            backgroundColor: "black",
            color: "white",
            opacity: "0.75",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
              opacity: "1",
            },
          }}
        >
          Details
        </button>
      </CardActions>
    </Card>
  );
}

export default TodoItem;
