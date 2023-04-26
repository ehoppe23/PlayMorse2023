import React, { forwardRef, useState, useImperativeHandle } from 'react';
import '../App.css';
import buttons from '../Components/Assets/Images/buttons.png'
import { Link } from 'react-router-dom';
/*
* GettingStarted.js
* The instructions page found by clicking in the nav bar
*/

const GettingStarted = forwardRef((props, ref) => {
  const [backgroundColor, setBackgroundColor] = useState(() => '#e8e8e8');
  const [fontColor, setFontColor] = useState(() => 'black');
  useImperativeHandle(
    ref,
    () => ({
      update() {
        setBackgroundColor('#e8e8e8');
        setFontColor('black');
      }
    }),
  )
  return (
    <div style={{
      position: 'relative',
      marginTop: '-3vh',
      height: '90vh',
      width: '100vw',
      color: fontColor,

    }}>
      <h1 style={{ fontWeight: 900, fontSize: "50px", paddingTop: '3%' }}>Instructions and Game Descriptions</h1>

      <h2 style={{ fontWeight: 900, fontSize: "40px", textAlign: "left", paddingLeft: "10vw" }}>Recommendations:</h2>
      <h2 style={{ fontWeight: 900, fontSize: "30px", textAlign: "left", paddingLeft: "10vw" }}>Browser Choice and Screen Size:</h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}> While any computer can be used to access PlayMorse.com,
       visual bugs (such as overlapping text) may arise while playing on small laptops or with certain browsers such as Safari. For the best play experience, we recommend a desktop computer and the Chrome browser.
       Site visuals will malfunction greatly on tablet and phone sized screens.
      </p>


      <h2 style={{ fontWeight: 900, fontSize: "40px", textAlign: "left", paddingLeft: "10vw" }}>How to type with Morse on this Website:</h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }} >Morse code uses a combination of 'dots' and 'dashes' to create letters
            and numbers. Click here for a <a href="https://cvision.org/wp-content/uploads/2021/02/Morse-Code-Guide.pdf" target="_blank">PDF of a Morse code guide.</a></p>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>There are 3 possible ways to input the 'dot' and 'dash' on this website: the mouse, the space and enter keys, or a switch device.</p>

      <br></br>
      <h2 style={{ fontWeight: 900, fontSize: "30px", textAlign: "left", paddingLeft: "10vw" }}>Using a Keyboard:</h2>


      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>Dot and dash are activated by <b>keyboard keys:</b></p>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>Space = 'dot'</p>
      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>Enter = 'dash'</p>

      <br></br>
      <h2 style={{ fontweight: 900, fontSize: "30px", textAlign: "Left", paddingLeft: "10vw" }}>Using a Mouse:</h2>
      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>Simply click on the 'dot' and 'dash' on the screen in each activity.</p>


      <br></br>
      <h2 style={{ fontWeight: 900, fontSize: "30px", textAlign: "left", paddingLeft: "10vw" }}>Using Switches:</h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>Like using a keyboard, you will use the 'space' and 'enter' keys to
        type 'dot' and 'dash'.</p>


      <p style={{ textAlign: "left", paddingLeft: "10vw", paddingRight: "10vw", fontSize: "25px" }}>
        You will need a <b>switch interface</b> that can produce keyboard command to use
          switches. If you have a switch interface and 2 switches, set
          your switch interface keyboard commands to 'space' and 'enter'.
        </p>



      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "Left", fontSize: "25px" }}>If you are using the left and right sides of the body for switch placement, place
      the 'space' switch (dot) on the left, and the 'enter' switch (dash) on the right.  This placement will visually match how the 'dot' and 'dash' are displayed on the
        screen.
        </p>


    

      <img src={buttons} alt="Photo of dot and dash buttons" id="buttonsimage" width="60%"></img>

      

      <br></br>
      <br></br>
      <h2 style={{ fontweight: 900, fontSize: "40px", textAlign: "Left", paddingLeft: "10vw" }}>Customizing your Settings:</h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>Each person may do better with different color combinations, font sizes,
        volume, or speeds so our settings page let you customize: </p>

      <ol style={{ paddingLeft: "10vw", paddingRight: "15vw", textAlign: "left", fontSize: "25px" }}>
        <li>The color of the background, buttons, and text</li>
        <li>The size of text</li>
        <li>The sound level (Game Volume)</li>
        <li>How quickly the switches or keys need to be hit to make a letter (Game Speed)</li>
      </ol>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>The settings page may be accessed at any time by clicking the gear icon in the top right corner labeled 'settings'. </p>

      <br></br>
      <h2 style={{ fontweight: 900, fontSize: "40px", textAlign: "left", paddingLeft: "10vw",  color: "#193f78" }}>Descriptions of the Games</h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>In most activities, you can choose to include Morse code prompts (visual cues for correct Morse combination) 
        or turn them off to make the activity more challenging after you have practiced for a while. In some activities you can choose to ‘scramble’ the order of the letters.</p>

      <br></br>
      <h2 style={{ fontweight: 600, color: "#193f78", textAlign: "Left", paddingLeft: "10vw", fontSize: "30px" }}>Learn Morse Basics:</h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}><b>'Explore Dot & Dash'</b> gives a player opportunities to discover how to make a 'dot' and 'dash' using a keyboard or switches. This is a good place to start to learn how switches (or keystrokes) work on this website.</p>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}><b>'Dot' </b> and <b>'Dash'</b> games allow you to focus on letters that have only dots in their pattern or only dashes. This may be helpful if you need to focus on using one switch at a time.</p>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}> <b>'1 – 2 Hits'</b> only asks for letters that use either one or two switch hits (activations). This is helpful for beginners since the Morse patterns are simpler and can be more accessible if performing multiple switch hits is challenging.</p>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}><b>'3 Hits' </b> and <b>'4 Hits' </b> prompts the user to enter three or four Morse clicks to practice typing longer letters. </p>


    
      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}><b>'Learn Morse Patterns'</b> includes the entire alphabet but presents the letters in order of Morse pattern complexity. It starts with the simplest Morse patterns (example, one 'dot' to make the letter E) and progresses through more complex patterns (up to 4 switch hits).</p>

      <br></br>
      <h2 style={{ fontweight: 900, color: "#193f78", fontSize: "30px", textAlign: "left", paddingLeft: "10vw" }}>Learn Letters:</h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}><b>'Learn Morse Alphabet'</b> and <b>'Learn Morse Numbers'</b> each walks a player
        through using Morse code to type the whole alphabet or numbers 0-9.</p>


      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", fontSize: "25px", textAlign: "left" }}> <b>'Sandbox Letters'</b> lets you explore making any 'dot' and 'dash' combinations to see what letter you type. There are no target letters to produce, only experimentation! <b>'Burger Stack'</b> in the Themed Games category offers similar gameplay, but adds to a burger visual with every letter typed.</p>


      <br></br>
      <h2 style={{ fontweight: 900, color: "#193f78", fontSize: "30px", textAlign: "left", paddingLeft: "10vw" }}>Learn Morse Words: </h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", fontSize: "25px", textAlign: "left" }}>The <b>'Learn Morse Words'</b> category introduces a player using Morse code to type whole words. You can choose to type just the first letter of a word or the entire word, with or without Morse prompts, respectively with each game you choose. </p>


      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", fontSize: "25px", textAlign: "left" }}> <b>'Sandbox Words'</b> lets you explore making any 'dot' and 'dash' combinations to see what word you type. There are no target words to produce, only experimentation!</p>

      <br></br>
      <h2 style={{ fontweight: 900, color: "#193f78", fontSize: "30px", textAlign: "left", paddingLeft: "10vw" }}>Themed Games:</h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", fontSize: "25px", textAlign: "left" }}> <b>'Alphabet Race Game'</b> presents randomized letters that need to be entered with the correct Morse pattern before the letter crossed the screen. This is for an advanced player since there are no prompts and it has a timed element!</p>
     
      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", fontSize: "25px", textAlign: "left" }}> <b>'Burger Stack'</b> lets you explore 'dot' and 'dash combinations to make any letter to add a piece to the hamburger. There are no target letters, just experimentation.</p>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", fontSize: "25px", textAlign: "left" }}> <b>'Adventure Game'</b> allows the user to learn how to type words by exploring the world around them. They type what they see (with helper prompts in the image captions) and collect all their friends!</p>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", fontSize: "25px", textAlign: "left" }}> <b>'Alphabet Clearout'</b> challenges the user to type every Morse letter and clear the entire alphabet!</p>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", fontSize: "25px", textAlign: "left" }}> <b>'Simon Says'</b> plays visual and audio Morse code that the user copies to defeat the monsters on screen. While the monsters provide a fun visual, this game is suitable for visually impaired users as they can mimic the Morse sounds without needing to see the screen.</p>

      <Link className='nav-link' to="/" style={{
        backgroundColor: backgroundColor
      }}>
        <button style={{
          width: '40vw',
          fontSize: '5vh',
          fontWeight: 900,
          userSelect: 'none',
          cursor: 'pointer',
          marginBottom: "5vh",
          backgroundColor: 'white'
        }}>Go Back to Home</button>
      </Link>
    </div>
  );
})

export default GettingStarted;