import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuthProvider } from "./Context";

function App() {
    const { getAuthToken, isLoading } = useAuthProvider();
    let navigate = useNavigate();
    useEffect(() => {
        console.log("checking");
        let authToken = getAuthToken();
        if (authToken) {
            navigate("/");
        } else {
            navigate("/signin");
        }
    }, []);
    if (isLoading) {
        return (
            <div>
                <h3>Loading ...</h3>
            </div>
        );
    }
    return (
        <Routes>
            <Route path="/signin" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    );
}

export default App;
