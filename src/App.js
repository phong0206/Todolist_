import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import "./Component/ImageUploader";
import ImageUploader from "./Component/ImageUploader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { height } from "@mui/system";
import FocusTrap from "@mui/base/FocusTrap";

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
  flexDirection: "row",
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
// const initalValues = [
//   {
//     text: "Todo1",
//     id: 1,
//     completed: false,
//   },
//   {
//     text: "Todo2",
//     id: 2,
//     completed: false,
//   },

//   {
//     text: "Todo 4",
//     id: 4,
//     completed: false,
//   },
//   {
//     text: "Todo 5",
//     id: 5,
//     completed: false,
//   },
// ];
function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")));
  const [text, setText] = useState("");

  const [editTodo, setEditTodo] = useState(null);
  const [editingText, setEditingText] = useState("");

  const [finish, setFinish] = useState(true);
  const [finishID, setFinishID] = useState(null);
  const [deleteTodo, setDeleteTodo] = useState(null);
  const [openDialog, handleDisplay] = useState(false);
  const [openDialogEdit, handleDisplayEdit] = useState(false);

  const inputRef = useRef(null);

  const handleClose = () => {
    handleDisplay(false);
  };

  const openDialogBox = () => {
    handleDisplay(true);
  };
  //
  const handleCloseEdit = () => {
    handleDisplayEdit(false);
  };

  const openDialogBoxEdit = () => {
    handleDisplayEdit(true);
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
    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setText("");
    inputRef.current.focus();
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
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

    localStorage.setItem("todos", JSON.stringify(newtodos));
    setFinish(true);
  };
  const handleUnFinishTodo = (id) => {
    const element = todos.findIndex((i) => i.id === id);
    const newtodos = [...todos];
    newtodos[element] = {
      ...newtodos[element],
      completed: false,
    };
    setTodos(newtodos);
    localStorage.setItem("todos", JSON.stringify(newtodos));
    setFinish(false);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(JSON.parse(localStorage.getItem("todos")));
  }, [todos, text]);
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

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
              ref={inputRef}
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
            {JSON.parse(localStorage.getItem("todos")).map((todo) => (
              <div className="todos" key={todo.id}>
                <div>
                  <div className="formText">
                    <div>
                      <li className={todo.completed ? "done" : "work"}>
                        {todo.text}
                      </li>
                    </div>

                    <div className="button">
                      <div>
                        {" "}
                        <Dialog onClose={handleCloseEdit} open={openDialogEdit}>
                          <DialogTitle> Confirm Edit Todo </DialogTitle>

                          <input
                            type="text"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                          />
                          <br></br>
                          <br></br>
                          <div style={divStyle}>
                            <button
                              style={confirmButtonStyle}
                              onClick={() => {
                                submitEdits(editTodo);
                                handleCloseEdit();
                              }}
                            >
                              Submit
                            </button>
                            <button
                              style={confirmButtonStyle}
                              onClick={handleCloseEdit}
                            >
                              Cancel
                            </button>
                          </div>
                        </Dialog>
                        <button
                          onClick={() => {
                            setEditTodo(todo.id);
                            setEditingText(todo.text);
                            openDialogBoxEdit();
                          }}
                        >
                          Edit
                        </button>
                      </div>

                      <div>
                        {finishID === todo.id ? (
                          <button
                            onClick={() => {
                              handleUnFinishTodo(todo.id);
                              setFinishID(null);
                            }}
                          >
                            Unfinish
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handleFinishTodo(todo.id);
                              setFinishID(todo.id);
                            }}
                          >
                            Finish
                          </button>
                        )}
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            openDialogBox();
                            setDeleteTodo(todo.id);
                          }}
                        >
                          delete
                        </button>
                        <Dialog onClose={handleClose} open={openDialog}>
                          <DialogTitle> Confirm Delete Todo </DialogTitle>
                          <h3
                            style={{
                              marginTop: "-10px",
                              padding: "5px 10px",
                            }}
                          >
                            Are you sure to delete the Todo?{" "}
                          </h3>
                          <br></br>
                          <div style={divStyle}>
                            <button
                              style={confirmButtonStyle}
                              onClick={() => {
                                handleDeleteTodo(deleteTodo);
                                handleClose();
                                console.log(todo.id);
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
