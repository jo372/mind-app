enum Mood {
    Happy = "happy",
    Sad = "sad",
    Meh = "meh",  
}

interface MoodSelectorProps {
    onClick: (mood: Mood) => void;
}

const MoodSelector = (props: MoodSelectorProps) => {
    return (
        <div className="mood-selector">
            <button onClick={() => props.onClick(Mood.Happy)}>Happy</button>
            <button onClick={() => props.onClick(Mood.Sad)}>Sad</button>
            <button onClick={() => props.onClick(Mood.Meh)}>Meh</button>
        </div>
    );
};

export default MoodSelector;