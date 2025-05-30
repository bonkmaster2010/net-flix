import useLogin from "../Hooks/LoginStore";
import original from '../icons/netflixPfp.png';
import { useState, useEffect } from "react";
import '../styles/EditProfile.css'; 

function EditProfile() {
    const [newname, setNewName] = useState<string>('');
    const [profilePic, setProfilePic] = useState<string>(original);

    const {username, pfp, setUserName, setPfp, logout} = useLogin();

    useEffect(() => {
        if (pfp) {
            setProfilePic(pfp);
        }
    }, [pfp]);

    function saveName(name: string) {
        if (name.trim().length > 0) {
            setUserName(name);
        }
    }

function handlePicChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setProfilePic(base64String);
            setPfp(base64String);
        };
        reader.readAsDataURL(file);
    }
}

    return (
        <div className="edit-container">
            <div className="profile-preview">
            <img src={profilePic} alt="Profile" className="profile-img" />
            <label htmlFor="profilePicInput" className="upload-btn">+</label>
             <p className="profile-user">{username}</p>
            <div className="edit-username">
                <input
                    type="text"
                    placeholder="Enter username"
                    value={newname}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <button className="save-username" onClick={() => saveName(newname)}>Save</button>
            </div>
            <button className="logout-btn" onClick={logout}>Log Out</button>
                <input style={{display: "none"}} id="profilePicInput" type="file" accept="image/*" onChange={handlePicChange} />
            </div>
        </div>
    );
}

export default EditProfile;
