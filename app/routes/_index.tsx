import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../public/assets/style/ibmpc.css';

interface IBMPCProps {
  parent: HTMLElement;
}

class IBMPC {
  protected div: HTMLDivElement;
  protected text: HTMLPreElement;
  public cursor: HTMLSpanElement;
  protected bottom?: HTMLSpanElement;
  protected basic: { header: string };

  constructor(parent: HTMLElement, textCols: number = 80) {
    const div = document.createElement('div');
    const text = document.createElement('pre');
    const cursor = document.createElement('span');
    let fontSize = 4;

    if (textCols < 81) fontSize = 8;
    if (textCols < 41) fontSize = 15;
    cursor.innerHTML = '<b>_</b>';
    cursor.className = 'blink05';
    div.style.position = 'absolute';
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.overflow = 'hidden';
    div.style.color = '#fff3f3';
    div.style.background = '#000';
    div.style.fontSize = fontSize + 'px';
    div.style.fontFamily = 'DOS, monospace, "Courier New"';

    div.appendChild(text);
    div.appendChild(cursor);

    this.div = div;
    this.text = text;
    this.cursor = cursor;

    this.basic = { header: `IBM Personal Computer Basic` };

    parent.appendChild(this.div);
    setTimeout(() => this.bios(), this.rnd());
  }

  protected rnd(max: number = 3000): number {
    return Math.floor(Math.random() * max);
  }

  protected bios(): void {
    setTimeout(() => this.boot(), 10000); // Adjusting this value changes the delay before boot starts
  }

  protected boot(): void {
    this.basicMethod();
  }

  protected basicMethod(): void {
    let header = this.basic.header;
    const bottom = document.createElement('span');

    bottom.style.position = 'absolute';
    bottom.style.bottom = '0px';
    bottom.style.overflow = 'hidden';
    bottom.style.display = 'block';
    this.bottom = bottom;
    this.div.appendChild(this.bottom);
    this.text.innerText = '';

    const timer = setInterval(() => {
      if (!header.length) {
        this.cursor.className = 'blink025';
        return clearInterval(timer);
      }
      this.text.innerText += header.charAt(0);
      header = header.substr(1);
    }, 10); // Adjusting this value changes the typing speed of the header
  }

  public hide(): void {
    this.div.style.opacity = '0';
  }

  public show(): void {
    this.div.style.opacity = '1';
  }

  protected bin64beep(): string {
    return `
      data:audio/mpeg;base64,/+MYxAAMaSrFmUEQAgqqCcgDwAABeP0MYxjGMYwAABf+ACGMYxj//kIQhCTgAgMZQEAQBD3//ggCAPg//BByBmdFIGvg19L/
      ... (more base64 data)
    `;
  }
}

class IBMPCat extends IBMPC {
  private RAM: number;
  private timer: number | undefined;

  constructor(parent: HTMLElement) {
    super(parent, 40);
    this.RAM = 0;
    this.timer = undefined; // Initialize timer property explicitly
    this.basic.header = `

    Initialising RICKMUDA.NL
    Version = 1.0 
      

    ██████  ██  ██████ ██   ██ ███    ███ ██    ██ ██████   █████     ███    ██ ██      
    ██   ██ ██ ██      ██  ██  ████  ████ ██    ██ ██   ██ ██   ██    ████   ██ ██      
    ██████  ██ ██      █████   ██ ████ ██ ██    ██ ██   ██ ███████    ██ ██  ██ ██      
    ██   ██ ██ ██      ██  ██  ██  ██  ██ ██    ██ ██   ██ ██   ██    ██  ██ ██ ██      
    ██   ██ ██  ██████ ██   ██ ██      ██  ██████  ██████  ██   ██ ██ ██   ████ ███████ 
                                                                                        
    Welcome to RICKMUDA.NL
    `;
  }

  protected bios(): void {
    // Initialize timer with setInterval, TypeScript will infer the type
    const interval = 120; // Example interval time in milliseconds
    this.timer = window.setInterval(() => {
      if (this.RAM === 1024) {
        clearInterval(this.timer!);
        setTimeout(() => this.boot(), 2000); // Adjusting this value changes the delay before boot after RAM check is complete
      }
      this.text.innerText = this.RAM + ' KB OK';
      this.RAM += 128; // The amount of RAM that is added each interval
    }, interval); // Adjusting this value changes the speed of RAM check
  }

  protected basicMethod(): void {
    super.basicMethod();
    if (this.bottom) {
      for (let i = 0; i < 11; i++) this.bottom.removeChild(this.bottom.lastChild!);
    }
  }
}

// eslint-disable-next-line no-empty-pattern
const IBMPCComponent: React.FC<IBMPCProps> = ({ }) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (parentRef.current) {
      const ibmpc = new IBMPCat(parentRef.current);

      // Automatically type "OR" after 3 seconds and navigate after typing is done
      setTimeout(() => {
        ibmpc.cursor.className = 'blink025'; // Adjust blinking speed if needed
        // Navigate to /mainscreen after typing is done
        setTimeout(() => {
          navigate('/mainscreen');
        }, 2000); // Adjust this timeout based on how long it takes to finish typing
      }, 7000); // Adjusting this value changes the delay before typing "OR" and navigation
    }
  }, [navigate]);

  return (
    <div ref={parentRef} className="screen640x400" style={{ position: 'relative', height: '100vh', width: '100vw', backgroundColor: '#000' }}>
      <Link to="/mainscreen" className="buttonLeft" style={{ position: 'absolute', top: '10px', left: '10px', padding: '10px 20px', backgroundColor: '#fff', color: '#000', textDecoration: 'none', borderRadius: '5px' }}>
        Go to Main Screen
      </Link>
    </div>
  );
};

export default IBMPCComponent;
