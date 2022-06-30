import React, { useState, useEffect, useRef } from "react";
import WeatherWidget from "../../components/weatherwidget/weatherwidget";
import "./ToolsPage.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Tools() {

  const [data, setData] = useState([]);
  const [value, setValue] = React.useState("");
  const [count, setCount] = useState(0);
  const [location, setLocation] = React.useState("barrie");
  const [todos, setTodos] = React.useState([
    {
      text: "Sample Entry",
      isDone: false
    }
  ]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c36ffcd6dbd3d32e3deb52499600743c`)
        .then((res) => res.json())
        .then((result) => {
          setData(result);
        });
    };
    fetchWeatherData();
  }, []);

  function Todo({ todo, index, markTodo, removeTodo }) {
    return (
      <div className="todo">
        <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
        <div>
          <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
          <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
        </div>
      </div>
    );
  }
  
  function TodoForm({ addItem }) {
  
    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addItem(value);
      setValue("");
    };
  
    return (
      <Form onSubmit={handleSubmit}> 
      <Form.Group>
        <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
      </Form.Group>
      <Button variant="primary mb-3" type="submit">
        Submit
      </Button>
    </Form>
    );
  }

 

  const addItem = text => {
    const newTodos = [...todos, { text }];
    setCount(count + 1)
    setTodos(newTodos);
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  
  return (
    <>
      <div className="container py-5" style={{ marginTop: "5rem" }}>
      <h1 className="text-center mb-4">Todo List</h1>
        <div className="app">
        <div className="container">
          <TodoForm addItem={addItem} />
          <div>
            {todos.map((todo, index) => (
              <Card>
                <Card.Body>
                  <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                  />
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
      </div>

      <div className="container pb-5" style={{ width: "25rem" }}>
        <h1 className="text-center font-weight-bold header-animated py-4">Weather App</h1>
        <div className="align-items-center justify-content-center">
          <WeatherWidget weatherData={data}/>
        </div>
      </div>


    </>
  );
}