/* 
Alphabet Clearout
Main game file - in progress

@Author: Emily Hoppe, Natalie Tashchuk
Created: 1/__/23
Updated: 1/__/23, 2/3/23
*/

import React, { useState, forwardRef, useImperativeHandle} from 'react';
import '../../App.css';
import {morseToChar} from "./charMorseConv";
import useSound from 'use-sound';
import dashSound from '../Assets/Sounds/dash.mp3'
import dotSound from '../Assets/Sounds/dot.mp3'
import {animated, useSpring} from 'react-spring';
import {initial, Buttons, ButtonsWithoutInput, resetInputTime, resetInputLength, BackButton} from "./Common/Functions";
import spacebar from "../Assets/Images/spacebar.png";
import enterButton from "../Assets/Images/enterButton.png";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Transition} from "react-spring/renderprops";
import Card from "@material-ui/core/Card";
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom";
//confetti based on this example: https://www.npmjs.com/package/react-confetti
import Confetti from "react-confetti";
//ran this command: npm install react-confetti

var textIndex = 0;


//For tutorial mode (probably)
function updateTutorial() {
    var space = document.getElementById('spaceImage');
    var enter = document.getElementById('enterImage');

    if (textIndex === 0) {
        document.getElementById('tutorialText').innerHTML = 'This game consists of two buttons at the bottom of the page.';

        textIndex++;
    } else if (textIndex === 1) {
        document.getElementById('tutorialText').innerHTML = 'This button is used for the dots and can be accessed through the space button or by clicking here!';
        document.getElementById('dotButton').style.backgroundColor = "yellow";
        space.style.display = "block";
        textIndex++;
    } else if (textIndex === 2) {
        document.getElementById('dotButton').style.backgroundColor = document.getElementById('dashButton').style.backgroundColor;
        document.getElementById('tutorialText').innerHTML = 'This button is used for the dashes and can be accessed through the enter button or by clicking here!';
        document.getElementById('dashButton').style.backgroundColor = "yellow";
        space.style.display = "none";
        enter.style.display = "block";
        textIndex++;
    } else if (textIndex === 3) {
        document.getElementById('dashButton').style.backgroundColor = document.getElementById('dotButton').style.backgroundColor;
        document.getElementById('tutorialText').innerHTML = 'Enter any Morse code and see what letter or number it is!';
        //document.getElementById('sampleMorse').style.backgroundColor = "yellow";
        enter.style.display = "none";
        textIndex = 0;
    }
}

var t;
//Ids of HTML elements to make letters visible/invisible
var alphabetIds = ['letterA','letterB','letterC','letterD','letterE','letterF','letterG','letterH','letterI','letterJ', 'letterK','letterL','letterM','letterN','letterO','letterP','letterQ','letterR','letterS','letterT','letterU','letterV','letterW','letterX','letterY','letterZ']
var alphabetDone =  new Array(26).fill(false);
//helper function to turn typed input into an ID
function getLetID(letter){
    if(letter == ' '){
         return ' ';
        }
   var asciiCode = letter.charCodeAt(0); //find ASCII
    if(asciiCode >= 65 && asciiCode <= 90 && !alphabetDone[asciiCode-65]){
        alphabetDone[asciiCode-65] = true; //add to completed letters
        return alphabetIds[asciiCode-65];
    } else {
        return ' '; 
    }
}


