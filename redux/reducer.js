const initialState = {
  tasks: [
    { id: 1, text: "ABC", count: 100 },
    { id: 2, text: "BEF", count: 200 },
    { id: 3, text: "CDE", count: 300 },
    { id: 4, text: "FGH", count: 400 },
    { id: 5, text: "MHK", count: 500 },
  ],
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "REMOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)),
      };
    default:
      return state;
  }
};

export default tasksReducer;
