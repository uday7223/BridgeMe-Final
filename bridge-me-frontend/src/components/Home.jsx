import {useNavigate } from "react-router-dom";
import '../styles/home.css'

const Home = () => {
  let navigate = useNavigate()
  return(
   <>
    <div className="home w-[100%] h-[100vh] flex flex-col  space-y-5 items-center">
    
    <h1 className="text-purple-600 text-2xl sm:text-4xl pt-20 ">Welcome to BridgeMe Project</h1>
      <p>Please login to continue. 🎉</p>
  
  
      <button className="border w-28 h-11 text-2xl rounded-md" onClick={()=>navigate('/login')}>Login</button>
    
    </div>
   </>
  );
}

export default Home;
