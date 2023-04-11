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
      <h1 style={{ fontWeight: 900, fontSize: "50px", paddingTop: '20px' }}>Typing with Morse on this Website</h1>

      <h2 style={{ fontWeight: 900, fontSize: "30px", textAlign: "left", paddingLeft: "10vw" }}>How to type with Morse on this Website:</h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }} >Morse code is made up of a combination of 'dots' and 'dashes' to create letters
            and numbers. Click here for a <a href="https://cvision.org/wp-content/uploads/2021/02/Morse-Code-Guide.pdf" target="_blank">PDF of a Morse code guide.</a></p>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>On this website, each activity requires you to type a 'dot or 'dash' using a keyboard,
        switches, or a mouse.</p>

      <h2 style={{ fontWeight: 900, fontSize: "30px", textAlign: "left", paddingLeft: "10vw" }}>Using a Keyboard:</h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>Dot and dash are activated by <b>keyboard keys:</b></p>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>Space = 'dot'</p>
      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>Enter = 'dash'</p>

      <h2 style={{ fontWeight: 900, fontSize: "30px", textAlign: "left", paddingLeft: "10vw" }}>Using Switches:</h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>Like using a keyboard, you will use the 'space' and 'enter' keys to
        type 'dot' and 'dash'.</p>


      <p style={{ textAlign: "left", paddingLeft: "10vw", paddingRight: "10vw", fontSize: "25px" }}>
        You will need a <b>switch interface</b> that can produce keyboard command to use
          switches. If you have a switch interface and 2 switches, set
          your switch interface keyboard commands to 'space' and 'enter'.
        </p>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>If you are using left and right sides of the body for swich placement,
        place the switches like this:</p>


      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "Left", fontSize: "25px" }}>If you are using left and right sides of the body for switch placement, place
      the switches like this:
        </p>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>'space' (dot) - Left side</p>
      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>'enter' (dash) - Right side</p>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>
        This placement will visually match how the 'dot' and 'dash' are placed on the
        screen.
        </p>

      <img src={buttons} alt="Photo of dot and dash buttons" id="buttonsimage" width="60%"></img>

      <h2 style={{ fontweight: 900, fontSize: "40px", textAlign: "Left", paddingLeft: "10vw" }}>Using a Mouse:</h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>Simply click on the 'dot' and 'dash' on the screen in each activity.</p>

      <h2 style={{ fontweight: 900, fontSize: "40px", textAlign: "Left", paddingLeft: "10vw" }}>Settings:</h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>Each person may do better with different color combinations, font sizes,
        volume, or speeds so our settings let you customize: </p>

      <ol style={{ paddingLeft: "10vw", paddingRight: "15vw", textAlign: "left", fontSize: "25px" }}>
        <li>Color of background, buttons, and text</li>
        <li>Size of text</li>
        <li>Sound level (volume)</li>
        <li>How quickly switches or keys need to be hit to make a letter</li>
      </ol>

      <h2 style={{ fontweight: 900, fontSize: "40px", textAlign: "left", paddingLeft: "10vw" }}>Description of the Games</h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>In most activities, you can choose to include Morse code prompts (visual cues for correct Morse combination) 
        or turn them off to make the activity more challenging after you have practiced for a while. In some activities you can choose to ‘scramble’ the order of the letters.</p>

      <h2 style={{ fontweight: 600, color: "blue", textAlign: "Left", paddingLeft: "10vw", fontSize: "30px" }}>Learn Morse Basics:</h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>‘Explore Dot & Dash’ gives a player opportunities to discover how to make a ‘dot’ and ‘dash’ using a keyboard or switches. This is a good place to start to learn how switches (or keystrokes) work on this website.</p>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>‘Dot’ and ‘Dash’ games allow you to focus on letters that have only dots in their pattern or only dashes. This may be helpful if you need to focus on using one switch at a time.</p>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>‘1 – 2 Hits’ only asks for letters that use either one or two switch hits (activations). This is helpful for beginners since the Morse patterns are simpler and can be more accessible if performing multiple switch hits is challenging.</p>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>‘3 Hits’ and ‘4 Hits’ ask for letters that use three or four hits, accordingly.</p>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>‘Learn Morse Patterns’ includes the entire alphabet but presents the letters in order of Morse pattern complexity. It starts with the simplest Morse patterns (example, one ‘dot’ to make the letter E) and progresses through more complex patterns (up to 4 switch hits).</p>


      <h2 style={{ fontweight: 900, color: "blue", fontSize: "30px", textAlign: "left", paddingLeft: "10vw" }}>Learn Letters:</h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", textAlign: "left", fontSize: "25px" }}>'Learn the Alphabet' and 'Learn Numbers' each walks a player
        through using Morse code to type the whole alphabet or numbers 0-9.</p>


      <h2 style={{ fontweight: 900, color: "blue", fontSize: "30px", textAlign: "left", paddingLeft: "10vw" }}>Learn Words: </h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", fontSize: "25px", textAlign: "left" }}>‘Learn Words’ introduces a player to Morse code to type whole words. </p>


      <h2 style={{ fontweight: 900, color: "blue", fontSize: "30px", textAlign: "left", paddingLeft: "10vw" }}>Themed Games:</h2>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", fontSize: "25px", textAlign: "left" }}>Car Race Game presents randomized letters that need to be entered with the correct Morse pattern before the letter crossed the screen. This is for an advanced player since there are no prompts and it has a timed element!</p>

      <p style={{ paddingLeft: "10vw", paddingRight: "10vw", fontSize: "25px", textAlign: "left" }}>‘Sandbox’ games let you explore making any ‘dot’ and ‘dash’ combinations to see what letter or word you type. There are no target letters or words to produce, only experimentation!</p>


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