//Main function - returns the html that is the webpage
const towerStack = forwardRef((props, ref) => {
    
    //when back button is pushed, return to previous page
    const history = useHistory();
    function backToGames() {
        history.push("/GamesThemes");
    }

   //Manage how many letters have already been cleared by the user
   var [lettersCleared, setLettersCleared] = useState(0); //Use state resets on page out automatically
   var lettersLeft = 26 - lettersCleared;
   var [input, setInput] = React.useState('');  //reads input in morse
   var output = morseToChar(input);  //converts morse into char


    //setup stuff:
    const [volume, setVolume] = useState(() => initial('volume'));
    const [size, setSize] = useState(() => initial('size'));
    const [speed, setSpeed] = useState(() => initial('speed'));
    const [backgroundColor, setBackgroundColor] = useState(() => initial('backgroundColor'));
    const [buttonColor, setButtonColor] = useState(() => initial('buttonColor'));
    const [dashButtonColor, setDashButtonColor] = useState(() => initial('dashButtonColor'));
    const [dotButtonColor, setDotButtonColor] = useState(() => initial('dotButtonColor'));
    const [fontColor, setFontColor] = useState(() => initial('fontColor'));
    const resetTimer = speed * 1000; //reset timer in milliseconds
    const [playDash] = useSound(
        dashSound,
        { volume: volume / 100 }
    );
    const [playDot] = useSound(
        dotSound,
        { volume: volume / 100 }
    );
    const tfSize = (size - 7) + "vh"; //slightly smaller for sake of tower
    const sfSize = size / 2.5 + 'vh';  //size comes from settings page value
    var [startScreen, setStartScreen] = useState(true);
    var [endScreen, setEndScreen] = useState(false); //main burger completion

    //Custom Timeout
    //adapted from sandboxWords
    clearTimeout(t);
    t = setTimeout(function(){ //resets on page out (found example in 1,2 hit)
        var letID = getLetID(output);
        if(letID != ' '){ //only valid morse LETTERS
            document.getElementById(letID).style.visibility = "hidden"; //make element invisible
            setLettersCleared(prevState => prevState + 1); //update completed letters
        }
        setInput(''); //reset morse input
        if(lettersCleared == 26){
            setEndScreen(true); //trigger endscreen visuals
        }
    }, resetTimer);

    resetInputLength(input, setInput);

    const [handleKeyDown, setHandleKeyDown] = useState(true);
    document.onkeydown = function (evt) {
        if (!handleKeyDown) return; //
        setHandleKeyDown(false); //
        evt = evt || window.event;
        if (evt.keyCode === 32) { //press space
            if (startScreen) {
                for (let i = 0; i < alphabetIds.length; i++){ //reset grid visuals
                    document.getElementById(alphabetIds[i]).style.visibility = "visible";
                    alphabetDone[i] = false;
                }
                setStartScreen(false);
            } else if (endScreen ) {
                setEndScreen(false); //exit end screen
                alphabetDone =  new Array(26).fill(false); //clear letter tracking
                setLettersCleared(0); //reset tower
                for (let i = 0; i < alphabetIds.length; i++){ //reset grid visuals
                    document.getElementById(alphabetIds[i]).style.visibility = "visible";
                    alphabetDone[i] = false;
                }
            } else {
                setInput(input + '•');
                playDot();
                document.getElementById('dotButton').focus();
            }

        } else if (evt.keyCode === 13) { //press enter
            if (startScreen) { //generalized so both keys start game
                for (let i = 0; i < alphabetIds.length; i++){ //reset grid visuals
                    document.getElementById(alphabetIds[i]).style.visibility = "visible";
                    alphabetDone[i] = false;
                }
                setStartScreen(false);
            } else if (endScreen ) {
                setEndScreen(false); //exit end screen
                alphabetDone =  new Array(26).fill(false); //clear letter tracking
                setLettersCleared(0); //reset tower
                for (let i = 0; i < alphabetIds.length; i++){ //reset grid visuals
                    document.getElementById(alphabetIds[i]).style.visibility = "visible";
                    alphabetDone[i] = false;
                }
            } else {
                setInput(input + '-');
                playDash();
                document.getElementById('dashButton').focus();
            }
        }
    };

    document.onkeyup = function (evt) { //
        setHandleKeyDown(true); //
        document.activeElement.blur(); //
    }; //

    useImperativeHandle(
        ref,
        () => ({
            update() {
                setVolume(initial('volume'));
                setSize(initial('size'));
                setSpeed(initial('speed'));
                setBackgroundColor(initial('backgroundColor'));
                setDashButtonColor(initial('dashButtonColor'));
                setDotButtonColor(initial('dotButtonColor'));
                setFontColor(initial('fontColor'));
                setButtonColor(initial("buttonColor"));
            }
        }),
    )
    
    //for confetti
    const width = 2000;
    const height = 1000;

    return (
        
        <div style={{
            backgroundColor: backgroundColor,
            height: '90vh',
            width: '100vw',
            display: 'grid',
            gridTemplate: '8fr 8fr / 1fr',
            gridTemplateAreas: '"top" "middle" "bottom'
        }}>
            <Transition //code is originally from sandbox letters, but it's a good model for adding screens
                items={startScreen} //which screen is it
                duration={500}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}>
                {toggle =>
                    toggle
                        ? props => <div style={{
                            position: 'absolute',
                            width: '100vw',
                            height: '90vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1, //controlls how forward it is on the display
                            ...props
                        }}>
                            <div id='startmenu' style={{ //visuals
                                //this div is the starting text that introduces the game
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'black',
                                opacity: 0.7
                            }} />
                        
                            <Grid container direction='column' justify='center' alignItems='center' style={{ height: '100%', width: '100%', zIndex: 1 }}>
                                <Grid item style={{ userSelect: 'none', cursor: 'default' }}>
                                    <Card>
                                        <h1 style={{
                                            //title of game
                                            marginBottom: '0vh',
                                            fontSize: '8vh'
                                        }}>Alphabet Clearout!
                                        </h1>
                                        <br />
                                        <p style={{
                                            //game instructions
                                            marginTop: '0vh',
                                            paddingLeft: '2vw',
                                            paddingRight: '2vw',
                                            fontSize: '4vh'
                                        }}>Type the Morse code for each letter on the screen until you've cleared them all.
                                        </p>
                                    </Card>
                                </Grid>
                                <br />
                                <Grid item style={{ userSelect: 'none' }}>
                                    <Card>
                                        <button id = "start" style={{ fontSize: '8vh', height: '100%', width: '100%', cursor: 'pointer' }}
                                                //start button 
                                                onMouseDown={function () { //if the user clicks with the mouse instead of space/enter
                                                    for (let i = 0; i < alphabetIds.length; i++){ //reset grid visuals
                                                        document.getElementById(alphabetIds[i]).style.visibility = "visible";
                                                        alphabetDone[i] = false;
                                                    }
                                                    if (startScreen) {
                                                        setStartScreen(false);
                                                    }
                                                }}>
                                            Press Enter ('dash') to Start
                                        </button>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                        : props => <div />
                }

            </Transition>
            <Transition 
                items={endScreen /* EndScreen - burger finished */}
                duration={500}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}>
                {toggle =>
                    toggle
                        ? props => <div style={{
                            position: 'absolute',
                            width: '100vw',
                            height: '90vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 10,
                            ...props
                        }}>
                            <div style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'black',
                                opacity: 0.7
                            }} />
                            <Grid container direction='column' justify='center' alignItems='center' style={{ height: '100%', width: '100%', zIndex: 10 }}>
                                 <Confetti width={width} height={height}/>
                                <Grid item style={{ userSelect: 'none', cursor: 'default', zIndex:10}}>
                                    <Card>
                                        <h1 style={{
                                            marginBottom: '0vh',
                                            fontSize: '8vh',
                                            zIndex: '10'
                                        }}>You cleared the whole alphabet!
                                        </h1>
                                        <br></br>
                                    </Card>
                                </Grid>
                                <br />
                                <Grid item style={{ userSelect: 'none' }}>
                                    <Card>
                                        <button id = "end" style={{ fontSize: '8vh', height: '100%', width: '100%', cursor: 'pointer' }}
                                                onMouseDown={function () { //same code as space/enter
                                                    if (endScreen) {       
                                                        alphabetDone =  new Array(26).fill(false); //clear letter tracking
                                                        setLettersCleared(0); //reset tower
                                                        for (let i = 0; i < alphabetIds.length; i++){ //reset grid visuals
                                                            document.getElementById(alphabetIds[i]).style.visibility = "visible";
                                                            alphabetDone[i] = false;
                                                        }
                                                        setEndScreen(false);
                                                    }
                                                }}>
                                            Press Enter ('dash') to continue
                                        </button>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                        : props => <div />
                }
            </Transition>
            <div style={{gridArea: 'top'}}>
                <div style={{ position: 'absolute' }}>
                    <Container>
                        <Grid container  
                        justify="left">
                            <Grid item>
                                <Link className='nav-link' to="/GamesThemes">
                                    <button style={{
                                        //back button
                                        height: '90%',
                                        width: '100%',
                                        fontSize: '4vh',
                                        fontWeight: 800,
                                        userSelect: 'none',
                                        cursor: 'pointer',
                                        marginBottom: "20px"
                                    }}>Back</button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Container>
                </div>


                <Grid container justify-content='center' position= 'relative' alignItems='center' style={{ height: '25%', width: '100%', zIndex: 2, paddingBottom: '1%' }}>
                    <animated.h1 id = "output" style={{ //Display Letter
                        //determine where current letter should display on screen
                        lineHeight: 0,
                        right: '50%',
                        top: '10%',
                        transform: 'translate(50%,50%)',
                        position: 'absolute',
                        color: 'fontColor',
                        fontSize: tfSize //smaller font slightly for tower  
                    }}>{output} </animated.h1>

                    <animated.h1 id="input" position= 'relative' style={{ //Display Morse
                        //determines where current morse input should display on screen
                        lineHeight: 0,
                        color: 'fontColor',
                        fontSize: sfSize,
                        right: '50%',
                        top: '27%',
                        transform: 'translate(50%,50%)',
                        position: 'absolute'
                    }}>{input}</animated.h1>
                    </Grid>

               

                <animated.h1 id="testing" style={{ //Test element to see internal functions
                        //displays # of letters successfully cleared
                        lineHeight: 0,
                        color: fontColor,
                        fontSize: sfSize + 10,
                        paddingRight: '79%',
                        
                        //display: 'none' //comment out to use
                    }}>{'Done: ' + lettersCleared + '\t\tLeft: ' + lettersLeft}</animated.h1>

                    
               
                
                
                <Grid container direction='row'  position= 'relative' style={{ zIndex: 3, display: 'flex', justifyContent: 'center', alignItems: 'right', paddingTop: '1%', paddingBottom: '-10%'}}>
                    
                    <animated.h1 id="letterA" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'A'}</animated.h1>
                    <animated.h1 id="letterB" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'B'}</animated.h1>
                    <animated.h1 id="letterC" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'C'}</animated.h1>
                    <animated.h1 id="letterD" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'D'}</animated.h1>
                    <animated.h1 id="letterE" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'E'}</animated.h1>
                    <animated.h1 id="letterF" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'F'}</animated.h1>
                    <animated.h1 id="letterG" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'G'}</animated.h1>
                    <animated.h1 id="letterH" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'H'}</animated.h1>
                    <animated.h1 id="letterI" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'I'}</animated.h1>
                 
                 </Grid> 
                    <Grid container direction='row'  position= 'relative' style={{ zIndex: 3, display: 'flex', justifyContent: 'center', alignItems: 'right'}}>
                    <animated.h1 id="letterJ" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'J'}</animated.h1>
                    <animated.h1 id="letterK" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'K'}</animated.h1>
                    <animated.h1 id="letterL" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'L'}</animated.h1>
                    <animated.h1 id="letterM" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'M'}</animated.h1>
                    <animated.h1 id="letterN" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'N'}</animated.h1>
                    <animated.h1 id="letterO" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'O'}</animated.h1>
                    <animated.h1 id="letterP" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'P'}</animated.h1>
                    <animated.h1 id="letterQ" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'Q'}</animated.h1>
                    <animated.h1 id="letterR" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'R'}</animated.h1>
                    
                </Grid>
                <Grid container direction='row'  position= 'relative' style={{ zIndex: 3, display: 'flex', justifyContent: 'center', alignItems: 'right',}}>
                    
                    <animated.h1 id="letterS" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'S'}</animated.h1>
                    <animated.h1 id="letterT" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'T'}</animated.h1>
                    <animated.h1 id="letterU" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'U'}</animated.h1>
                    <animated.h1 id="letterV" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'V'}</animated.h1>
                    <animated.h1 id="letterW" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'W'}</animated.h1>
                    <animated.h1 id="letterX" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'X'}</animated.h1>
                    <animated.h1 id="letterY" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'Y'}</animated.h1>
                    <animated.h1 id="letterZ" style={{ lineHeight: 0,color: fontColor, fontSize: sfSize,}}>{'Z'}</animated.h1>

                </Grid>

                <div>

                    <animated.h1 id = "output" style={{ //HIDDEN display of character (when you remove these stuff breaks)
                        //Hid all three of these to create space
                        lineHeight: 0,
                        color: fontColor,
                        fontSize: tfSize, //smaller font slightly for tower 
                        minHeight: '90%',
                        display: 'none',
                    }}>{output}</animated.h1>

                    <animated.h1 id="input" style={{ //HIDDEN display of morse input
                        //an attempt to reorganize the screen to get space 
                        lineHeight: 0,
                        color: fontColor,
                        fontSize: sfSize,
                        display: 'none'
                    }}>{input}</animated.h1>
                </div>
                <div>
                  
                </div>
            </div>
            <ButtonsWithoutInput
                fontColor={fontColor}
                backgroundColor={backgroundColor}
                buttonColor={buttonColor}
                dotButtonColor={dotButtonColor}
                dashButtonColor={dashButtonColor}
                volume={volume}
                input={input}
                setInput={setInput}
            />

        </div>
        
    );
})

