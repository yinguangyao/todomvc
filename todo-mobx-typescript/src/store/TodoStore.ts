import {
    observable, 
    action,
    computed
} from 'mobx'
import { object } from 'prop-types';
interface todo {
    isCompleted: boolean
}
export default class TodoStore {
    static instance: TodoStore
    public constructor(private todos: todo[] = []) {
        this.todos = observable(todos);
    }
    getInstance(todos: todo[]): TodoStore {
        if (!TodoStore.instance) {
            return TodoStore.instance = new TodoStore(todos);
        }
        return TodoStore.instance;
    } 
    @action
    addTodo = (item: todo): void => {
        this.todos.push(item);
    }
    @action
    removeTodo = (index: number): void => {
        this.todos.splice(index, 0);
    }
    @computed
    unCompletedCount = (): number => {
        return this.todos.filter(todo => todo.isCompleted).length
    }
    @computed
    completedCount = (): number => {
        return this.todos.filter(todo => !todo.isCompleted).length
    }
}