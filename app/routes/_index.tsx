import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from 'react';
import "../../public/assets/style/index.css";

const Quotes = [
  "Terraria <3",
  "Bloodborne <3",
  "Look at this funny little character!",
  { text: "Also check out Sylvan's work!", link: "https://www.kharua.xyz/" },
  { text: "Also check out Ryan's work!", link: "https://naamloos.dev" },
  "Now with some new code!",
  "Software development!",
];

function getRandomQuote() {
  return Quotes[Math.floor(Math.random() * Quotes.length)];
}

export default function QuotesPage() {
  const [quote, setQuote] = useState<{ text: string; link: string; }>({ text: "", link: "" });

  useEffect(() => {
    const displayQuote = () => {
      const newQuote = getRandomQuote();
      if (typeof newQuote === 'string') {
        setQuote({ text: newQuote, link: "" });
      } else {
        setQuote(newQuote);
      }
    };

    displayQuote();

    const intervalId = setInterval(displayQuote, 20000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const logo = document.querySelector('.logo img') as HTMLImageElement;

    function redirectToNewPage() {
      if (logo) {
        // Fade out the logo
        logo.style.opacity = '0';
        logo.style.transition = 'opacity 1s';
      }

      // After another delay, redirect to another page
      setTimeout(function() {
        window.location.href = '/IBMPC'; // Replace with your new page URL
      }, 1000); // 1000 milliseconds (1 seconds)
    }

    document.addEventListener('keypress', redirectToNewPage);
    document.addEventListener('click', redirectToNewPage);

    return () => {
      document.removeEventListener('keypress', redirectToNewPage);
      document.removeEventListener('click', redirectToNewPage);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(e.currentTarget.href, '_blank', 'noopener,noreferrer');
  };

  const handleRickVlogsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    e.preventDefault();
    window.location.href = '/rickvlogs'; // Replace with the secret page URL
  };

  return (
    <div>
      <div className="logo-container">
        <div className="logo">
          <img src="./public/assets/image/rickambergen.gif" alt="Rick Ambergen" />
        </div>
        {quote.link ? (
          <p className="subtitle">
            <a href={quote.link} target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
              {quote.text}
            </a>
          </p>
        ) : (
          <p className="subtitle" id="quote">{quote.text}</p>
        )}
      </div>

      <div className="continue blinking-text">
        <p>PRESS ANYTHING TO CONTINUE</p>
      </div>

      <div className="copyright">
        <p>© RICK AMBERGEN <a id="rickvlogs" href="/rickvlogs" onClick={handleRickVlogsClick} style={{ cursor: 'text', textDecoration: 'none', color: 'inherit' }}>20</a>02</p>
      </div>
    </div>
  );
}
