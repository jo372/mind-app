import { BiMessageAdd } from "react-icons/bi";
import { CgTranscript } from "react-icons/cg";

const UserHome = () => {
    return <div className="user-home">
        <div className="left-column">
            <div className="content">
                <CgTranscript />
                <p>View entries</p>
            </div>
        </div>
        <div className="right-column">
            <div className="content">
                <BiMessageAdd/>
                <p>Add a new entry</p>
            </div>
        </div>
    </div>;
}

export default UserHome;