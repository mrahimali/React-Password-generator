import { useState, useCallback, useEffect , useRef} from 'react';
// import './App.css';



function App() {

  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [charact, setCharact] = useState(false);
  const [password, setPassword] = useState("");


// useRef hook

  const passwordRef=useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (num) {
      str += "0123456789";
    }
    if (charact) {
      str += "!@#$%^&*()_-+=~`";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, num, charact, setPassword]);


  const copyPasswordToClipboard = useCallback ( () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password);
  },[password])


  useEffect(()=>{
    passwordGenerator();
  },[length,num, charact,passwordGenerator]);



  return (
    <div>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">

        <h1 className='text-2xl mb-3 text-center text-white my-3'>Password Generator</h1>
        <div className="flex-shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            ref={passwordRef}
            readOnly
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
            <input type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label >Length :{length}</label>
          </div>

          <div className="flex item-center gap-x-1">
            <input type="checkbox"
              defaultChecked={num}
              // value={length}
              className='cursor-pointer'
              onChange={() => { setNum((prev) => !prev) }}
            />
            <label >Numbers</label>
          </div>

          <div className="flex item-center gap-x-1">
            <input type="checkbox"
              defaultChecked={charact}
              // value={length}
              className='cursor-pointer'
              onChange={() => { setCharact((prev) => !prev) }}
            />
            <label >Sp. Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
