
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {

 const [empIds, setEmpIds] = useState([]);
 const nav=useNavigate()
 

  useEffect(() => {
    fetch('http://localhost:5000/get-emp-id')
      .then((response) => response.text())
      .then((data) => {
        
        setEmpIds(JSON.parse(data)); //convert json to array
        
      })
      .catch((error) => console.error('Error fetching XML:', error));
  }, []);


 
  return (
    <div>
          {
            empIds.map((id)=>
            {
              return (<p>Emp Id== {id} <button value={id} onClick={()=>nav("/")} >Check Details</button></p>)
            })
          }
    </div>
  );
};


export default App;
