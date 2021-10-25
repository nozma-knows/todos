import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd';
import { v4 as uuid } from 'uuid';

function App() {

  const { TextArea } = Input

  // Initial State for new todo item
  const initialState = {
    id: uuid(),
    title: '',
    completed: false,
  }

  // Create hooks for new todo, list of todos, and editing a todo
  const [todo, setTodo] = useState(initialState)
  const [todos, setTodos] = useState([])
  const [editingTodo, setEditingTodo] = useState(0)

  // Function used to update todo with user input
  function handleChange(e) {
    setTodo({ ...todo, [e.target.name] : e.target.value })
  }

  // Function used to add a todo to list of todos if the todo is not blank
  function createTodo() {
    if (!todo.title) return
    setTodos([...todos, todo])
    setTodo(initialState)
  }

  // Function used to delete a todo (filter todo out of list of todos)
  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // Function used to update todo. When user clicks on todo, the <div> turns to an input field so the user can update the todo
  function updateTodo(oldTodo) {
    if (todo.title) {
      const index = todos.indexOf(todo)
      const newTodo = todo
      const newTodos = [...todos.slice(0, index), newTodo, ...todos.slice(index, -1)]
      setTodos(newTodos)
      setTodo(initialState)
    }
    setEditingTodo(0)
  }

  // Function used to toggle the completetion of a todo
  function toggleTodo(id) {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      } else {
        return todo
      }
    }))
  }

  
  return (
    <div style={styles.todoContainer}>
      <div style={styles.todoInput}>
        <TextArea 
          onChange={ !editingTodo ? handleChange : null}
          name="title"
          placeholder="What would you like to do?"
          autoSize={{ minRows: 1, maxRows: 4 }}
          value={!editingTodo ? todo.title : ''}
          style={styles.input}
        />
        <Button
          type="primary"
          onClick={createTodo}
          style={styles.button}
        >
          Add
        </Button>
      </div>
      <div style={styles.todoList}>
        {
          todos.map(item => (
            <div key={item.id} style={styles.todoItem}>
              <input 
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTodo(item.id)}
                style={styles.checkBox}
              />
              { editingTodo === item.id ? 
                <>
                  <TextArea 
                    onChange={handleChange} 
                    name="title" 
                    placeholder={item.title}
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    // value={todo.title}
                    style={styles.title} 
                  /> 
                  <Button
                    type="primary"
                    onClick={() => updateTodo(todo)}
                    style={styles.button}
                  >
                    Update
                  </Button>
                </> : 
                <>
                  <div 
                    style={item.completed ? {textDecoration: "line-through", ...styles.input} : {...styles.input}}
                    onClick={() => setEditingTodo(item.id)}
                  >
                    {item.title}
                  </div>
                  <Button
                    type="primary"
                    onClick={() => deleteTodo(item.id)}
                    style={styles.button}
                  >
                    Delete
                  </Button>
                </>  
              }
              
            </div>
          ))
        }
      </div>
    </div>
  )
}

const styles = {
  todoContainer: {
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: 'green',
    alignItems: 'center',
  },
  todoInput: {
    display: 'flex',
    flexDirection: 'row',
    width: '60%',
    // backgroundColor: 'green',
  },
  input: {
    display: 'flex',
    flex: 0.9,
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    display: 'flex',
    flex: 0.1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoList: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    // backgroundColor: 'blue',
  },
  todoItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkBox: {
    display: 'flex',
    flex: 0.1,
  },
  title: {
    display: 'flex',
    flex: 0.8
  },
}

export default App;
