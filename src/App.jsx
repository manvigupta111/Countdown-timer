import { useState } from "react";
import CountdownTimer from "./Components/CountdownTimer.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return <CountdownTimer />;
}

export default App;