const Radio = () => {
    const [isToggled, setToggle] = useState(false);
    const menubg = useSpring({ background: isToggled ? "#6ce2ff" : "#ebebeb" });
    const { y } = useSpring({
        y: isToggled ? 180 : 0
    });
    const menuAppear = useSpring({
        transform: isToggled ? "translate3D(0,0,0)" : "translate3D(0,-40px,0)",
        opacity: isToggled ? 1 : 0
    });

    return (
        <div style={{ position: "relative", width: "300px", margin: "0 auto" }}>
            <animated.button
                style={menubg}
                className="radiowrapper"
                onClick={() => setToggle(!isToggled)}
            >
                <div className="radio">
                    <p>Tutorial</p>
                    <animated.p
                        style={{
                            transform: y.interpolate(y => `rotateX(${y}deg)`)
                        }}
                    >
                        ▼
                    </animated.p>
                </div>
            </animated.button>
            <animated.div style={menuAppear}>
                {isToggled ? <RadioContent /> : null}
            </animated.div>
        </div>
    );
};

const RadioContent = () => {
    return (
        <div className="radiocontent" >
            <a href="#" alt="Home">
            </a>
            <p id="tutorialText" value="Change Text">Welcome to the Alphabet Clearout game!</p>
            <img src={spacebar} alt="Spacebar" id="spaceImage" style={{ display: "none" }}></img>
            <img src={enterButton} alt="Enter Button" id="enterImage" style={{ display: "none" }}></img>
            <button onClick={function () {
                updateTutorial();
            }} style={{ fontSize: '5vh' }}>Next</button>
        </div>
    );
};


export default towerStack;