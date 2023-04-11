/* 
Adventure Game
Main game file - in progress
@Author: Aron
*/

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import '../../App.css';
import {morseToChar} from "./charMorseConv";
import useSound from 'use-sound';
import dashSound from '../Assets/Sounds/dash.mp3'
import dotSound from '../Assets/Sounds/dot.mp3'
import {initial, Buttons, ButtonsWithoutInput, resetInputTime, resetInputLength, BackButton} from "./Common/Functions";
import Grid from "@material-ui/core/Grid";
import {Transition} from "react-spring/renderprops";
import Card from "@material-ui/core/Card";
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom";

//Pictures Screen
import cabImage from "./adventureGamePics/Cab.jpg";
import InCabImage from "./adventureGamePics/InCab.png";
import barnImage from "./adventureGamePics/Barn.jpg";
import farmImage from "./adventureGamePics/Farm.png";
import forestImage from "./adventureGamePics/Forest.jpg";
import houseImage from "./adventureGamePics/House.jpg";
import oakImage from "./adventureGamePics/Oak.jpg";

//Pictures Objects
import pigImage from "./adventureGamePics/pig.png"
import farmerImage from "./adventureGamePics/farmer.png"
import girlFarmerImage from "./adventureGamePics/Mel.png"
import henImage from "./adventureGamePics/hen.png"
import owlImage from "./adventureGamePics/Owl.png"

var textIndex = 0;
var t;

function buttonClick (clicked, notClicked){
    document.getElementById(clicked).style.fontSize = '5vh';
    document.getElementById(clicked).style.backgroundColor = 'White';
    document.getElementById(clicked).style.outlineColor = 'Red';
    document.getElementById(notClicked).style.outlineColor = "Grey";
    document.getElementById(notClicked).style.fontSize = '4vh';
    document.getElementById(notClicked).style.backgroundColor = 'Grey';
}

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

