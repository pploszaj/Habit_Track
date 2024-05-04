import axios from "axios";
import React, { useState } from "react";

type LoginProps = {
    toggleIsLoggedIn: () => void;
}

function Login(props: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const submitLoginHandler = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password
  }
  try {
      const res = await axios.post('/login', data);
      console.log('Data updated successfully:', res.data);
      props.toggleIsLoggedIn();
  } catch(error) {
      console.error('Error updating data:', error);
  }
  };
  const submitSignupHandler = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const data = {
        username: newUsername,
        password: newPassword
    }
    try {
        const res = await axios.post('/signup', data);
        console.log('Data updated successfully:', res.data);
        props.toggleIsLoggedIn();
    } catch(error) {
        console.error('Error updating data:', error);
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-white text-2xl">Login</h1>
        <form className="flex gap-8" onSubmit={submitLoginHandler}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
          <input type="password" placeholder="Password"onChange={(e) => setPassword(e.target.value)}></input>
          <button className="h-8 w-10 text-white" type="submit">Login</button>
        </form>
      </div>
      <div className="flex justify-center">
        <h1 className="text-white text-2xl">Sign up</h1>
        <form className="flex gap-8" onSubmit={submitSignupHandler}>
          <input type="text" placeholder="Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}></input>
          <input type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
          <button className="h-8 w-12 text-white" type="submit">Signup</button>
        </form>
      </div>
    </>
  );
}

export default Login;
