interface UnAuthorizedAccessScreenProps {
    onClick : () => void
}

const UnAuthorizedAccessScreen : React.FC<UnAuthorizedAccessScreenProps> = ({onClick}) => {
    return <div className="container text-center">
        <p className="error">Unauthorized Access, please try again.</p>
        <button onClick={() => {
            if(onClick) onClick();
        }}>Go Back</button>
    </div>
}

export default UnAuthorizedAccessScreen;