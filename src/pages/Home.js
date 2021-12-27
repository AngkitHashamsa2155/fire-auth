import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    let navigate = useNavigate();

    // }, [getAuthToken]);
    return (
        <div>
            <button
                onClick={() => {
                    sessionStorage.removeItem("Auth Token");
                    navigate("/signin");
                }}
            >
                log out
            </button>
        </div>
    );
};

export default Home;
