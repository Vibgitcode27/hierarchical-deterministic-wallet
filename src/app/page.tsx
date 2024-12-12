"use client";
import { useAppSelector , useAppDispatch } from "@/lib/hooks";
import { increment , decrement } from "@/lib/features/counter/counterSlice";
export default function Home() {
  
  const counter = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>Counter: {counter}</h1>
      <h1>This is orion</h1>
      <button onClick={() => dispatch(increment())}>Add</button>
      <button onClick={() => {dispatch(decrement())}}>Remove</button>
    </div>  
  );
}
