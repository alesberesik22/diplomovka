import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";

import "../../App.css";
import { db } from "../firebase_conf";
import ToDoFireBase from "../ToDoFireBase";

function ToDo() {
  const [toDos, setTodos] = useState([]);
  const [toDoInput, setToDoInput] = useState("");

  useEffect(() => {
    getToDos();
  }, []); //blank to run only on first launch

  const getToDos = () => {
    db.collection("toDo").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          toD: doc.data().toD,
          inProgress: doc.data().inProgress,
        }))
      );
    });
  };
  console.log("todos:", toDos);

  const addTodo = (e) => {
    e.preventDefault();
    db.collection("toDo").add({
      inProgress: true,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      toD: toDoInput,
    });

    setToDoInput("");
  };

  return (
    <div className="ToDo">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <form>
          <TextField
            id="standard-basic"
            label="Write a ToDo"
            value={toDoInput}
            style={{ width: "90vw", maxWidth: "500px" }}
            onChange={(e) => setToDoInput(e.target.value)}
            style={{ maxWidth: "300px", width: "90vw" }}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={addTodo}
            style={{ display: "none" }}
          >
            Default
          </Button>
        </form>
        <div style={{ width: "90vw", maxWidth: "500px", marginTop: "24px" }}>
          {toDos.map((toDo) => (
            <ToDoFireBase
              toDo={toDo.toD}
              inProgress={toDo.inProgress}
              id={toDo.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToDo;
