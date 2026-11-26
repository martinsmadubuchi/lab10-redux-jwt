// Counter.jsx - demonstrates ACTION + DISPATCH + reading STATE
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, incrementByAmount, reset } from "../store/counterSlice";

export default function Counter() {
  // Read STATE from the store
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [lastAction, setLastAction] = useState(null);

  // 4 - DISPATCH: send an ACTION object to the store
  const send = (action) => {
    setLastAction(action); // show the plain action object on screen
    dispatch(action);
  };

  return (
    <div className="card">
      <h2>Redux Counter</h2>
      <p className="count">{count}</p>
      <div className="buttons">
        <button onClick={() => send(decrement())}>-1</button>
        <button onClick={() => send(increment())}>+1</button>
        <button onClick={() => send(incrementByAmount(5))}>+5</button>
        <button onClick={() => send(reset())}>Reset</button>
      </div>
      <p className="hint">Last ACTION dispatched:</p>
      <pre>{lastAction ? JSON.stringify(lastAction, null, 2) : "none yet"}</pre>
    </div>
  );
}