import "./App.css";
import React, { useEffect, useRef, useState } from "react";

function App() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [count, setCount] = useState(6);
  const [message, setMessage] = useState("");
  const canvasRef = useRef();
  const contextRef = useRef();

  console.log(count);
  console.log(message);

  useEffect(() => {
    let canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    if (count === 0) {
      setMessage("You Finish your try");
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    setCount((state) => state - 1);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const endDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearDrawing = () => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setCount(0);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <div className="App">
      <h5></h5>
      <button onClick={clearDrawing}>Clear and start Again</button>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
}

export default App;
