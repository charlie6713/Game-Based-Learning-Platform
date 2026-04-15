function Mybutton(){
  return <button>I am a button</button>;
}

export default function App(){
  return(
    <div>
      <h1>Welcome to my app</h1>
      <Mybutton />
    </div>
  );
}