import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import "./Component/ImageUploader";
import ImageUploader from "./Component/ImageUploader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { height } from "@mui/system";

const initalValues = [
  {
    text: "Todo1",
    id: 1,
    completed: false,
  },
  {
    text: "Todo2",
    id: 2,
    completed: false,
  },
  {
    text: "Test Todo 3",
    id: 3,
    completed: false,
  },
];
function App() {
  const [todos, setTodos] = useState(initalValues);
  const [text, setText] = useState();

  const [editTodo, setEditTodo] = useState(null);
  const [editingText, setEditingText] = useState("");

  const [finish, setFinish] = useState(true);
  const [openDialog, handleDisplay] = useState(false);

  const handleClose = () => {
    handleDisplay(false);
  };

  const openDialogBox = () => {
    handleDisplay(true);
  };
  const buttonStyle = {
    width: "10rem",
    fontsize: "1.5rem",
    height: "2rem",
    padding: "5px",
    borderRadius: "10px",
    backgroundColor: "green",
    color: "White",
    border: "2px solid yellow",
  };
  const divStyle = {
    display: "flex",
    felxDirection: "row",
    position: "absolute",
    right: "0px",
    bottom: "0px",
    // padding: "1rem",
  };
  const confirmButtonStyle = {
    width: "5rem",
    height: "1.5rem",
    fontsize: "1rem",
    backgroundColor: "grey",
    color: "black",
    margin: "5px",
    borderRadius: "10px",
    border: "1px solid black",
  };
  const handleAddTodos = (e) => {
    e.preventDefault();
    if (!text) {
      return;
    }
    let newTodo = {
      text: text,
      id: Math.floor(Math.random() * 10000) + 1,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setText("");
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditTodo(null);
  }

  const handleFinishTodo = (id) => {
    const element = todos.findIndex((i) => i.id === id);
    const newtodos = [...todos];
    newtodos[element] = {
      ...newtodos[element],
      completed: true,
    };
    setTodos(newtodos);
    setFinish(false);
  };
  const handleUnFinishTodo = (id) => {
    const element = todos.findIndex((i) => i.id === id);
    const newtodos = [...todos];
    newtodos[element] = {
      ...newtodos[element],
      completed: false,
    };
    setTodos(newtodos);
    setFinish(true);
  };

  return (
    <section className="App">
      <div className="navbar">
        <div class="container1">
          <div class="cloud front">
            <span class="left-front"></span>
            <span class="right-front"></span>
          </div>
          <span class="sun sunshine"></span>
          <span class="sun"></span>
          <div class="cloud back">
            <span class="left-back"></span>
            <span class="right-back"></span>
          </div>
        </div>
        <div className="avatar">
          <ImageUploader />
        </div>
        <div class="middle">
          <a class="btn" href="https://github.com/phong0206">
            <img
              src="https://i.postimg.cc/tRrcVWDN/5968866.png"
              alt="Github"
            ></img>
          </a>

          <a class="btn" href="#">
            <img
              src="https://i.postimg.cc/SQtZKqNZ/1200px-2021-Facebook-icon-svg.png"
              alt="Facebook"
            ></img>
          </a>
          <a class="btn" href="#">
            <img
              src="https://i.postimg.cc/3JfW6S10/1200px-Instagram-Icon.png"
              alt="Instagram"
            ></img>
          </a>
          <a class="btn" href="#">
            <img
              src="https://i.postimg.cc/HLkqKmYb/174857.png"
              alt="LinkedIn"
            ></img>
          </a>
        </div>
      </div>
      <div className="container">
        <div>
          <h2>Add Todo: {text}</h2>
        </div>
        <div className="form-input">
          <div>
            <input
              type="text"
              placeholder="Enter your Todo"
              name="text"
              class="input"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></input>
          </div>

          <div>
            <form>
              <button className="submit" onClick={handleAddTodos} type="button">
                <span></span>
                <span></span>
                <span></span>
                <span></span> Add todo
              </button>
            </form>
          </div>
        </div>
        <div className="todo-list">
          <ul>
            {todos.map((todo) => (
              <div className="todos" key={todo.id}>
                <div>
                  <div className="formText">
                    <div>
                      {todo.id === editTodo ? (
                        <input
                          type="text"
                          //   value={todo.text}
                          onChange={(e) => setEditingText(e.target.value)}
                        />
                      ) : (
                        <li className={todo.completed ? "done" : "work"}>
                          {todo.text}
                        </li>
                      )}
                    </div>

                    <div className="button">
                      <div>
                        {todo.id === editTodo ? (
                          <button onClick={() => submitEdits(todo.id)}>
                            Submit Edits
                          </button>
                        ) : (
                          <button onClick={() => setEditTodo(todo.id)}>
                            Edit
                          </button>
                        )}
                      </div>

                      <div>
                        {finish ? (
                          <button
                            onClick={() => {
                              handleFinishTodo(todo.id);
                            }}
                          >
                            Finish
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handleUnFinishTodo(todo.id);
                            }}
                          >
                            Unfinish
                          </button>
                        )}
                      </div>
                      <div>
                        <button onClick={openDialogBox}>delete</button>
                        <Dialog onClose={handleClose} open={openDialog}>
                          <DialogTitle> Confirm Delete Todo </DialogTitle>
                          <h3
                            style={{ marginTop: "-10px", padding: "5px 10px" }}
                          >
                            Are you sure to delete the Todo?{" "}
                          </h3>
                          <br></br>
                          <div style={divStyle}>
                            <button
                              style={confirmButtonStyle}
                              onClick={() => {
                                handleDeleteTodo(todo.id);
                                handleClose();
                              }}
                            >
                              Confirm
                            </button>
                            <button
                              style={confirmButtonStyle}
                              onClick={handleClose}
                            >
                              Cancel
                            </button>
                          </div>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div></div>
      </div>
    </section>
  );
}

export default App;
