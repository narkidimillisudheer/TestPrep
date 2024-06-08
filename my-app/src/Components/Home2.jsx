import React, { useEffect, useState } from "react";
import { signOut } from "supertokens-auth-react/recipe/session";
import Session from "supertokens-auth-react/recipe/session";
import { useNavigate } from 'react-router-dom';

function Home2() {
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function checkSession() {
            if (await Session.doesSessionExist()) {
                const id = await Session.getUserId();
                setUserId(id);
            } else {
                navigate('/auth2');
            }
        }
        checkSession();
    }, [navigate]);

    async function onLogout() {
        await signOut();
        alert("Logout successful");
        navigate('/auth2'); // Redirect using navigate
    }

    return (
        <ul>
            <li>{userId}</li>
            <li>Home</li>
            <li onClick={onLogout}>Logout</li>
        </ul>
    );
}

export default Home2;
