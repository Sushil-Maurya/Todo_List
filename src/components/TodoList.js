import {
  AddCircleRounded,
  CancelRounded,
  DeleteRounded,
  EditRounded,
  UpdateRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = sessionStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");

  const [edit, setEdit] = useState(false);

  const [currentTodo, setCurrentTodo] = useState({});
  //   console.log(todo, currentTodo);

  useEffect(() => {
    sessionStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleChange(e) {
    setTodo(e.target.value);
  }

  function handleEdit(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    // console.log(currentTodo);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleUpdateTodo(id, updateTodo) {
    const updateItem = todos.map((todo) => {
      return todo.id === id ? updateTodo : todo;
    });
    setEdit(false);
    setTodos(updateItem);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
        },
      ]);
    }
    setTodo("");
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  function handleEditClick(todo) {
    setEdit(true);
    setCurrentTodo({ ...todo });
  }

  return (
    <>
      <Paper sx={{ margin: "15%" }}>
        {edit ? (
          <form onSubmit={handleEditSubmit}>
            <Typography
              variant="h5"
              justifyContent="center"
              textAlign="center"
              m={2}
              fontWeight={900}
            >
              Update Todo
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={6}
            >
              <FormControl sx={{ width: "70%" }}>
                <TextField
                  id="todo"
                  variant="outlined"
                  label="Update Todo"
                  name="editToto"
                  type="text"
                  size="small"
                  placeholder="Edit Todo"
                  value={currentTodo.text}
                  onChange={handleEdit}
                />
              </FormControl>
              <Button variant="contained" type="submit">
                <UpdateRounded />
              </Button>
              <Button variant="contained" onClick={() => setEdit(false)}>
                <CancelRounded />
              </Button>
            </Box>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <Typography
              variant="h5"
              justifyContent="center"
              textAlign="center"
              m={2}
              fontWeight={900}
            >
              Add Todo
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={6}
            >
              <FormControl sx={{ width: "70%" }}>
                <TextField
                  id="todo"
                  variant="outlined"
                  label="Add Todo"
                  name="todo"
                  type="text"
                  size="small"
                  placeholder="Enter new Todo"
                  value={todo}
                  onChange={handleChange}
                />
              </FormControl>
              <Button type="submit" variant="contained" size="small">
                <AddCircleRounded fontSize="large" />
              </Button>
            </Box>
          </form>
        )}
        <Table sx={{ maxWidth: "100%" }} aria-label="caption table">
          <TableHead>
            <TableRow >
              <TableCell sx={{fontWeight: 700}}>S. No.</TableCell>
              <TableCell scope="row" sx={{fontWeight: 700}}>Name</TableCell>
              <TableCell align="right" scope="row" sx={{fontWeight: 700}}>
                Action
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo, i) => {
              return (
                <TableRow key={todo.id}>
                  <TableCell> #{i + 1}</TableCell>
                  <TableCell scope="row"> {todo.text}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => handleEditClick(todo)}
                    >
                      <EditRounded />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDeleteClick(todo.id)}
                    >
                      <DeleteRounded />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default TodoList;
