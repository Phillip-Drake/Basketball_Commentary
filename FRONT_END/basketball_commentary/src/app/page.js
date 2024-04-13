"use client";
import Image from "next/image";
import axios from "axios";
import styles from "./page.module.css";
import Popup from "reactjs-popup";
import { useState } from "react";
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.logoWrapper}>
        <div className={styles.logo}>Hooper ai</div>
        <div className={styles.description}>
          A Basketball Commentary Solution
        </div>
      </div>

      <PopupButton>Get Started</PopupButton>
    </main>
  );
}

//const [isButtonClicked, setIsButtonClicked] = useState(False);
export function PopupButton({ children }) {
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
  function guestFlow() {
    setMode(2);
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
        {(close) => (
          <div className={styles.initialPopup}>
            <div className={styles.guestFlowTopBox}>
              <div className={styles.guestFlowColumn}>Test1</div>
              <div className={styles.guestFlowColumn}>Test2</div>
            </div>
            <div className={styles.inBoxButton} onClick={close}>
              Close
            </div>
          </div>
        )}
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
            <div className={styles.inBoxButton} onClick={handleUpload}>
              Upload MP4
            </div>
            <input
              type="file"
              id="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className={styles.inBoxButton} onClick={close}>
              Close
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
