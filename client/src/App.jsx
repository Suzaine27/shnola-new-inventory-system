import { useState } from "react";
import { login } from "./api/users";
import { Await, useNavigate } from "react-router-dom";
function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [ShowMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username == '' || password == '') {
      setErrorMessage("Username and Password are required!");
      setShowMessage(true);
      
    }

    else {
      const response = await login(username, password);
      
      if(response) {
        navigate('/inventory');
       
      }
      else{
        setErrorMessage("Invalid username and password aww");
      }
      setShowMessage(true);
    }
  }

  return (
    <>
      <div className="flex justify-center w-screen h-screen bg-black items-center">
        <div className="border border-purple-400 m-5 p-5 rounded w-[400px] h-[350px]">
          <div className="text-4xl text-purple-300 text-center">LOGIN</div>

          {
            ShowMessage &&
            (
              <div className={"m-2 text-center rounded bg-red-200 text-red-800"} >
                { errorMessage }
              </div>
            )
          }
          <div className="flex gap-5 m-10">
            <div className="text-2xl text-purple-500 ">Username:</div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="rounded border border-purple-400" type="text" />
          </div>
          <div className="flex gap-5 m-10 ">
            <div className="text-2xl text-purple-500">Password:</div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="rounded border border-purple-400" type="password" />
          </div>
          <div className="flex justify-center">
            <button onClick={handleLogin} className="rounded bg-black text-purple-400 hover:bg-gray-600">LOGIN</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
