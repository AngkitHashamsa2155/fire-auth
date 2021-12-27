import * as React from "react";
import Button from "@mui/material/Button";

export default function BasicButtons({ title, handleSubmit }) {
    return (
        <Button variant="contained" onClick={() => handleSubmit(title)}>
            {title}
        </Button>
    );
}
