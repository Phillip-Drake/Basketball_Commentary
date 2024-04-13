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
          User : {user}
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
      <body>
    <div class = "flex-body">
        <div class = "content-left">
            <div class = "input-box">
              <img src = "src/logo.png"></img>

              <div class = "input-title">
                Input Player 1 Name
              </div>
              <textarea class = "text-input" rows="1">
                
              </textarea>
              <div class = "input-title">
                Input Player 2 Name
              </div>
              <textarea class = "text-input" rows="1">
                
              </textarea>
              <label for = "file_upload" class = "button">
                  <p>
                    Upload video  
                  </p>
              </label>
              <input id = "file_upload" type="file" onchange = "acceptInput()" accept = ".mp4"></input>
              <div id = "submit-video" class = "button submit-video">
                <p>
                  Submit Video
                </p>
              </div>
            </div>
        </div>
        <div class = "content-right">
          <div class = "video-box">
            <div class = "input-title">
              Phillip vs Taylor
            </div>
            <video controls>
              <source  src="src/video.mp4" type="video/mp4"></source>
             </video>
             <div class = "scoreboard">
              <div class = "scoreboardNumberone">
                5
              </div>
              <div class = "scoreboardNumbertwo">
                6
              </div>
             </div>
             <div class = "info-button" onclick="showScores()">
              <svg fill="#fffafa"  height="2.3rem" width="2.3rem" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 512 512" xml:space="preserve">
                <g>
                  <g>
                    <path d="M501.801,15.557H10.199C4.566,15.557,0,20.123,0,25.756v309.066c0,5.633,4.566,10.199,10.199,10.199h35.435v141.222
                      c0,5.633,4.566,10.199,10.199,10.199s10.199-4.566,10.199-10.199V446.66h379.936v39.584c0,5.633,4.566,10.199,10.199,10.199
                      c5.633,0,10.199-4.566,10.199-10.199V345.022h35.434c5.633,0,10.199-4.566,10.199-10.199V25.756
                      C512,20.123,507.434,15.557,501.801,15.557z M445.968,426.262h-0.001H66.033v-31.458h301.978c5.633,0,10.199-4.566,10.199-10.199
                      c0-5.633-4.566-10.199-10.199-10.199H66.033v-29.384h379.936V426.262z M491.602,324.623H20.398V35.955h471.203V324.623z"/>
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M415.719,374.406h-8.297c-5.633,0-10.199,4.566-10.199,10.199c0,5.633,4.566,10.199,10.199,10.199h8.297
                      c5.633,0,10.199-4.566,10.199-10.199C425.918,378.972,421.352,374.406,415.719,374.406z"/>
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M203.398,70H95.4c-5.633,0-10.199,4.566-10.199,10.199v200.18c0,5.633,4.566,10.199,10.199,10.199h107.997
                      c5.633,0,10.199-4.566,10.199-10.199V80.199C213.597,74.566,209.031,70,203.398,70z M193.198,270.18h-87.599v-79.692h87.599
                      V270.18z M193.198,170.09h-87.599V90.399h87.599V170.09z"/>
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M416.6,70H308.602c-5.633,0-10.199,4.566-10.199,10.199v200.18c0,5.633,4.566,10.199,10.199,10.199H416.6
                      c5.633,0,10.199-4.566,10.199-10.199V80.199C426.799,74.566,422.233,70,416.6,70z M406.401,270.18h-87.599v-79.692h87.599V270.18z
                      M406.401,170.09h-87.599V90.399h87.599V170.09z"/>
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M256,109.574c-5.633,0-10.199,4.566-10.199,10.199v11.172c0,5.633,4.566,10.199,10.199,10.199
                      c5.633,0,10.199-4.566,10.199-10.199v-11.172C266.199,114.14,261.633,109.574,256,109.574z"/>
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M256,215.71c-5.633,0-10.199,4.566-10.199,10.199v11.172c0,5.633,4.566,10.199,10.199,10.199
                      c5.633,0,10.199-4.566,10.199-10.199v-11.172C266.199,220.276,261.633,215.71,256,215.71z"/>
                  </g>
                </g>
                </svg>
            </div>
          </div>
          
        </div>
        
    </div>
    <div id="canvas">
      
    </div>
  </body>
    )
  }
}
