const initState = {
  message: null,
  status: null,
  errors: null,
  spinner: false,
  todos: [],
};

const todoReducer = (state = initState, { type, payload }) => {
  // console.log({ type, payload });
  switch (type) {
    case "CLEAR_TODO_ERRORS":
      return {
        ...state,
        message: null,
        status: null,
        errors: null,
        spinner: false,
      };
    case "START_TODO_SPINNER":
      return {
        ...state,
        spinner: true,
      };
    case "STOP_TODO_SPINNER":
      return {
        ...state,
        spinner: false,
      };
    case "SUCCESS_CREATE_TODO":
      return {
        ...state,
        status: payload.status,
        message: payload.message,
        todos: [payload.payload.todo, ...state.todos],
      };
    case "SUCCESS_DELETE_TODO": {
      const id = payload.payload.todo.id;
      let newTodos = [...state.todos];
      const index = state.todos.findIndex((item) => item.id === id);
      if (index >= 0) {
        newTodos.splice(index, 1);
      }
      return {
        ...state,
        todos: newTodos,
        status: payload.status,
        message: payload.message,
      };
    }
    case "SUCCESS_UPDATE_TODO": {
      const id = payload.payload.todo.id;
      let newTodos = [...state.todos];
      const index = state.todos.findIndex((item) => item.id === id);
      if (index >= 0) {
        // newTodos.splice(index, 1);
        newTodos[index] = payload.payload.todo;
      }
      return {
        ...state,
        todos: newTodos,
        status: payload.status,
        message: payload.message,
      };
    }
    case "SUCCESS_CREATE_TODO_ITEM": {
      const id = parseInt(payload.payload.item.todo_id);
      let newTodos = [...state.todos];
      const index = state.todos.findIndex((item) => item.id === id);
      if (index >= 0) {
        // newTodos.splice(index, 1);
        const newItem = {
          ...payload.payload.item,
          is_completed: false,
          todo_id: id,
        };
        newTodos[index]["todo_items"] = [
          newItem,
          ...newTodos[index]["todo_items"],
        ];
        // console.log(newTodos);
      }
      return {
        ...state,
        todos: newTodos,
        status: payload.status,
        message: payload.message,
      };
    }
    case "SUCCESS_DELETE_TASK": {
      const id = parseInt(payload.payload.item.todo_id);
      let newTodos = [...state.todos];
      const index = state.todos.findIndex((item) => item.id === id);
      if (index >= 0) {
        const task_id = parseInt(payload.payload.item.id);
        const task_index = newTodos[index]["todo_items"].findIndex(
          (item) => item.id === task_id
        );
        newTodos[index]["todo_items"].splice(task_index, 1);
      }
      return {
        ...state,
        todos: newTodos,
        status: payload.status,
        message: payload.message,
      };
    }
    case "SUCCESS_UPDATE_TASK": {
      const id = parseInt(payload.payload.item.todo_id);
      let newTodos = [...state.todos];
      const index = state.todos.findIndex((item) => item.id === id);
      if (index >= 0) {
        const task_id = parseInt(payload.payload.item.id);
        const task_index = newTodos[index]["todo_items"].findIndex(
          (item) => item.id === task_id
        );
        // newTodos[index]["todo_items"].splice(task_index, 1);
        newTodos[index]["todo_items"][task_index] = payload.payload.item;
      }
      return {
        ...state,
        todos: newTodos,
        status: payload.status,
        message: payload.message,
      };
    }
    case "SUCCESS_GET_ALL_TODO":
      return {
        ...state,
        todos: [...payload.payload.todos],
      };
    case "ERRORS_CREATE_TODO":
      return {
        ...state,
        status: payload.status,
        message: payload.message,
      };
    case "ERRORS_GET_ALL_TODO":
      return {
        ...state,
        status: payload.status,
        message: payload.message,
      };
    case "ERROR_DELETE_TODO":
      return {
        ...state,
        status: payload.status,
        message: payload.message,
      };

    default:
      return state;
  }
};
export default todoReducer;
