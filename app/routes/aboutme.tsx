import { useState, useRef, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import '../../public/assets/style/aboutme.css';

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
            const deleteSpeed = 2000 / currentString.length; 

            typewriterRef.current
                .pauseFor(100)
                .callFunction(() => {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                    if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                    }
                })
                .deleteAll(deleteSpeed) 
                .callFunction(() => {
                    intervalRef.current = setInterval(() => {
                        setCurrentImage((prevImage) =>
                            prevImage === images[0] ? images[1] : images[0]
                        );
                    }, imageChangeSpeed); 
                    if (audioRef.current) {
                        audioRef.current.play(); 
                    }
                })
                .typeString(lines[currentIndex]) 
                .pauseFor(200) 
                .callFunction(() => {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current); 
                    }
                    setCurrentImage(images[0]); 
                    if (audioRef.current) {
                        audioRef.current.pause(); 
                        audioRef.current.currentTime = 0; 
                    }
                })
                .start();
        }
    }, [currentIndex, shouldType]);

    return (
        <div className="container">
            <img src={currentImage} alt="Profile" className="profile-image" />
            <div className="typewriter-container">
                <Typewriter
                    onInit={(typewriter) => {
                        typewriterRef.current = typewriter;
                        typewriter
                            .typeString(lines[currentIndex])
                            .pauseFor(200)
                            .callFunction(() => {
                                console.log('Pausing for button press');
                            })
                            .pauseFor(100) 
                            .callFunction(() => {
                                console.log('Continuing after button press');
                            })
                            .start();
                    }}
                    options={{
                        autoStart: true,
                        loop: false, 
                        delay: 50, 
                    }}
                />
            </div>
            <button onClick={handleNextStep} className="next-button">
                Next
            </button>
            <audio ref={audioRef} src="../../public/assets/audio/typing-sound.wav" />
        </div>
    );
}
