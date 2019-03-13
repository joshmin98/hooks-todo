import React, { useReducer, useContext, useEffect, useState } from "react";
import {
  Button,
  Collapsible,
  CollapsibleItem,
  Input,
  Preloader
} from "react-materialize";

const appReducer = (state, action) => {
  switch (action.type) {
    case "add": {
      return [...state, { id: Date.now(), text: "New Item", completed: false }];
    }
    case "delete": {
      return state.filter(item => item.id !== action.payload);
    }
    case "completed": {
      return state.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            completed: !item.completed
          };
        }
        return item;
      });
    }
    case "change_text": {
      return state.map(item => {
        if (item.id === action.id) {
          return {
            ...item,
            text: action.text
          };
        }
        return item;
      });
    }
    case "reset": {
      return action.payload;
    }
    default:
      return state;
  }
};

const Context = React.createContext();

let TodoItem = ({ id, completed, text }) => {
  const dispatch = useContext(Context);
  return (
    <CollapsibleItem
      style={{
        marginBottom: "10px"
      }}
      header={text}
      onSelect={() => {}}
    >
      <div className="container">
        <form
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          {!completed ? (
            <h5
              style={{
                cursor: "pointer"
              }}
              className="red-text"
              onClick={() => {
                dispatch({ type: "completed", payload: id });
              }}
            >
              TODO
            </h5>
          ) : (
            <h5
              style={{
                cursor: "pointer"
              }}
              className="green-text"
              onClick={() => {
                dispatch({ type: "completed", payload: id });
              }}
            >
              DONE
            </h5>
          )}
          <input
            type="text"
            defaultValue={text}
            onChange={event => {
              dispatch({
                type: "change_text",
                id: id,
                text: event.target.value
              });
            }}
          />
          <Button onClick={() => dispatch({ type: "delete", payload: id })}>
            Delete
          </Button>
        </form>
      </div>
    </CollapsibleItem>
  );
};

let TodoList = ({ items }) => {
  return (
    <Collapsible popout defaultActiveKey={1}>
      {items.map(item => (
        <TodoItem key={item.id} {...item} />
      ))}
    </Collapsible>
  );
};

export default props => {
  const [state, dispatch] = useReducer(appReducer, []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("data");
    dispatch({ type: "reset", payload: JSON.parse(raw) });
    setLoading(false);
  }, []);

  useEffect(
    () => {
      localStorage.setItem("data", JSON.stringify(state));
    },
    [state]
  );

  return (
    <Context.Provider value={dispatch}>
      <div className="container">
        <h1 className="grey-text text-darken-3">Todo's (now with Hooks!)</h1>
        {loading ? (
          <h5 className="grey-text">Loading...</h5>
        ) : (
          <TodoList items={state} dispatch={dispatch} />
        )}
        <Button
          floating
          large
          waves="light"
          icon="add"
          onClick={() => dispatch({ type: "add" })}
        />
      </div>
    </Context.Provider>
  );
};
