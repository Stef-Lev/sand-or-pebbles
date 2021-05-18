import React, {useState , useEffect} from 'react';
import './App.css';

function App() {
const [data, setData] = useState('');

useEffect(() => {
 fetch('http://localhost:7002/beaches',{method: 'GET', mode: 'no-cors'})
 .then(res => res.json())
 .then(beaches => setData(beaches))
}, [])

  return (
    <div className="App">
      <ul>
    {data && data.map(item => {
      return <li>{item.title}</li>
    })}
    </ul>
    </div>
  );
  
}

export default App;
