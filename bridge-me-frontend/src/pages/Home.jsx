import {useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate()
  return(
    <div>
      <h1>Welcome to BridgeMe Project</h1>
      <p>Please login to continue.</p>
  
  
      <button onClick={()=>navigate('/login')}>Login</button>
    </div>
  );
}

export default Home;
