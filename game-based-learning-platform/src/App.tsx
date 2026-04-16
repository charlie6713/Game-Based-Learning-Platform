import Mybutton from "./components/Mybutton";
import hero from './assets/hero.png'
import { useState } from "react";

function Statebutton(){
  const [count, setcount] = useState(0);
  function handleclick(){
    setcount(count + 1);
  }

  return<button onClick={handleclick}>
    click {count} times
  </button>
}


function Sharebutton({count, onClick} : {count:number; onClick: () => void}){
  return <button onClick={onClick}>share {count} times</button>
}

const user = {
  name: 'charlie',
  role: "student",
  ImageUrl: hero,
  imagesize: 100
};

const students = [
  {id : 1, name: "charlie", score: 8, submitted: true},
  {id : 2, name: "polos", score: 5, submitted: false},
  {id : 3, name: "yumi", score: 4, submitted: true},
];

const showreust = true;

export default function App(){
  const [count, setcount] = useState(0);

  function handleshareclick(){
    setcount(count + 1)
  }

  const liststudents = students.map(student=>
    <li key={student.id} style={{color: student.submitted ? 'magenta': "darkblue"}}>
      {student.name}
    </li>
  )
  return(
    <div>
      <h1>Welcome to my app</h1>
      <Mybutton />
      <h2>{user.name}</h2>
      <p>{user.role}</p>
      <img 
        src={user.ImageUrl}
        alt={'photo of ' + user.name}
        style={{
          width: user.imagesize,
          height: user.imagesize,
        }}></img>
        <h1>session result</h1>
        {showreust ? (
          <ul>
            {students.map((student)=>(
              <li key={student.id}>
                {student.name}
                {student.submitted ? '- score: ' + student.score: '- not submitted'}
              </li>
            ))}
          </ul>
        ): "results are hidden"}
        <ul>{liststudents}</ul>
        <Statebutton />
        <Statebutton />
        <Sharebutton count={count} onClick={handleshareclick}/>
        <Sharebutton count={count} onClick={handleshareclick}/>
    </div>
  );
}