import React, { useState, useRef, useEffect } from 'react';
import Typewriter from 'typewriter-effect';

export default function AboutMe() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shouldType, setShouldType] = useState(true);
    const typewriterRef = useRef<any>(null);
    const lines = [
        'Greetings',
        'My name is Rick Ambergen, and I am a 22-year-old student at Alfa-College Groningen.',
        'I am currently studying Software Development, currently in my second year but with summer vacation comming up I will go to my third year.',
        'My favorite parts about software development are the problem-solving and the creativity.',
        'I enjoy solving problems, and I like to be creative with my solutions.',
        'In the future, I see myself doing fullstack development. But for right now, I am focusing on frontend development.',
        'But I am always open to learning new things, and I am always looking for new challenges.',
        'And in my spare time, I like to play video games, watch movies, listen to music and play trading card games.',
        'My favorite game is Bloodborne, my favorite movie is Spiderman into the spiderverse and my favorite artist is MF DOOM.',
        'Well that is about all to say about me',
        'Thank you for your time and I hope you have a great day!'
    ];

    const handleNextStep = () => {
        console.log('Next button clicked');
        setCurrentIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % lines.length;
            setShouldType(true);
            return nextIndex;
        });
    };

    useEffect(() => {
        if (shouldType && typewriterRef.current) {
            setShouldType(false);
            typewriterRef.current
                .pauseFor(100) // Pause for 2 seconds before deleting
                .deleteAll() // Delete the current string
                .typeString(lines[currentIndex]) // Type the next string
                .pauseFor(200) // Pause for 2 seconds after typing
                .start();
        }
    }, [currentIndex, shouldType]);

    return (
        <div>
            <Typewriter
                onInit={(typewriter) => {
                    typewriterRef.current = typewriter;
                    typewriter
                        .typeString(lines[currentIndex])
                        .pauseFor(200)
                        .callFunction(() => {
                            console.log('Pausing for button press');
                        })
                        .pauseFor(100) // Large pause to wait for button press
                        .callFunction(() => {
                            console.log('Continuing after button press');
                        })
                        .start();
                }}
                options={{
                    autoStart: true,
                    loop: false, // Change to false to avoid looping during the test
                    delay: 50,
                }}
            />
            <button onClick={handleNextStep}>
                Next
            </button>
        </div>
    );
}
