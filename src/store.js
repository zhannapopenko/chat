import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  messages: [
    {
      value: "Hi!",
      id: 1,
      currentTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    {
      value: "How are you?",
      id: 2,
      currentTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ],
};

const ADD_MESSAGE = "ADD_MESSAGE";
const DELETE_MESSAGE = "DELETE_MESSAGE";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const addMessageActoinCreator = (payload) => ({
  type: ADD_MESSAGE,
  payload: payload,
});
export const deleteMessageActionCreator = (payload) => ({
  type: DELETE_MESSAGE,
  payload: payload,
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware())
);
