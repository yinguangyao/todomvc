import * as React from "react";
import {
    render
} from 'react-dom'
import TodoStore from './store/TodoStore'
const todoStore = new TodoStore();
render(
    <h1>hello, tsx</h1>,
    document.getElementById("app") as HTMLElement
)