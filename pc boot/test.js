class IBMPC {
    constructor( parent, textCols=80 ) {
      var div = document.createElement('div')
          , text = document.createElement('pre')
          , cursor = document.createElement('span')
        , fontSize = 4
          ;
      if (textCols<81) fontSize = 8;
      if (textCols<41) fontSize = 15;
      cursor.innerHTML = '<b>_</b>';
          cursor.className = 'blink05';
      
      div.style.position = 'absolute';
      div.style.width = div.style.height = '100%';
      div.style.overflow = 'hidden';
      div.style.color = '#AAA';
      div.style.background = '#000';
      div.style.fontSize = fontSize+'px';
  
      div.appendChild(text);
      div.appendChild(cursor);
      
      this.div = div;
      this.text = text;
      this.cursor = cursor;
  
      this.basic.header = `
    IBM Personal Computer Basic
  `;
      
      parent.appendChild( this.div );
      setTimeout( this.bios.bind(this), this.rnd() );
    }
    rnd(max=3000) {
      return Math.floor( (Math.random() * max) );
    }
    bios() {
      setTimeout(this.beep.bind(this), 5000);
      setTimeout(this.boot.bind(this), 7000);
    }
    beep() {
      if (!this.beepAudio) this.beepAudio = new Audio( this.bin64beep() );
      this.beepAudio.play();
    }
    boot() {
      this.basic();
    }
    basic() {
      var header = this.basic.header
          , bottom = document.createElement('span')
          ;
          function genInvert(num , txt, spc='&nbsp;') {
        return num+'<span style="background: #AAA; color: #000;">'+txt+'</span>'+spc;
      }
          bottom.style.position = 'absolute';
          bottom.style.bottom = '0px';
      bottom.style.overflow = 'hidden';
          bottom.style.display = 'block';
      this.bottom = bottom;
      this.div.appendChild(this.bottom);
      this.text.innerText = '';
  
      var timer = setInterval( function() {
        if (!header.length) {
                  this.cursor.className = 'blink025';
          return clearInterval(timer);
        }
        this.text.innerText += header.charAt(0);
        header = header.substr(1);
      }.bind(this), 20);
    }
    hide() {
      this.div.style.opacity = '0';
    }
    show() {
      this.div.style.opacity = '0';
    }
    bin64beep() {
          const bin64 = "data:audio/mpeg;base64,/+MYxAAMaSrFmUEQAgqqCcgDwAABeP0MYxjGMYwAABf+ACGMYxj//kIQhCTgAgMZQEAQBD3//ggCAPg//BByBmdFIGvg19JL/+MYxAkO66LIAY1oAP/Wv/9SX/60UbieiUo9agNAy0vQEWPajfv//+v//////////////6jMlP/+pEXv//ODpQBbLIHZAgSO/+MYxAgOk17mWcc4Av//nuc8wkrJp736azTUNp/u6flQwn//+pshT0VLZ63V16W//////b6qZ///////ioRTVQBJJAFJAAaf/+MYxAgN+1reWUdQAv//Mvcws3+n88+x5zNO//+VDj///9nIS/t11N7NLG7/7/R6I92//+/v///////oOga+DXwliUNEv9Bl/+MYxAsP06LIAY1oACHt6m//obLf1gU4wDemHNGBstNEvgUw9kP//+ht//////////////+orI///UP5t//2H00qF69KQA0B/+MYxAYMcBq1mcMYAAEBEkWBk7UDQaiIGj2DQNREDQNSwNP9YLB0qCoK8GgZ//8qd///////+VBWTEFNRTMuOTkuM6qqqqqq";
          return bin64;
    }
  }

  class IBMPCat extends IBMPC {
    constructor( parent ) {
      super( parent, 40 );
      this.RAM = 0;
      this.basic.header = `                                                                         

  `;
    }
    bios() {
      var timer = setInterval( function() {
        if (this.RAM == 1024) {
          clearInterval( timer );
          setTimeout( this.beep.bind(this), 2000);
          setTimeout( this.boot.bind(this), 2000);
        }
        this.text.innerText = this.RAM+' KB OK';
        this.RAM += 16;
      }.bind(this), 185);
    }
    basic() {
      super.basic();
      for (let i=0; i<11; i++) this.bottom.removeChild( this.bottom.lastChild );
    }
  }
  console.clear();
  
  function init() {
    var body = document.querySelector('body');
    
    function genSystem( _class, _screen ) {
      var parent = document.createElement('div');
      parent.className = _screen;
      body.appendChild( parent );
      return new _class( parent );
    }
  
    genSystem( IBMPCat, 'screen640x400');
  }
  
  window.addEventListener('load', init);