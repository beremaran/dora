import React, { FunctionComponent, Fragment, useState } from 'react';
import { hot } from 'react-hot-loader';

import Modal from 'react-modal';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './routes/Home/Home';
import NumberInput from './components/NumberInput';
import CheckboxInput from './components/CheckboxInput';
import Button from './components/Button';

const KEY_BREAK_SHORT = 'KEY_BREAK_SHORT';
const KEY_BREAK_LONG = 'KEY_BREAK_LONG';
const KEY_POMODORO = 'KEY_POMODORO';
const KEY_IS_MUTED = 'KEY_IS_MUTED';

const modalStyles = {
  content: {
    top: '50%',
    right: 'auto',
    bottom: 'auto',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const getFromStorage = (key: string, _: any): any => {
  let value = localStorage.getItem(key);
  if (value === null) {
    putStorage(key, _);
    return _;
  }

  return JSON.parse(value);
};

const putStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const App: FunctionComponent = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [breakTime, setBreakTime] = useState(getFromStorage(KEY_BREAK_SHORT, 5 * 60 * 1000));
  const [longBreakTime, setLongBreakTime] = useState(
    getFromStorage(KEY_BREAK_LONG, 10 * 60 * 1000),
  );
  const [pomodoroTime, setPomodoroTime] = useState(getFromStorage(KEY_POMODORO, 25 * 60 * 1000));
  const [isMuted, setIsMuted] = useState(getFromStorage(KEY_IS_MUTED, false));

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  const closeSettingsModal = () => {
    setIsSettingsOpen(false);
  };

  const handleSettingsSave = e => {
    e.preventDefault();
    closeSettingsModal();

    putStorage(KEY_BREAK_SHORT, breakTime);
    putStorage(KEY_BREAK_LONG, longBreakTime);
    putStorage(KEY_POMODORO, pomodoroTime);
    putStorage(KEY_IS_MUTED, isMuted);
  };

  const preprocessFormValue = (value: string) => {
    let intValue = parseInt(value);
    if (intValue === NaN) {
      intValue = 0;
    }

    return intValue * 60 * 1000;
  };

  const handlePomodoroDurationChange = e => {
    e.preventDefault();
    setPomodoroTime(preprocessFormValue(e.target.value));
  };

  const handleShortBreakDurationChange = e => {
    e.preventDefault();
    setBreakTime(preprocessFormValue(e.target.value));
  };

  const handleLongBreakDurationChange = e => {
    e.preventDefault();
    setLongBreakTime(preprocessFormValue(e.target.value));
  };

  const handleIsMutedChange = e => {
    setIsMuted(e.target.checked);
  };

  return (
    <Fragment>
      <Modal ariaHideApp={false} style={modalStyles} isOpen={isSettingsOpen}>
        <h1>Settings</h1>
        <form onSubmit={handleSettingsSave} className="SettingsForm">
          <NumberInput
            label="Pomodoro Duration"
            value={pomodoroTime / (60 * 1000)}
            onChange={handlePomodoroDurationChange}
          />
          <NumberInput
            label="Short Break Duration"
            value={breakTime / (60 * 1000)}
            onChange={handleShortBreakDurationChange}
          />
          <NumberInput
            label="Long Break Duration"
            value={longBreakTime / (60 * 1000)}
            onChange={handleLongBreakDurationChange}
          />
          <CheckboxInput label="Mute Sounds" checked={isMuted} onChange={handleIsMutedChange} />

          <Button type="submit" primary={true} onClick={handleSettingsSave}>
            Save
          </Button>
          <Button type="cancel" secondary={true} onClick={closeSettingsModal}>
            Cancel
          </Button>
        </form>
      </Modal>
      <Header onClickSettings={handleSettingsClick} />
      <Home
        breakTime={breakTime}
        pomodoroTime={pomodoroTime}
        longBreakTime={longBreakTime}
        isMuted={isMuted}
      />
      <Footer />
    </Fragment>
  );
};

export default hot(module)(App);
