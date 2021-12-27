import React, { useState, useContext } from "react";
import { app } from "./firebase.config";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState({ status: false, msg: "" });
    const navigate = useNavigate();
    const getAuthToken = () => {
        return sessionStorage.getItem("Auth Token");
    };

    const handleSubmit = async (id) => {
        const authentication = getAuth();

        if (!email && !password) {
            alert("please fill up the form");
        }
        if (email && password) {
            setIsLoading(true);
            if (id === "Login") {
                signInWithEmailAndPassword(authentication, email, password)
                    .then((res) => {
                        if (res) {
                            console.log(res);
                            sessionStorage.setItem(
                                "Auth Token",
                                res._tokenResponse.refreshToken
                            );
                            setIsLoading(false);
                            navigate("/");
                        }
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        console.log(err.code);
                        if (err.code === "auth/invalid-email") {
                            setError({ status: true, msg: "invalid user" });
                        }
                        if (err.code === "auth/wrong-password") {
                            setError({ status: true, msg: "invalid password" });
                        }
                    });
                setEmail("");
                setPassword("");
            }
            if (id === "SignUp") {
                createUserWithEmailAndPassword(authentication, email, password)
                    .then((res) => {
                        sessionStorage.setItem(
                            "Auth Token",
                            res._tokenResponse.refreshToken
                        );
                        setIsLoading(false);
                        navigate("/");
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        console.log(err.code);
                        if (err.code === "auth/email-already-in-use") {
                            setError({
                                status: true,
                                msg: "email-already-in-use",
                            });
                        }
                        if (err.code === "auth/weak-password") {
                            setError({
                                status: true,
                                msg: "auth/weak-password",
                            });
                        }
                    });
                setEmail("");
                setPassword("");
            }
        }
    };
    return (
        <AuthContext.Provider
            value={{
                email,
                setEmail,
                password,
                setPassword,
                handleSubmit,
                getAuthToken,
                isLoading,
                isError,
                setError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthProvider = () => {
    return useContext(AuthContext);
};
