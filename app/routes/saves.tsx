import React, { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import '../../public/assets/style/saves.css';  // Make sure to import the CSS file

export default function Saves() {
  const [expandedBlocks, setExpandedBlocks] = useState({
    aboutme: false,
    projects: false,
    contact: false,
    home: false,
  });

  useEffect(() => {
    const blocksOrder = ['aboutme', 'projects', 'contact', 'home'];

    const openBlockSequentially = (index: number) => {
      if (index >= blocksOrder.length) return;

      const blockId = blocksOrder[index];
      setTimeout(() => {
        setExpandedBlocks(prevState => ({
          ...prevState,
          [blockId]: true
        }));
        openBlockSequentially(index + 1);
      }, 300); // Adjust delay as needed
    };

    openBlockSequentially(0);
  }, []);

  const handleMouseEnter = (blockId: keyof typeof expandedBlocks) => {
    setExpandedBlocks((prevState) => ({
      ...prevState,
      [blockId]: true,
    }));
  };

  return (
    <div className="gridContainer">
      <Link
        to={"../aboutme"}
        className={`block ${expandedBlocks.aboutme ? "expanded" : ""}`}
        onMouseEnter={() => handleMouseEnter("aboutme")}
      >
        <div className="content">
          <h2>ABOUT ME</h2>
          {expandedBlocks.aboutme && <img src="../../public/assets/image/underconstruction.png" alt="About Me" />}
        </div>
      </Link>
      <Link
        to={"../projects"}
        className={`block ${expandedBlocks.projects ? "expanded" : ""}`}
        onMouseEnter={() => handleMouseEnter("projects")}
      >
        <div className="content">
          <h2>PROJECTS</h2>
          {expandedBlocks.projects && <img src="../../public/assets/image/underconstruction.png" alt="Projects" />}
        </div>
      </Link>
      <Link
        to={"../contact"}
        className={`block ${expandedBlocks.contact ? "expanded" : ""}`}
        onMouseEnter={() => handleMouseEnter("contact")}
      >
        <div className="content">
          <h2>CONTACT</h2>
          {expandedBlocks.contact && <img src="../../public/assets/image/underconstruction.png" alt="Contact" />}
        </div>
      </Link>
      <Link
        to={"../"}
        className={`block ${expandedBlocks.home ? "expanded" : ""}`}
        onMouseEnter={() => handleMouseEnter("home")}
      >
        <div className="content">
          <h2>W.I.P.</h2>
          {expandedBlocks.home && <img src="../../public/assets/image/underconstruction.png" alt="W.I.P." />}
        </div>
      </Link>
    </div>
  );
}