const adventureGame = forwardRef((props, ref) => {
    //Lines 19-22 Just lets you go back to previous pages
    const history = useHistory();
    function backToGames() {
        history.push("/GamesThemes");
    }

    //Inputs
    var [input, setInput] = React.useState('');
    var output = morseToChar(input);

    //Variables
    const [backgroundPicture, setBackgroundPicture] = useState(cabImage);
    const [volume, setVolume] = useState(() => initial('volume'));
    const [speed, setSpeed] = useState(() => initial('speed'));
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

    function clearStage() {
        // setStartScreen(false);
        // setEndScreen(false);
        // setCabScreen(false);
        // setFarmScreen(false);
        // setHouseScreen(false);
        // setForestScreen(false);
        // setBarnScreen(false);

        setWord("");
    }

    function checkFinishedGame() {
        if(gemScore > 4) {
            if(!(currentScreen === "Cab")) {
                setHelperText("Great! We're all done. Let's head back to the Taxi (- " + '\xa0\xa0\xa0' + ".- " + '\xa0\xa0\xa0' + "-..- " + '\xa0\xa0\xa0' + "..)!")
            } else {
                setHelperText("Look's like we've invited everyone! Let's head Home (.... " + '\xa0\xa0\xa0' + " --- " + '\xa0\xa0\xa0' + " -- " + '\xa0\xa0\xa0' + " .)")
            }
        }
    }

    function resetGame() {
        setWord("");
        setGems(0);
        setEndScreen(false);
        setStartScreen(true);
        setBackgroundPicture(cabImage);
        document.getElementById("girlFarmerID").style.visibility = "hidden";
        document.getElementById("farmerID").style.visibility = "hidden";
        document.getElementById("pigID").style.visibility = "hidden";
        document.getElementById("henID").style.visibility = "hidden";
        document.getElementById("owlID").style.visibility = "hidden";
        pigFound(false);
        henFound(false);
        owlFound(false);
        melFound(false);
        tomFound(false);
        setHelperText("There's noone here,let's go into the Taxi (-" + '\xa0\xa0\xa0' + ".-" + '\xa0\xa0\xa0' + "-..-" + '\xa0\xa0\xa0' + "..)!");
    }
    
    function checkCurrentWord() {
        //Don't know why switch doesn't work but a bunch of if's do.
        { /* Locations */
            if(currentWord === "TEST") {
                setHelperText("I hope you know what you're doing!");
                setCurrentScreen("End");
                setBackgroundPicture();
                clearStage();
                setEndScreen(true);
            }
            if(currentWord === "CAB" || currentWord ==="TAXI") {
                setHelperText("Now, should we explore the farm (..-. " + '\xa0\xa0\xa0' + ".- " + '\xa0\xa0\xa0' + ".-." + '\xa0\xa0\xa0' + " --) or the trees (- " + '\xa0\xa0\xa0' + ".-." + '\xa0\xa0\xa0' + " ." + '\xa0\xa0\xa0' + " . " + '\xa0\xa0\xa0' + "...) ?")
                checkFinishedGame();
                setCurrentScreen("Cab");
                setBackgroundPicture(InCabImage);
                clearStage();
                setCabScreen(true);
            }
            if(currentWord === "FARM") {
                if((!pig) && (!tom)) {
                    setHelperText("Great! You found Tom (-" + '\xa0\xa0\xa0' + " --- " + '\xa0\xa0\xa0' + "--) and his Pig (.--. " + '\xa0\xa0\xa0' + ".. " + '\xa0\xa0\xa0' + "--.) !")
                } else {
                    setHelperText("You're already done here! Let's go back to the Taxi (- " + '\xa0\xa0\xa0' + ".- " + '\xa0\xa0\xa0' + "-..- " + '\xa0\xa0\xa0' + "..)")
                }
                checkFinishedGame();
                setCurrentScreen("Farm");
                setBackgroundPicture(farmImage);
                clearStage();
                setFarmScreen(true);
            }
            if(currentWord === "TREES") {
                setHelperText("You found Mel (--" + '\xa0\xa0\xa0' + " . " + '\xa0\xa0\xa0' + ".-..) and her Hen (.... " + '\xa0\xa0\xa0' + ". " + '\xa0\xa0\xa0' + "-.) !")
                if (!mel) {
                    document.getElementById("girlFarmerID").style.visibility = "visible";
                }
                if (!hen) {
                    document.getElementById("henID").style.visibility = "visible";
                }
                checkFinishedGame();
                setCurrentScreen("Forest");
                setBackgroundPicture(forestImage);
                clearStage();
                setForestScreen(true);
            }
            if(currentWord === "OAK") {
                if(!owl) {
                    setHelperText("I knew it! Here's Mac (--" + '\xa0\xa0\xa0' + " .-" + '\xa0\xa0\xa0' + " -.-.) the Owl (--- " + '\xa0\xa0\xa0' + ".-- " + '\xa0\xa0\xa0' + ".-..) !")
                    document.getElementById("owlID").style.visibility = "visible";
                }
                checkFinishedGame();
                setCurrentScreen("Oak");
                setBackgroundPicture(oakImage);
                clearStage();
                setHouseScreen(true);
            }
            if(currentWord === "HOME") {
                setTimeout(function () {
                    setEndScreen(true);
                }, 3000);
                setHelperText("Great Job! Everyone's here!");
                setCurrentScreen("House");
                setBackgroundPicture(houseImage);
                
                document.getElementById("owlID").style.visibility = "visible";
                    {
                        document.getElementById("owlID").style.top = "32vh";
                        document.getElementById("owlID").style.left = "55vw";
                    }
                document.getElementById("girlFarmerID").style.visibility = "visible";
                    {
                        document.getElementById("girlFarmerID").style.top = "32vh";
                        document.getElementById("girlFarmerID").style.left = "25vw";
                    }
                document.getElementById("farmerID").style.visibility = "visible";
                    {
                        document.getElementById("farmerID").style.top = "7vh";
                        document.getElementById("farmerID").style.left = "33vw";
                    }
                document.getElementById("pigID").style.visibility = "visible";
                    {
                        document.getElementById("pigID").style.top = "50vh";
                        document.getElementById("pigID").style.left = "60vw";
                    }
                document.getElementById("henID").style.visibility = "visible";
                    {
                        document.getElementById("henID").style.top = "49vh";
                        document.getElementById("henID").style.left = "50vw";
                    }
                clearStage();
            }
        }
        { /* Objects */
            if(currentWord === "PIG") {
                if(!pig) {
                    if (!tom) {
                        setHelperText("Great! Let's not forget Tom (- " + '\xa0\xa0\xa0' + "--- " + '\xa0\xa0\xa0' + "--) !");
                    } else {
                        setHelperText("Perfect! We're all wrapped up here, lets go back to the Taxi (- " + '\xa0\xa0\xa0' + ".- " + '\xa0\xa0\xa0' + "-..-" + '\xa0\xa0\xa0' + " ..) !")
                    }
                    document.getElementById("pigID").style.visibility = "hidden";
                    pigFound(true);
                    setGems(gemScore + 1);
                }
                setWord("");
            }
            if (currentWord === "HEN") {
                if(!hen) {
                    if (!mel) {
                        setHelperText("Let's not forget about Mel (-- " + '\xa0\xa0\xa0' + ". " + '\xa0\xa0\xa0' + ".-..)")    
                    } else {
                        setHelperText("Those Oak (--- " + '\xa0\xa0\xa0' + ".-" + '\xa0\xa0\xa0' + " -.-) trees look weird. Let's take a closer look!")
                    }
                    document.getElementById("henID").style.visibility = "hidden";
                    henFound(true);
                    setGems(gemScore + 1);
                }
                setWord("");
            }
            if (currentWord === "MEL" ){
                if(!mel) {
                    if (!hen) {
                        setHelperText("Let's not forget about the Hen (.... " + '\xa0\xa0\xa0' + "." + '\xa0\xa0\xa0' + " -.) ")
                    } else {
                        setHelperText("Those Oak (--- " + '\xa0\xa0\xa0' + ".-" + '\xa0\xa0\xa0' + " -.-) trees look weird. Let's take a closer look!")
                    }
                    document.getElementById("girlFarmerID").style.visibility = "hidden";
                    melFound(true);
                    setGems(gemScore + 1);
                }
                setWord("");
            }
            if(currentWord === "GUY" || currentWord === "TOM" || currentWord ==="BOY") {
                if(!tom) {
                    if(!pig) {
                        setHelperText("Great! Let's not forget his Pig (.--." + '\xa0\xa0\xa0' + " .. " + '\xa0\xa0\xa0' + "--.) !");
                    } else {
                        setHelperText("Perfect! We're all wrapped up here, lets go back to the Taxi (- " + '\xa0\xa0\xa0' + ".-" + '\xa0\xa0\xa0' + " -..- " + '\xa0\xa0\xa0' + "..) !")
                    }
                    document.getElementById("farmerID").style.visibility = "hidden";
                    tomFound(true);
                    setGems(gemScore + 1);
                }
                setWord("");
            }
            if (currentWord === "OWL" || currentWord === "MAC") {
                if(!owl) {
                    setHelperText("Great! He'll be there. Let's head back to the Taxi (- " + '\xa0\xa0\xa0' + ".-" + '\xa0\xa0\xa0' + " -..-" + '\xa0\xa0\xa0' + " ..) !");
                    document.getElementById("owlID").style.visibility = "hidden";
                    owlFound(true);
                    setGems(gemScore + 1);
                }
            }
        }
    }

    //This will reset the inputted morse depending on length/time
    resetInputLength(input, setInput);
    clearTimeout(t);
    t = setTimeout(function(){
        if(output != ' '){
        setWord(currentWord + output);
        }
        setInput('');
        checkCurrentWord();
    }, resetTimer);
    resetInputLength(input, setInput);

    const [handleKeyDown, setHandleKeyDown] = useState(true);
    document.onkeydown = function (evt) {
        //Prevents "holding" a button down.
        if (!handleKeyDown) return;
        setHandleKeyDown(false);

        //If "Space"
        //".keyCode" is deprecated, but required?
        if (evt.keyCode === 32) {
            setInput(input + '•');
            playDot();
        }
        //If "Enter"
        if (evt.keyCode === 13) {
            setInput(input + '-');
            playDash();
        }
    };

    document.onkeyup = function (evt) {
        setHandleKeyDown(true);
        //I'm not sure what the use of
        //document.activeElement.blur();
    };

    //Stuff to make it look prettier
    //TODO: Test if Gems work
    const [gemScore, setGems] = useState(0);
    var gemDisplay = "";
    for (var i = 0; i < gemScore; i++) { gemDisplay = gemDisplay + "💎";}

    const [currentWord, setWord] = useState("");

    //Screens have to be boolean in order to set items to "true" or "false" without checks.
    //Unnecessary.
    const [startScreen, setStartScreen] = useState(true);
    const [endScreen, setEndScreen] = useState(false);
    const [cabScreen, setCabScreen] = useState(true);
    const [farmScreen, setFarmScreen] = useState(false);
    const [houseScreen, setHouseScreen] = useState(false);
    const [forestScreen, setForestScreen] = useState(false);

    const [helperText, setHelperText] = useState("There's noone here,let's go into the Taxi (-" + '\xa0\xa0\xa0' + ".-" + '\xa0\xa0\xa0' + "-..-" + '\xa0\xa0\xa0' + "..)!");

    //Objects, considered "Not Found", thus set to false.
    const [owl, owlFound] = useState(false);
    const [hen, henFound] = useState(false);
    const [mel, melFound] = useState(false);
    const [pig, pigFound] = useState(false);
    const [tom, tomFound] = useState(false);

    const [currentScreen, setCurrentScreen] = useState("Start");

    useImperativeHandle(
        ref,
        () => ({
            update() {
                setVolume(initial('volume'));
                // setSize(initial('size'));
                setSpeed(initial('speed'));
                // setBackgroundColor(initial('backgroundColor'));
                setDashButtonColor(initial('dashButtonColor'));
                setDotButtonColor(initial('dotButtonColor'));
                setFontColor(initial('fontColor'));
                // setButtonColor(initial("buttonColor"));
            }
        }),
    )

    return (
        //This is the "Main" screen
        <div style={{
            backgroundImage: `url(${backgroundPicture})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: "contain",
            width: "80vw",
            height: "62vh",
            marginLeft: "10vw",
            marginBottom: "300vh"
        }}>
            
            <Transition //Tutorial transition, "Start Screen"
                items={startScreen}
                duration={500}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}>
                {toggle =>
                    toggle
                        ? props => <div style={{
                            position: 'absolute',
                            left: "-0vw",
                            width: '100vw',
                            height: '90vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1,
                            ...props
                        }}>
                            <div style={{
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
                                            marginBottom: '0vh',
                                            fontSize: '8vh'
                                        }}>Adventure Game
                                        </h1>
                                        <br />
                                        <p id= "instructions" style={{
                                            marginTop: '0vh',
                                            paddingLeft: '2vw',
                                            paddingRight: '2vw',
                                            fontSize: '4vh',
                                            display: 'none'
                                        }}>Type the morse of the letters to explore the map!
                                        </p>
                                    </Card>
                                        <Grid id = "pr" container direction = 'row' justify='center' alignItems='center'>
                                            <h1 style={{
                                                fontSize: '4vh',
                                                backgroundColor: 'white'
                                            }}>Morse Prompts:
                                            </h1> 
                                            <Grid> 
                                                <button id = "yesPrompts" style={{ border: 'none','margin-left':'30px','margin-right':'30px', fontSize: '5vh', cursor: 'pointer', 'outline-style':'solid','outline-width':'thick'}} 
                                                onMouseDown={function () {
                                                    buttonClick("yesPrompts","noPrompts");
                                                    }}>
                                                    Yes                  
                                                </button>

                                                <button id = "noPrompts" style={{ border: 'none',fontSize: '5vh', cursor: 'pointer', 'outline-style':'solid', 'outline-width':'thick'}} onMouseDown={function () {
                                                    buttonClick("noPrompts","yesPrompts");
                                                    }}>
                                                    No                   
                                                </button> 
                                            </Grid>
                                        </Grid>
                                </Grid>
                                <br />
                                <Grid item style={{ userSelect: 'none' }}>
                                <Card>
                                    <button id = "doneOptions" style={{ fontSize: '8vh', height: '100%', width: '100%', cursor: 'pointer' }}
                                            onMouseDown={function () {
                                                var start = document.getElementById("start");
                                                start.style.display = "block";
                                                var done = document.getElementById("doneOptions");
                                                done.style.display = "none";
                                                var instructions = document.getElementById("instructions");
                                                instructions.style.display = "block";
                                                var prom = document.getElementById("pr");
                                                prom.style.display = "none";
                                            }}>
                                            Done
                                        </button>
                                        </Card>
                                    <Card>
                                        <button id= "start" style={{display: 'none', fontSize: '8vh', height: '100%', width: '100%', cursor: 'pointer' }}
                                            onMouseDown={function () {
                                                if (startScreen) {
                                                    //setState("home");
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

            <Transition //End Screen
                items={endScreen}
                duration={500}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}>
                {toggle =>
                    toggle
                        ? props => <div style={{
                            position: 'absolute',
                            left:"-0vw",
                            width: '100vw',
                            height: '90vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1,
                            ...props
                        }}>
                            <div style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'black',
                                opacity: 0.7
                            }} />
                            <Grid container justify='center' alignItems='center' style={{ height: '100%', width: '100%', zIndex: 1 }}>
                                <Grid item xs={9} style={{ userSelect: 'none', color: fontColor }}>
                                    <Card>
                                        <br />
                                        <p style={{
                                            marginTop: '0vh',
                                            paddingLeft: '2vw',
                                            paddingRight: '2vw',
                                            fontSize: '8vh',
                                            marginBottom: '0vh'
                                        }}>
                                            Congratulations!
                                        </p>
                                    </Card>
                                </Grid>
                                <Grid item xs={4} style={{ userSelect: 'none' }}>
                                    <Card>
                                        <button style={{ fontSize: '8vh', cursor: 'pointer', height: '100%', width: '100%' }}
                                            onMouseDown={function () {
                                                if (endScreen) {
                                                    backToGames();
                                                }
                                            }}>
                                            Other Games (•)
                                        </button>
                                    </Card>
                                </Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={4} style={{ userSelect: 'none' }}>
                                    <Card>
                                        <button style={{ fontSize: '8vh', cursor: ' pointer', height: '100%', width: '100%' }}
                                            onMouseDown={function () {
                                                if (endScreen) {
                                                    resetGame();
                                                }
                                            }}>
                                            More Practice (-)
                                        </button>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                        : props => <div />
                }
            </Transition>

            <div> {/*Objects*/}
                <img src={pigImage} id = "pigID" alt="Pig picture" style = {{
                    position: 'absolute',
                    width:'15%', 
                    height:'20%', 
                    top: "56vh",
                    left: "56vw",
                    visibility: 'hidden'
                }} />

                <img src={farmerImage} id = "farmerID" alt="Farmer picture" style = {{
                    position: 'absolute',
                    width:'25%', 
                    height:'90%', 
                    top: "12vh",
                    left: "30vw",
                    visibility: 'hidden'
                }} />

                <img src={girlFarmerImage} id = "girlFarmerID" alt="girlFarmer picture" style = {{
                    position: 'absolute',
                    width:'20%', 
                    height:'40%', 
                    top: "30vh",
                    left: "32vw",
                    visibility: 'hidden'
                }} />

                <img src = {henImage} id = "henID" style = {{
                    position: 'absolute',
                    width:'10%', 
                    height:'23%', 
                    top: "47vh",
                    left: "53vw",
                    visibility: 'hidden'
                }} />

                <img src = {owlImage} id = "owlID" style = {{
                    position: 'absolute',
                    width:'8%', 
                    height:'19%', 
                    top: "50vh",
                    left: "44.2vw",
                    visibility: 'hidden'
                }} />

            </div>

            <div> {/*Helper Text*/}
                <div style={{
                    backgroundColor: "#D3D3D3",
                    width: '50%',
                    height: '5vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: "absolute",
                    marginLeft: "15vw",
                    fontSize: '3vh',
                    pointer: 'default',
                    userSelect: 'none',
                    color: fontColor
                }}>
                    <p>{helperText}</p>
                </div>
            </div>

            <div> {/*Back Button*/}
                <Link className='nav-link' to="/GamesThemes">
                        <button style={{
                            position: "absolute",
                            marginLeft: "-49vw",
                            width: '10%',
                            height: "8%",
                            fontSize: '4vh',
                            fontWeight: 800,
                            userSelect: 'none',
                            cursor: 'pointer',
                        }}>Back</button>
                </Link>
            </div>

            <div> {/*Clear Button*/}
                <button id = "clearButton" style = {{
                        position:"absolute",
                        marginLeft:"39vw",
                        fontSize: "4vh",
                        width: "10%",
                        height: "8%",
                        userSelect: "none",
                        fontWeight: 800
                    }}
                    onMouseDown={function()
                    {
                        setWord("");
                        document.getElementById("textbox").innerHTML = "&nbsp;";
                        setWord("");
                    }}>
                        Clear
                    </button>
            </div>

            <div> {/*Trackers*/}
                <div style={{
                    position: "absolute",
                    marginLeft: "-8.6vw",
                    marginTop: "6vh",
                    fontSize: '3vh',
                    pointer: 'default',
                    userSelect: 'none',
                    color: fontColor
                }}>
                    <p>Current Word</p>
                    <p> {currentWord} </p>
                    <p>Current Score</p>
                    <p> {gemDisplay} </p>
                </div>
                <div>
                    <p style={{
                        backgroundColor: "#D3D3D3",
                        position: "absolute",
                        width: '25%',
                        height: '5.5vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: "27.75vw",
                        marginTop: "62.3vh",
                        lineHeight: 0,
                        color: fontColor,
                        fontSize: '10vh',
                        textAlign: 'center',
                        pointer: 'default',
                        userSelect: 'none'
                    }}>{input}</p>
                </div>
            </div>

            <div> {/*Morse Buttons*/}
                <button id="dotButton" style={{
                    position: "absolute",
                    backgroundColor: dotButtonColor,
                    marginTop: "68vh",
                    marginLeft: "15vw",
                    width: '25%',
                    height: '18vh',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontSize: '35vh',
                    color: fontColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} onMouseDown={function () {
                    setInput(input + '•');
                    playDot();
                    clearTimeout(t);
                    t = resetInputTime(t, input, setInput, resetTimer);
                }}>
                    <span
                    >•
                    </span>
                </button>
                
                <button id="dashButton" style={{
                    backgroundColor: dashButtonColor,
                    position: "absolute",
                    marginTop:"68vh",
                    marginLeft:"40.5vw",
                    width: '25%',
                    height: '18vh',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontSize: '35vh',
                    color: fontColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} onMouseDown={function () {
                    setInput(input + '-');
                    playDash();
                    clearTimeout(t);
                    t = resetInputTime(t, input, setInput, resetTimer);
                }}>
                    -
                </button>
            </div>
        </div>
    );
})

export default adventureGame;