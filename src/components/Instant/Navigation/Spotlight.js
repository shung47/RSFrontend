import Box from "@material-ui/core/Box";
import * as React from "react";

interface SpotlightProps {
    heading: string;
    highlightedNumber: string;
    description?: string;
}

export function Spotlight(props: SpotlightProps) {
    return <Box
        sx={{
            bgcolor: "#41C363FF",
            boxShadow: 4,
            borderRadius: 5,
            p: 2,
            minWidth: "100%",
        }}
    >
        <Box sx={{color: "white"}}>{props.heading}</Box>
        <Box sx={{color: "white", fontSize: "2rem", fontWeight: "medium"}}>
            {props.highlightedNumber}
        </Box>
        <Box sx={{color: "white", display: "inline", fontSize: "0.75rem",}}>
            {props.description}
        </Box>
    </Box>;
}
