import { useNavigate } from "react-router";

const UnAuthorizedAccessScreen = () => {
    const navigate = useNavigate();
    return <div className="container text-center">
        <p className="error">Unauthorized Access, please try again.</p>
        <button onClick={() => {
            navigate("/", { replace: true});
        }}>Go Back</button>
    </div>
}

export default UnAuthorizedAccessScreen;