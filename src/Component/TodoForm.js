import React from "react";
import "../App.css";

const TodoForm = ({ todo, setText, submit }) => {
    return (
        <div className="form-input" >
            <form onSubmit={submit}>
                <div>
                    <input
                        type="text"
                        placeholder="Enter your Todo"
                        class="input"
                        value={todo}
                        onChange={(e) => {
                            
                            setText(e.target.value);
                        }}
                    ></input>
                </div>

                <div>
                    <button className="submit"  type="button">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span> Add todo
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TodoForm;
