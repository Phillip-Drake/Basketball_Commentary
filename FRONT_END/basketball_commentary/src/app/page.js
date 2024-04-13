'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Popup from "reactjs-popup"
import { useState } from 'react';
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.logoWrapper}>
        <div className={styles.logo}>Hooper ai</div>
        <div className={styles.description}>A Basketball Commentary Solution</div>
      </div>

      <PopupButton>
        Get Started
      </PopupButton>
    </main>
  );
}

//const [isButtonClicked, setIsButtonClicked] = useState(False);  
export function PopupButton({children}){
  const [mode, setMode] = useState(0);
  function handleClick() {
    alert(mode);
  }
  function button(){
    return <div className = {styles.button} onClick={handleClick}>
        {children}
    </div>
  }
  function loginFlow(){
    setMode(1);
  }
  function guestFlow(){
    setMode(2);
  }

  if(mode == 0){
    return (
      <Popup trigger={button}modal nested>
                {
                    close => 
                      
                      (
                        <div className={styles.initialPopup}>
                            <div className = {styles.inBoxButton} onClick={loginFlow}>
                                Login
                            </div>
                            <div className = {styles.inBoxButton} onClick={guestFlow}>
                                Guest
                            </div>
                            <div className = {styles.inBoxButton} onClick={close}>
                                Close
                            </div>
                        </div>
                      )
                }
            </Popup>
    );
  } else if (mode == 1){ //LOGIN FLOW
    return (
      <Popup trigger={button} modal nested>
                {
                    close => 
                      
                      (<div className = {styles.initialPopup}>
                          <div className = {styles.guestFlowTopBox}>
                            <div className = {styles.guestFlowColumn}>
                                Test1
                            </div>
                            <div className = {styles.guestFlowColumn}>
                              Test2
                            </div>
                          </div>
                          <div className = {styles.inBoxButton} onClick={close}>
                                Close
                          </div>
                        </div>
                      )
                }
            </Popup>
    );
  } else if(mode == 2){
    return (
      <Popup trigger={button} modal nested>
                {
                    close => 
                      
                      (
                        <div className = {styles.initialPopup}>
                          <div className = {styles.guestFlowTopBox}>
                            <div className = {styles.guestFlowColumn}>
                              <p className = {styles.nameInputLabel}>Player 1 Name</p>
                              <textarea class = {styles.nameInput} rows="1" hint = "Player 1 Name"/>
                            </div>
                            <div className = {styles.guestFlowColumn}>
                              <p className = {styles.nameInputLabel}>Player 2 Name</p>
                              <textarea class = {styles.nameInput} rows="1"/>
                            </div>
                          </div>
                          <div className = {styles.inBoxButton} onClick={close}>
                                Upload MP4
                          </div>
                          <div className = {styles.inBoxButton} onClick={close}>
                                Close
                          </div>
                        </div>
                      )
                }
            </Popup>
    );
  }
}

export function InBoxButton({children}){
  function handleClick() {
  }
  return <div className = {styles.inBoxButton} onClick={handleClick}>
        {children}
    </div>
}

export function inputBox({children}){

  return (
    <textarea rows="4" cols="50"/>
  )
}
