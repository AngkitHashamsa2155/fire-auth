import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import { useAuthProvider } from "../../Context";
const Alerts = () => {
    const { isError, setError } = useAuthProvider();
    useEffect(() => {
        let timeOut = setTimeout(() => {
            setError({ status: false, msg: "" });
        }, 3000);
        return () => clearTimeout(timeOut);
    }, [isError]);
    return <Alert severity="warning">{isError.msg}</Alert>;
};

export default Alerts;
