import React from 'react';
import '../../App.css';

function LearnAlphabet() {
    return (
        <div>
            <h1>Learn the Alphabet in Morse</h1>
            <h1 id="letter"></h1>
            <button onClick="enterDot()" id="dotButton">•</button>
            <button onClick="enterDash()" id="dashButton">-</button>
        </div>
    );
}

function enterDot() {
    var x = document.getElementById("dotButton");
    
}

function enterDash() {
    var x = document.getElementById("dashButton");
}

function changeLetter() {
    var x = document.getElementById("letter");
}

export default LearnAlphabet;