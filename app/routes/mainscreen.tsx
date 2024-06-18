import { useEffect } from 'react';
import "../../public/assets/style/index.css";

export default function QuotesPage() {

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
        window.location.href = '/saves'; // Replace with your new page URL
      }, 1000); // 1000 milliseconds (1 seconds)
    }

    return () => {
      document.removeEventListener('keypress', redirectToNewPage);
      document.removeEventListener('click', redirectToNewPage);
    };
  }, []);

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
