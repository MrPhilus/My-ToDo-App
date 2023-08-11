import { useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [showPending, setShowPending] = useState(false);

  function deleteItem(taskId) {
    const filteredItem = list.filter((item) => {
      if (item.id !== taskId) {
        return item;
      }
    });

    setList(filteredItem);
  }

  function addList() {
    if (inputText !== "") {
      setList((prev) => {
        return [
          ...prev,
          {
            id: Math.floor(Math.random() * 300000),
            task: inputText,
            completed: false,
          },
        ];
      });

      setInputText("");
    }
  }

  function initiateEdit(taskId, theTask, isNewTask) {
    if (isNewTask) {
      setIsEditing(true);
      setEditId(null);
      setInputText("");
    } else {
      setIsEditing(true);
      setEditId(taskId);
      setInputText(theTask);
    }
  }

  const initiateListing = () => {
    if (isEditing && editId !== null) {
      editList();
    } else {
      addList();
    }
  };

  function editList() {
    const newMap = list.map((item) => {
      if (item.id === editId) {
        return { ...item, task: inputText };
      } else {
        return item;
      }
    });

    setList(newMap);
    setInputText("");
    setIsEditing(false);
    setEditId();
  }

  // function initiateEdit(taskId, theTask) {
  //   setIsEditing(true);
  //   setEditId(taskId);
  //   setInputText(theTask);
  // }

  // function initiateListing() {
  //   isEditing ? editList() : addList();
  // }

  const newList = list.filter((item) => {
    if (showCompleted) {
      return item.completed;
    } else if (showPending) {
      return !item.completed;
    } else {
      return true;
    }
  });

  function toggleCompleted(taskId) {
    const markedDone = list.map((item) =>
      item.id === taskId ? { ...item, completed: !item.completed } : item
    );

    setList(markedDone);
  }

  function displayAll() {
    setShowCompleted(false);
    setShowPending(false);
  }

  function displayCompleted() {
    setShowCompleted(true);
    setShowPending(false);
  }

  function displayPending() {
    setShowCompleted(false);
    setShowPending(true);
  }

  const itemsLeft = list.length;

  return (
    <div className="App">
      <div className="inputArea">
        <input
          className="input"
          type="text"
          value={inputText}
          onInput={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              initiateListing();
            }
          }}
        />
        <button className="inputButton" onClick={initiateListing}>
          {isEditing ? "Done" : "➕"}
        </button>
      </div>

      <div className="listBox">
        {newList.map((item) => {
          return (
            <article className="listItems" key={item.id}>
              <div
                className="checkBox"
                onClick={() => toggleCompleted(item.id)}
              >
                <button className="markDone">
                  {item.completed ? "" : "✔️"}
                </button>
              </div>

              {isEditing && editId === item.id ? (
                <input
                  className={item.completed ? "completed" : "taskItem"}
                  type="text"
                  value={inputText}
                  onInput={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      initiateListing();
                    }
                  }}
                />
              ) : (
                <p
                  className={item.completed ? "completed" : "taskItem"}
                  onClick={() => initiateEdit(item.id, item.task, false)}
                >
                  {item.task}
                </p>
              )}
              <div className="edit">
                <button
                  className="editButton"
                  onClick={() => initiateEdit(item.id, item.task)}
                >
                  ✎
                </button>
                <button
                  className="editButton"
                  onClick={() => deleteItem(item.id)}
                >
                  ❌
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <div className="filters">
        <div>
          {itemsLeft == 1 ? (
            <p>{itemsLeft} task left</p>
          ) : (
            <p>{itemsLeft} tasks left</p>
          )}
        </div>
        <button onClick={displayAll}>All</button>
        <button onClick={displayPending}>Pending</button>
        <button onClick={displayCompleted}>Completed</button>
      </div>
    </div>
  );
}

export default App;
