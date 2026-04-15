import Mybutton from "./components/Mybutton";
import hero from './assets/hero.png'

const user = {
  name: 'charlie',
  role: "student",
  ImageUrl: hero,
  imagesize: 100
}

export default function App(){
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
    </div>
  );
}