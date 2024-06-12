import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function LoadingScreen() {
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', color: '#AAA', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>
      <p>Loading...</p>
    </div>
  );
}

function IBMPC({ textCols = 80 }) {
  const [text, setText] = useState('');
  const [cursorBlink, setCursorBlink] = useState(true);
  const [fontSize, setFontSize] = useState(4);

  useEffect(() => {
    if (textCols < 81) setFontSize(8);
    if (textCols < 41) setFontSize(15);

    const cursorInterval = setInterval(() => {
      setCursorBlink((prev) => !(prev));
    }, 500);

    setTimeout(() => bios(), rnd());

    return () => clearInterval(cursorInterval);
  }, []);

  const rnd = (max = 3000) => {
    return Math.floor(Math.random() * max);
  };

  const bios = () => {
    setTimeout(boot, 7000);
  };

  const boot = () => {
    basic();
  };

  const basic = () => {
    const header = `
IBM Personal Computer Basic
`;
    let index = 0;
    const timer = setInterval(() => {
      if (index >= header.length) {
        clearInterval(timer);
        return;
      }
      setText((prevText) => prevText + header.charAt(index));
      index += 1;
    }, 20);
  };

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', color: '#AAA', background: '#000', fontSize: `${fontSize}px` }}>
      <pre>{text}</pre>
      <span className={cursorBlink ? 'blink05' : ''}>
        <b>_</b>
      </span>
    </div>
  );
}

function IBMPCat() {
  const [RAM, setRAM] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (RAM === 1024) {
        clearInterval(timer);
        setTimeout(boot, 2000);
      } else {
        setRAM((prevRAM) => prevRAM + 16);
      }
    }, 185);

    return () => clearInterval(timer);
  }, [RAM]);

  const boot = () => {
    basic();
  };

  const basic = () => {
    const header = `                                                                         

`;
    let index = 0;
    const timer = setInterval(() => {
      if (index >= header.length) {
        clearInterval(timer);
        return;
      }
      setText((prevText) => prevText + header.charAt(index));
      index += 1;
    }, 20);
  };

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', color: '#AAA', background: '#000', fontSize: `15px` }}>
      <pre>{`${RAM} KB OK`}</pre>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const body = document.querySelector('body');
    const parent = document.createElement('div');
    parent.className = 'screen640x400';
    body.appendChild(parent);

    ReactDOM.render(<IBMPCat parent={parent} />, parent);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulate a 3-second loading screen

    return () => {
      clearTimeout(timer);
      body.removeChild(parent);
    };
  }, []);

  return loading ? <LoadingScreen /> : null;
}

export default App;
