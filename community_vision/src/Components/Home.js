import React, { useState, forwardRef, useImperativeHandle } from 'react';
import '../App.css';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import studentPhoto from '../Components/Assets/Images/student.png'
import Brandon_reg from '../Components/Assets/Fonts/Brandon_reg.otf'
import { CardActionArea } from '@material-ui/core';
import { useHistory } from "react-router-dom";
/*
* Home.js
* Starting page with main image and links to About, Instructions, Play Games!, and Give Us Feedback!
*/
const Home = forwardRef((props, ref) => {

  const history = useHistory();
  function moveTo(input) {
    history.push(input);
  }

  const [backgroundColor, setBackgroundColor] = useState(() => '#e8e8e8');
  const [fontColor, setFontColor] = useState(() => 'black');
  const [dropdown, setDropdown] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      update(value) {
        setBackgroundColor('#e8e8e8');
        setFontColor('black');
        setDropdown(value);
      }
    }),
  )
  
  return (
    <div style={{
      position: 'relative',
      zIndex: 0,
      height: '90vh',
      width: '100vw',
      backgroundColor: backgroundColor
    }}>

      {/* styling for the home page */}
      <div style={{
        alignSelf: 'center',
        alignItems: 'center'
      }}>
        {/* title */}

        <h1 style={{
          fontSize: '9vh',
          font: Brandon_reg,
          color: fontColor,
          bottom: '-2vh',
          userSelect: 'none',
          cursor: 'default',
          fontWeight: 900,
          margin: 0,
          lineHeight: '100%',
          paddingTop: '1vh'
        }}>
          Play Morse!</h1>
        {/* welcome statement */}
        <Grid container justify='center' alignItems='flex-start'>
          <Grid item xs={11} style={{ height: '18%' }}>
            <h1 style={{ height: '100%', color: fontColor, fontWeight: 900, userSelect: 'none', cursor: 'default', lineHeight:'100%' }}>
              Welcome to Community Vision Morse Code Games!
              </h1>

              <img src={studentPhoto} alt='Photo of a student using playmorse.com' id='studentPhoto' height='333'></img>
          </Grid>

         

          <Grid item xs={8} style={{ height: '20%', paddingBottom: '1vh', paddingTop: '1vh', background: 'transparent' }}>
            {/* directs it to the about page */}
            <Card style={{ minHeight: '100%' }} onMouseUp={() => {
              if (!dropdown) {
                moveTo('/about');
              }
            }}>
              
              <CardActionArea>
                <button style={{ height: '100%', width: '100%', fontSize: '5vh', fontWeight: 900, userSelect: 'none', cursor: 'pointer', backgroundColor: '#eb6253', color: 'white', borderColor: '#eb6253' }}>About</button>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={8} style={{ height: '20%', paddingBottom: '1vh' }}>
            {/* directs it to the getting started page */}
            <Card style={{ minHeight: '100%' }} onMouseUp={() => {
              if (!dropdown) {
                moveTo('/gettingStarted');
              }
            }}>
              <CardActionArea>
                <button style={{ height: '100%', width: '100%', fontSize: '5vh', fontWeight: 900, userSelect: 'none', cursor: 'pointer', backgroundColor: '#78c04b', color: 'white', borderColor: '#78c04b'  }}>Instructions</button>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={8} style={{ height: '20%', paddingBottom: '1vh' }}>
            {/* play games button, directs it to the games page */}
            <Card style={{ minHeight: '100%' }} onMouseUp={() => {
              if (!dropdown) {
                moveTo('/settings');
              }
            }}>
              <CardActionArea>
                <button style={{ height: '100%', width: '100%', fontSize: '5vh', fontWeight: 900, userSelect: 'none', cursor: 'pointer', backgroundColor: '#21aaa4', color: 'white', borderColor: '#21aaa4' }}>Play Games!</button>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={8} style={{ height: '20%', paddingBottom: '6vh' }}>
            {/* play games button, directs it to the games page */}
            <Card style={{ minHeight: '100%' }} onMouseUp={() => {
              if (!dropdown) {
                window.open('https://docs.google.com/forms/d/1-Fy6sjP-xcLqWLefGCBUbdbZIKBPwEkvyng9boBpO58/edit', '_blank');
              }
            }}>
              <CardActionArea>
                <button style={{ height: '100%', width: '100%', fontSize: '5vh', fontWeight: 900, userSelect: 'none', cursor: 'pointer', backgroundColor: '#3b63a2', color: 'white', borderColor: '#3b63a2'}}>Give us Feedback!</button>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
})

export default Home;