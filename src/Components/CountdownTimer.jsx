import { useState, useEffect, useRef } from "react";
import "./CountdownTimer.css";

export default function Timer() {
  const [time, setTime] = useState({
    hour: "",
    min: "",
    sec: "",
  });

  const intervalId = useRef(null);

  const [isRunning, setIsRunning] = useState(false);

  const handleChange = (e, field) => {
    const val = e.target.value;

    if (isNaN(val)) return;

    setTime((prevTime) => ({
      ...prevTime,
      [field]: val,
    }));
  };

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setTime({ hour: "", min: "", sec: "" });

    clearInterval(intervalId.current);

    setIsRunning(false);
  };

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalId.current);
      return;
    }

    intervalId.current = setInterval(() => {
      setTime((prev) => {
        let h = Number(prev.hour) || 0;
        let m = Number(prev.min) || 0;
        let s = Number(prev.sec) || 0;

        if (h === 0 && m === 0 && s === 0) {
          clearInterval(intervalId.current);
          setIsRunning(false);
          return prev;
        }

        if (s > 0) {
          s--;
        } else if (m > 0) {
          m--;
          s = 59;
        } else if (h > 0) {
          h--;
          m = 59;
          s = 59;
        }

        return {
          hour: h,
          min: m,
          sec: s,
        };
      });
    }, 1000);

    return () => clearInterval(intervalId.current);
  }, [isRunning]);

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          placeholder="HH"
          value={time.hour}
          onChange={(e) => handleChange(e, "hour")}
        />

        <input
          type="text"
          placeholder="MM"
          maxLength={2}
          value={time.min}
          onChange={(e) => handleChange(e, "min")}
        />

        <input
          type="text"
          placeholder="SS"
          maxLength={2}
          value={time.sec}
          onChange={(e) => handleChange(e, "sec")}
        />
      </div>

      <div className="controls">
        <button onClick={handleStartPause}>
          {isRunning ? "Pause" : "Start"}
        </button>

        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
