import React, { useState, useRef, useEffect } from 'react';
import Typewriter from 'typewriter-effect';

export default function AboutMe() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shouldType, setShouldType] = useState(true);
    const [currentImage, setCurrentImage] = useState('../../public/assets/image/self-image-1.png');
    const imageChangeSpeed = 300; // Speed in milliseconds
    const typewriterRef = useRef<any>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const lines = [
        'Greetings',
        'My name is Rick Ambergen, and I am a 22-year-old student at Alfa-College Groningen.',
        'I am currently studying Software Development, currently in my second year but with summer vacation coming up I will go to my third year.',
        'My favorite parts about software development are the problem-solving and the creativity.',
        'I enjoy solving problems, and I like to be creative with my solutions.',
        'In the future, I see myself doing fullstack development. But for right now, I am focusing on frontend development.',
        'But I am always open to learning new things, and I am always looking for new challenges.',
        'And in my spare time, I like to play video games, watch movies, listen to music and play trading card games.',
        'My favorite game is Bloodborne, my favorite movie is Spiderman into the spiderverse and my favorite artist is MF DOOM.',
        'Well that is about all to say about me',
        'Thank you for your time and I hope you have a great day!'
    ];

    const images = [
        '../../public/assets/image/self-image-1.png',
        '../../public/assets/image/self-image-2.png'
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
            const currentString = lines[currentIndex];
            const deleteSpeed = 2000 / currentString.length; // Calculate deleteSpeed based on string length

            typewriterRef.current
                .pauseFor(100) // Pause before deleting
                .callFunction(() => {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current); // Stop image swapping when deleting starts
                    }
                    if (audioRef.current) {
                        audioRef.current.pause(); // Ensure audio is stopped before deleting
                        audioRef.current.currentTime = 0;
                    }
                })
                .deleteAll(deleteSpeed) // Delete the current string with calculated speed
                .callFunction(() => {
                    intervalRef.current = setInterval(() => {
                        setCurrentImage((prevImage) =>
                            prevImage === images[0] ? images[1] : images[0]
                        );
                    }, imageChangeSpeed); // Start image swapping when typing starts
                    if (audioRef.current) {
                        audioRef.current.play(); // Start audio when typing starts
                    }
                })
                .typeString(lines[currentIndex]) // Type the next string
                .pauseFor(200) // Pause after typing
                .callFunction(() => {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current); // Stop image swapping when typing ends
                    }
                    setCurrentImage(images[0]); // Reset to the first image
                    if (audioRef.current) {
                        audioRef.current.pause(); // Stop audio when typing ends
                        audioRef.current.currentTime = 0; // Reset audio to start
                    }
                })
                .start();
        }
    }, [currentIndex, shouldType]);

    return (
        <div>
            <img src={currentImage} alt="Profile" style={{ width: '150px', height: '150px' }} />
            <Typewriter
                onInit={(typewriter) => {
                    typewriterRef.current = typewriter;
                    typewriter
                        .typeString(lines[currentIndex])
                        .pauseFor(200)
                        .callFunction(() => {
                            console.log('Pausing for button press');
                        })
                        .pauseFor(100) // Pause to wait for button press
                        .callFunction(() => {
                            console.log('Continuing after button press');
                        })
                        .start();
                }}
                options={{
                    autoStart: true,
                    loop: false, // Change to false to avoid looping during the test
                    delay: 50, // Typing speed, lower is faster
                }}
            />
            <button onClick={handleNextStep}>
                Next
            </button>
            <audio ref={audioRef} src="../../public/assets/audio/typing-sound.wav" />
        </div>
    );
}
