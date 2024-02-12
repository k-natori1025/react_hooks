import { useState, useEffect, useContext, useRef, useReducer, useMemo, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyContext from './main';
import SomeChild from './SomeChild';
import useLocalStorage from './UseLocalStorage';

const reducer = (state, action) => {
  switch(action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}

function App() {
  // useState
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1)
    console.log(count);
  }
  // useContext
  const myInfo = useContext(MyContext);
  // useRef
  const ref = useRef();
  const handleRef = () => {
    console.log(ref.current.value);
  }
  // useReducer
  const [state, dispatch] = useReducer(reducer, 0);
  // useEffect
  useEffect(()=> {
    console.log("Hello Hooks");
  }, [count])

  // useMemo
  const [count01, setCount01] = useState(0)
  const [count02, setCount02] = useState(0)
  // count02に関係ない部分が変わった際は、この処理は走らず、メモリの情報を使う
  const square = useMemo(() => {
    let i = 0;
    // 重い処理
    while( i < 200) {
      i++;
    }
    console.log("クリックされました")
    return count02 * count02;
  }, [count02])
  
  //useCallback = callback関数をメモリに保存、useMemo=値をメモリに保存
  // 通常、親コンポーネントがレンダリングされると、子コンポーネントもレンダリングされるが、useCallbackを使えば、親がレンダリングされてもレンダリングは走らない
  const [counter, setCounter] = useState(0);

  // counterの値が変わった時だけこの関数が走る
  const showCount = useCallback(() => {
    alert(`これは重い処理です`)
  }, [counter])

  // カスタムフック
  const [age, setAge] = useLocalStorage("age", 29);

  return (
      <div>
        <h1>useState, useEffect</h1>
        <button onClick={handleClick}>+</button>
        <p>{count}</p>

        <hr />
        <h1>useContext</h1>
        <p>{myInfo.name}</p>
        <p>{myInfo.age}</p>

        <hr />
        <h1>useRef</h1>
        <input type="text" ref={ref} />
        <button onClick={handleRef}>参照する</button>

        <hr />
        <h1>useReducer</h1>
        <p>カウント: {state}</p>
        <button onClick={()=> dispatch({ type: "increment" })} >+</button>
        <button onClick={()=> dispatch({ type: "decrement" } )} >-</button>

        <hr />
        <h1>useMemo</h1>
        <div>カウント01: {count01}</div>
        <div>カウント02: {count02}</div>
        <div>結果: {square}</div>
        <button onClick={() => setCount01(count01 + 1)}>+</button>
        <button onClick={() => setCount02(count02 + 1)}>+</button>

        <hr />
        <h1>useCallback</h1>
        <SomeChild showCount={showCount}/>

        <hr />
        <h1>カスタムフック</h1>
        <p>{age}</p>
        <button onClick={() => setAge(80)}>年齢をセット</button>
        
      </div>
  )
}

export default App
