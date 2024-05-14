import axios from "axios";
import React, { useState } from "react";
import { CSSProperties } from 'react';


type LoginProps = {
  toggleIsLoggedIn: (accessToken: string | null) => void;
};

function Login(props: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isLoginFormVisible, setIsLoginFormVisible] = useState<boolean>(true);

  const toggleForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };



  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      username: isLoginFormVisible ? username : newUsername,
      password: isLoginFormVisible ? password : newPassword,
    };

    try {
      const endpoint = isLoginFormVisible ? "/login" : "/signup";
      const res = await axios.post(endpoint, data);
      const { accessToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      props.toggleIsLoggedIn(accessToken);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };


  const styles: { [key: string]: CSSProperties } = {
    // img: {
    //   width: '100%',
    // },
    login: {
      height: '1000px',
      width: '100%',
      background: 'rgb(44, 69,117)',
      position: 'relative',
    },
    loginBox: {
      width: '1050px',
      height: '600px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '1px 4px 22px -8px #0004',
      display: 'flex',
      overflow: 'hidden',
    },
    left: {
      width: '41%',
      height: '100%',
      padding: '25px 25px',
      background: 'linear-gradient(-45deg, #dcd7e0, #fff)',
    },
    right: {
      width: '59%',
      height: '100%',
      position: 'relative',
    },
    contact: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      height: '100%',
      width: '73%',
      margin: 'auto',
    },
    form: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    input: {
      border: 'none',
      width: '80%',
      margin: '15px 0px',
      borderBottom: '1px solid #4f30677d',
      padding: '7px 9px',
      overflow: 'hidden',
      background: 'transparent',
      fontWeight: 600,
      fontSize: '14px',
    },
    submit: {
      border: 'none',
      padding: '15px 70px',
      borderRadius: '8px',
      display: 'block',
      margin: 'auto',
      marginTop: '120px',
      background: 'rgb(44, 69,117)',
      color: '#fff',
      fontWeight: 'bold',
      boxShadow: '0px 9px 15px -11px rgba(88, 54, 114, 1)',
    },
    rightText: {
      height: '100%',
      position: 'relative',
      transform: 'translate(0%, 45%)',
      textAlign: "center",
    },
    label: {
      fontSize: "1em",
      fontWeight: "bold",
      marginTop: "2vh",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background 0.3s ease",
      display: "block",
      position: 'relative',
    },
  };


  return (
      <>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossOrigin="anonymous"></link>
        <body>

        <section style={styles.login}>
          <div style={styles.loginBox}>
            <div style={styles.left}>

              <div style={styles.contact}>


                <form style={styles.form} onSubmit={submitHandler}>
                  <input
                      style={styles.input}
                      type="text"
                      placeholder="Username"
                      value={isLoginFormVisible ? username : newUsername}
                      onChange={(e) =>
                          isLoginFormVisible
                              ? setUsername(e.target.value)
                              : setNewUsername(e.target.value)
                      }

                  ></input>
                  <input
                      style={styles.input}
                      type="password"
                      placeholder="Password"
                      value={isLoginFormVisible ? password : newPassword}
                      onChange={(e) =>
                          isLoginFormVisible
                              ? setPassword(e.target.value)
                              : setNewPassword(e.target.value)
                      }
                  ></input>
                  <button style={styles.submit} type="submit">
                    {isLoginFormVisible ? "Login" : "Sign up"}
                  </button>
                  <label
                      htmlFor="toggle"
                      aria-hidden="true"
                      style={styles.label}
                      onClick={toggleForm}
                  >
                    {isLoginFormVisible ? "New here? Sign up today!" : "Already have an account? Log in here!"}
                  </label>
                </form>


              </div>
            </div>

            <div style={styles.right}>
              <div style={styles.rightText}>
                <h2>Welcome to Habit Track!</h2>


              </div>

            </div>
          </div>
        </section>

        </body>
      </>
  );
}

export default Login;
