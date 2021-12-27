import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "./Button";
import { useAuthProvider } from "../../Context";
import { Link as RouterLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alerts from "../common/Alert";
export default function BasicTextFields({ title }) {
    const { email, setEmail, password, setPassword, handleSubmit, isError } =
        useAuthProvider();
    return (
        <div>
            <div className="heading-container">
                <h3>{title} Form</h3>
            </div>
            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="email"
                    label="Enter the Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Enter the Password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isError.status && <Alerts />}
            </Box>
            <Button title={title} handleSubmit={handleSubmit} />
            {title === "Login" && <RouterLink to="/signup">SignUp</RouterLink>}
            {title === "SignUp" && <RouterLink to="/signin">SignIn</RouterLink>}
        </div>
    );
}
