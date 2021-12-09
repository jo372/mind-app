import React, { useEffect } from 'react';
import { AiOutlineMeh } from 'react-icons/ai';
import { RiEmotionHappyLine, RiEmotionUnhappyLine } from 'react-icons/ri';

export enum Mood {
    Happy = "happy",
    Sad = "sad",
    Meh = "meh",  
}

interface MoodSelectorProps {
    onClick: (mood: Mood | undefined) => void;
    currentActiveMood: Mood | undefined;
}

const MoodSelector = (props: MoodSelectorProps) => {
    const [activeElement, setActiveElement] = React.useState<HTMLButtonElement | undefined>();
    useEffect(() => {
        if(props.currentActiveMood) {
            const el = document.querySelector(`[data-mood="${props.currentActiveMood}"]`) as HTMLButtonElement;
            if(el) {
                el.classList.add("active");
            }
            setActiveElement(el);
        }
    }, [props.currentActiveMood]);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, mood: Mood) => {
        const prevActiveElement = document.querySelector(".btn.mood.active");
        
        const _activeElement = event.currentTarget as HTMLButtonElement;
        setActiveElement(_activeElement);
        
        if(prevActiveElement && prevActiveElement === activeElement) {
            prevActiveElement.classList.toggle('active');
        }

        if(_activeElement !== prevActiveElement) _activeElement.classList.toggle('active');

        const anyMoodSelected = document.querySelector(".btn.mood.active");
        
        props.onClick(anyMoodSelected !== null ? mood : undefined);
    }
    return <div className="mood-selector">
        <button className="btn mood" data-mood={Mood.Happy} onClick={(e) => handleClick(e, Mood.Happy)}><RiEmotionHappyLine/></button>
        <button className="btn mood" data-mood={Mood.Meh} onClick={(e) => handleClick(e, Mood.Meh)}><AiOutlineMeh/></button>
        <button className="btn mood" data-mood={Mood.Sad} onClick={(e) => handleClick(e, Mood.Sad)}><RiEmotionUnhappyLine/></button>
    </div>
};

export default MoodSelector;