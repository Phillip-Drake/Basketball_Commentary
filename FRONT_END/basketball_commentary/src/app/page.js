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
  } else{
    return (
      <Popup trigger={button} modal nested>
                {
                    close => 
                      
                      (
                        <div className={styles.initialPopup}>
                            <InBoxButton onclick={loginFlow}>
                              NotLogin
                            </InBoxButton>
                            <InBoxButton onclick={guestFlow}>
                              Guest
                            </InBoxButton>
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
