import { Button, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { db } from "./firebase_conf";

export default function ToDoFireBase({ toDo, inProgress, id }) {
  const toggleInProgress = () => {
    db.collection("toDo").doc(id).update({
      inProgress: !inProgress,
    });
  };

  const deleteTodo = () => {
    db.collection("toDo").doc(id).delete();
  };

  return (
    <div style={{ display: "flex" }}>
      <ListItem>
        <ListItemText
          primary={toDo}
          secondary={inProgress ? "In Progress" : "Completed"}
        />
      </ListItem>
      <Button onClick={toggleInProgress}>
        {inProgress ? "Done" : "Undone"}
      </Button>
      <Button onClick={deleteTodo}>X</Button>
    </div>
  );
}
