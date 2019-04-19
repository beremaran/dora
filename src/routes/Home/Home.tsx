import React, { FunctionComponent, useState } from 'react';
import Notification from 'react-web-notification';
import Timer from 'react-compound-timer';
import Modal from 'react-modal';
import Button from '../../components/Button';

import './Home.scss';

type Props = {
  pomodoroTime: number;
  breakTime: number;
  longBreakTime: number;
  isMuted: boolean;
};

type NotificationOptionsType = {
  tag: number;
  body: string;
  icon: string | null;
  lang: string;
  dir: string;
};

const Home: FunctionComponent<Props> = ({ pomodoroTime, breakTime, longBreakTime, isMuted }) => {
  const [currentPomodoro, setCurrentPomodoro] = useState(1);
  const [currentBreak, setCurrentBreak] = useState(0);
  const [isBreak, setIsBreak] = useState(false);

  const [shouldNotify, setShouldNotify] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('Pomodoro');
  const [notificationBody, setNoficationBody] = useState('');

  const formatValue = (v: number): string => {
    let str = `${v}`;
    if (str.length != 2) {
      str = `0${str}`;
    }
    return str;
  };

  const onClickStop = (start: Function, stop: Function, setTime: Function) => {
    return () => {
      stop();
      setTime(pomodoroTime);
      start();
      stop();
    };
  };

  const playAlarmSound = () => {
    if (isMuted) {
      return;
    }

    const alarmSound = document.getElementById('alarmSound');
    if (alarmSound === null) {
      return;
    }

    (alarmSound as HTMLAudioElement).play();
  };

  const getNotificationOptions = (): NotificationOptionsType => {
    return {
      body: notificationBody,
      dir: 'ltr',
      icon: null,
      lang: 'en',
      tag: Date.now(),
    };
  };

  return (
    <Timer
      initialTime={pomodoroTime}
      direction="backward"
      startImmediately={false}
      formatValue={formatValue}
    >
      {({ start, pause, resume, stop, timerState, setTime, getTime }) => {
        const time = getTime();

        if (time > 0) {
          setShouldNotify(false);
        }

        if (time === 0) {
          if (isBreak) {
            setTime(pomodoroTime);
            setCurrentBreak(currentBreak + 1);

            setNotificationTitle('Pomodoro');
          } else {
            setTime(breakTime);
            setCurrentPomodoro(currentPomodoro + 1);
            setNotificationTitle('Short Break');

            if (currentPomodoro % 4 === 0) {
              setTime(longBreakTime);
              setNotificationTitle('Long Break');
            }
          }

          setIsBreak(!isBreak);
          setShouldNotify(true);
          playAlarmSound();
        }

        return (
          <div className="Timer">
            <Notification
              ignore={!shouldNotify}
              title={notificationTitle}
              options={getNotificationOptions()}
            />

            <audio id="alarmSound">
              <source src="/alarm.mp3" type="audio/mpeg" />
              <embed hidden={true} src="/alarm.mp3" />
            </audio>

            <span className="Timer-Current-Period">{notificationTitle}</span>

            <div className="Timer-Display">
              <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
            </div>
            <div>
              <Button
                onClick={start}
                primary={true}
                disabled={timerState === 'PLAYING' || timerState === 'PAUSED'}
              >
                start
              </Button>
              <Button
                disabled={timerState !== 'PLAYING' && timerState !== 'PAUSED'}
                primary={true}
                onClick={timerState === 'PLAYING' ? pause : resume}
              >
                {timerState === 'PLAYING' ? 'pause' : 'resume'}
              </Button>
              <Button
                disabled={timerState !== 'PLAYING'}
                primary={true}
                onClick={onClickStop(start, stop, setTime)}
              >
                stop
              </Button>
            </div>
          </div>
        );
      }}
    </Timer>
  );
};

export default Home;
