import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import "./Component/ImageUploader";
import ImageUploader from "./Component/ImageUploader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

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
    const [editing, setEditing] = useState(false);

    const InputFrom = ({ todo, setText }) => {
        if (editing) {
            return (
                <form className="formText">
                    <div>
                        <input
                            className="input"
                            type="text"
                            value={todo.text}
                            onChange={(e) => {
                                e.preventDefault();
                                setText({ ...todo, text: e.target.value });
                            }}
                        />
                    </div>
                    <div className="button">
                        <div>
                            <button onClick={() => setEditing(false)}>
                                Save
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    finishTodo(todo.id);
                                }}
                            >
                                done
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    deleteTodo(todo.id);
                                }}
                            >
                                delete
                            </button>
                        </div>
                    </div>
                </form>
            );
        } else {
            return (
                <div className="formText">
                    <div>
                        <li className={todo.completed ? "done" : "work"}>
                            {todo.text}
                        </li>
                    </div>
                    <div className="button">
                        <div>
                            <button onClick={() => setEditing(true)}>
                                Edit
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    finishTodo(todo.id);
                                }}
                            >
                                done
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    deleteTodo(todo.id);
                                }}
                            >
                                delete
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
    };
    const addTodos = () => {
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

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };
    function handleChangeTodo(nextTodo) {
        setTodos(
            todos.map((t) => {
                if (t.id === nextTodo.id) {
                    return nextTodo;
                } else {
                    return t;
                }
            })
        );
    }

    const finishTodo = (id) => {
        const element = todos.findIndex((i) => i.id === id);
        const newtodos = [...todos];
        newtodos[element] = {
            ...newtodos[element],
            completed: true,
        };
        setTodos(newtodos);
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
                    <h2>Todolist {text}</h2>
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
                            <button
                                className="submit"
                                onClick={addTodos}
                                type="button"
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span> Add todo
                            </button>
                        </form>
                    </div>
                </div>
                <div className="todo-list">
                    <ol>
                        {todos.map((todo) => (
                            <div className="todos" key={todo.id}>
                                <div>
                                    <InputFrom
                                        todo={todo}
                                        setText={handleChangeTodo}
                                    />
                                </div>
                            </div>
                        ))}
                    </ol>
                </div>
                <div></div>
            </div>
        </section>
    );
}

export default App;
