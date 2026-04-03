import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");
  const passwordGenerator = useCallback(()=>{
    let pass="";
    let string ="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if(number) string += "1234567890"
    if(characters) string += "!@#$%^&*(){}[];:'/?<>,"

    for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random()* string.length+1)      
        pass+= string.charAt(char);
    }
    setPassword(pass)

  },[length, number, characters])

  const passwordRef = useRef(null)
  const copyPassword=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password)
  }, [password])
  useEffect(()=>{
    passwordGenerator()
  },[length,number,characters, setPassword])

  return (
    <>
    <div >
      <div>Password<br></br>
        <input 
        type="text" 
        value={password}
        placeholder='password'
        readOnly
        ref = {passwordRef}
        />
        <button
        onClick={copyPassword}
        >copy </button>
      </div>
      <div>
        <input type="range" min={6} max={100} value={length}
        className='cursor-pointer'onChange={(e)=>(setLength(e.target.value))}/>
        <label>Length: {length}</label>
      </div>
      <div>
        <input type="checkbox"
        defaultChecked={number}
        id="numberInput"
        onChange={()=>{
          setNumber((prev)=>!(prev));
        }} />
        <label htmlFor="numberInputs">Number</label>
      </div>
      <div>
        <input type="checkbox"
        defaultChecked={characters}
        id="charInput"
        onChange={()=>{
          setCharacters((prev)=>!(prev));
        }} />
        <label htmlFor="charInputs">Characters</label>
      </div>
    </div>
    </>
    
  )
}

export default App
