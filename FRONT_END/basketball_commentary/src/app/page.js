"use client";
import Image from "next/image";
import axios from "axios";
import styles from "./page.module.css";
import Popup from "reactjs-popup";
import { useState } from "react";
//TODO display username at top left of screen
//TODO send username, email, password
//TODO Media Queries :)
export default function Home() {
  const [user, setUser] = useState("Guest");
  const [userID, setUserID] = useState(null);
  //pageMode denotes if you are in "view a single mp4" mode, or "home" mode
  const [pageMode, setPageMode] = useState(0);
  function returnToHome(){
    setPageMode(0);
  }
  if(pageMode == 0){
    return (
      <div className={styles.bodyContainer}>
        <p className={styles.header}>
              {user}
        </p>
        <main className={styles.main}>
          
          <div className={styles.logoWrapper}>
            <div className={styles.logo}>Hooper ai</div>
            <div className={styles.description}>A Basketball Commentary Solution</div>
          </div>

          <PopupButton setUser={(input) => setUser(input)} setPageMode={() => setPageMode(1)}>
            Get Started
          </PopupButton>
        </main>
      </div>
    );
  } else {
    return (
      <main className={styles.main}>
        <p className={styles.nameInputLabel}>
          Your Video!
        </p>
        //right here
        <div className = {styles.button} onClick={returnToHome}>
          Go back to home
        </div>
      </main>
    )
  }
}

//const [isButtonClicked, setIsButtonClicked] = useState(False);
export function PopupButton({ children, setUser, setPageMode }) {
  const [mode, setMode] = useState(0);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [file, setFile] = useState(null);

  function handleClick() {
    alert(mode);
  }
  function button() {
    return (
      <div className={styles.button} onClick={handleClick}>
        {children}
      </div>
    );
  }
  function loginFlow() {
    setMode(1);
  }
  function login(){
    //Query database with login info, 
    setUser(document.getElementById("usernameInput").value)
    setPageMode();
  }
  function guestFlow() {
    setMode(2);
  }
  function menu(){
    setMode(0);
  }

  if (mode == 0) {
    return (
      <Popup trigger={button} modal nested>
        {(close) => (
          <div className={styles.initialPopup}>
            <div className={styles.inBoxButton} onClick={loginFlow}>
              Login
            </div>
            <div className={styles.inBoxButton} onClick={guestFlow}>
              Guest
            </div>
            <div className={styles.inBoxButton} onClick={close}>
              Close
            </div>
          </div>
        )}
      </Popup>
    );
  } else if (mode == 1) {
    //LOGIN FLOW
    return (
      <Popup trigger={button} modal nested>
                {
                  close => 
                    
                    (<div className = {styles.initialPopup}>
                        <p className = {styles.nameInputLabel}>Username</p>
                        <textarea class = {styles.nameInput} rows="1" id="usernameInput"/>
                        <p className = {styles.nameInputLabel}>Email</p>
                        <textarea class = {styles.nameInput} rows="1" id="emailInput"/>
                        <p className = {styles.nameInputLabel}>Password</p>
                        <textarea class = {styles.nameInput} rows="1" id="passwordInput"/>
                        <div className = {styles.inBoxButton} onClick={login}>
                              Login
                        </div>
                        <div className = {styles.inBoxButton} onClick={menu}>
                              Go Back To Menu
                        </div>
                      </div>
                    )
                }
            </Popup>
    );
  } else if (mode == 2) {
    const handleUpload = async () => {
      // Create a new FormData object
      // Append all the data to the object
      const formData = new FormData();
      formData.append("player1Name", player1Name);
      formData.append("player2Name", player2Name);
      formData.append("file", file);

      // Use axios to post the data to the server
      const result = await axios.post("http://localhost:3001/upload", formData);

      // Log the result from the server
      console.log(result.data);
    };

    return (
      <Popup trigger={button} modal nested>
        {(close) => (
          <div className={styles.initialPopup}>
            <div className={styles.guestFlowTopBox}>
              <div className={styles.guestFlowColumn}>
                <p className={styles.nameInputLabel}>Player 1 Name</p>
                <textarea
                  class={styles.nameInput}
                  rows="1"
                  hint="Player 1 Name"
                  onChange={(e) => setPlayer1Name(e.target.value)}
                />
              </div>
              <div className={styles.guestFlowColumn}>
                <p className={styles.nameInputLabel}>Player 2 Name</p>
                <textarea
                  class={styles.nameInput}
                  rows="1"
                  onChange={(e) => setPlayer2Name(e.target.value)}
                />
              </div>
            </div>
            
            <label for="file" className={styles.inBoxButton}>
              Select MP4
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
              className={styles.file}
            />
            <div className={styles.inBoxButton} onClick={handleUpload}>
              Upload MP4
            </div>
            <div className = {styles.inBoxButton} onClick={menu}>
              Go Back To Menu
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

export function InBoxButton({ children }) {
  function handleClick() {}
  return (
    <div className={styles.inBoxButton} onClick={handleClick}>
      {children}
    </div>
  );
}

export function inputBox({ children }) {
  return <textarea rows="4" cols="50" />;
}
