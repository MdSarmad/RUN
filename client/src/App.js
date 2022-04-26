import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

function App() {

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    const payload = {
      language: "cpp",
      code
    };

    try {
      const { data } = await axios.post("http://localhost:2022/run", payload);
      setOutput(data.output);
    } catch (err) {
      console.log(err.response);
    }

    console.log(output);
  }

  return (
    <div className="App">
      <h1>Online Code Compiler</h1>
      <textarea value={code} cols="75" rows="30" onChange={(e) => setCode(e.target.value)}></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{output}</p>
    </div>
  );
}

export default App;
