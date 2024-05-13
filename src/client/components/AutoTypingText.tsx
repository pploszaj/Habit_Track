import React, { useState, useEffect } from "react";

interface AutoTypingTextProps {
    text: string;
    speed?: number;
}

const AutoTypingText = ({ text, speed = 100 }: AutoTypingTextProps) => {
    const [displayedText, setDisplayedText] = useState("")
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + text.charAt(index));
                setIndex(index + 1);
            }, speed);
            return () => clearTimeout(timer);
        }
    }, [index, text, speed]);
    return <span> {displayedText}</span>;
};
    export default AutoTypingText;


