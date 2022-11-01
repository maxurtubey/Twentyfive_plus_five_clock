import React, { useState, useEffect } from "react";
import Time from "./Time";
import StartButton from "./StartButton";
import ResetButton from "./ResetButton";
import Length from "./Length";
import Label from "./Label";

export default function Main() {

  const [countDown, setCountDown] = useState(false);
  const [displayTime, updateDisplayTime] = useState(1500); //1500
  const [sessionTime, updateSessiontime] = useState(1500); //1500
  const [breakTime, updateBreaktime] = useState(300); //300
  const [onBreak, setOnBreak] = useState(false);
  const [sessionLabel, setSessionLabel] = useState('Session');

  let sessionDefaultTime = sessionTime / 60;
  let breakDefaultTime = breakTime / 60;
  let minutos = Math.floor(displayTime / 60);
  let segundos = displayTime % 60;

  const audio = document.getElementById('beep');

  minutos = minutos < 10 ? '0' + minutos : minutos;
  segundos = segundos < 10 ? '0' + segundos : segundos;

  const modifyTime = (secs, titulo) => {
    if (titulo === 'Break Length' && !countDown) {
      if (breakTime <= 60 && secs < 0) {
        return;
      } else if (breakTime === 3600 && secs > 0) {
        return;
      }
      updateBreaktime((prev) => prev + secs);
    } else if (titulo === 'Session Length' && !countDown) {
      if (sessionTime <= 60 && secs < 0) {
        return;
      } else if (sessionTime === 3600 && secs > 0) {
        return;
      }
      updateSessiontime((prev) => prev + secs);
    }
    // Updating the TimeLeft while Countdown paused
    if (!countDown && titulo === 'Break Length' && onBreak === true) {
      updateDisplayTime(breakTime + secs);
    } else if (!countDown && titulo === 'Session Length' && onBreak === false) {
      updateDisplayTime(sessionTime + secs);
    }
  }

  const resetear = () => {
    setCountDown(false);
    updateBreaktime(300);
    updateSessiontime(1500);
    updateDisplayTime(1500);
    setOnBreak(false); // Change the label back to Session
    setSessionLabel('Session');

    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  }

  useEffect(() => {
    if (countDown) {
      const regresive = setInterval(() => { updateDisplayTime(displayTime - 1) }, 1000);
      if (displayTime < 0 && onBreak === false) {
        updateDisplayTime(breakTime);
        setOnBreak(!onBreak);
      } else if (displayTime < 0 && onBreak === true) {
        updateDisplayTime(sessionTime);
        setOnBreak(!onBreak);
      }
      return () => clearInterval(regresive)
    }
  }, [countDown, displayTime, onBreak, breakTime, sessionTime])

  useEffect(() => {
    if (displayTime === 0) {
      audio.play();
      if (sessionLabel === 'Session' && onBreak === false) {
        setSessionLabel('Break');
      } else if (sessionLabel === 'Break' && onBreak === true) {
        setSessionLabel('Session')
      }
    }
  }, [audio, displayTime, sessionLabel, onBreak])

  return (
    <div className="container" style={{ border: '6px solid white' }}>
      <h2 className="clockTile" style={{ color: "gray" }}>25 + 5 Clock</h2>
      <div className="row" style={{ padding: '10px', marginTop:'-15px' }}>
        <div className="col">
          <Length idTitle={'break-label'}
            modifyTime={modifyTime}
            titulo={'Break Length'}
            idBtnDecrement={'break-decrement'}
            idBtnIncrement={'break-increment'}
            duracion={breakDefaultTime}
            durID={'break-length'} />
        </div>
        <div className="col"></div>
        <div className="col">
          <Length idTitle={'session-label'}
            modifyTime={modifyTime}
            titulo={'Session Length'}
            idBtnDecrement={'session-decrement'}
            idBtnIncrement={'session-increment'}
            duracion={sessionDefaultTime}
            durID={'session-length'} />
        </div>
      </div>
      <div className="row" style={{ padding: '10px' }}>
        <div className="col text-center">
          {/* <Label labelID={'timer-label'} label={onBreak ? 'Break' : 'Session'} /> */}
          <Label labelID={'timer-label'} label={sessionLabel} />
          <Time timeID={'time-left'} min={minutos} seg={segundos} upSeg={updateDisplayTime} />
          {/* <h3>{countDown ? 'true' : 'false'}</h3> */}
          <div className="row">
            <div className="col">
              <StartButton btnID={'start_stop'}
                setCountDown={setCountDown}
                text={'Play-Pause'}
                countDown={countDown} />
              <ResetButton btnID={'reset'}
                resetear={resetear}
                text={'Reset'} />
            </div>
          </div>
          <audio id="beep" preload="auto"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          />
        </div>
      </div>
    </div>
  )
}