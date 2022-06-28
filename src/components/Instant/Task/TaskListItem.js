import {Card, CardActionArea, CardContent} from "@mui/material";
import * as React from "react";
import Typography from "@material-ui/core/Typography";

interface TaskListItemProps {
    taskName: string;
    lastIncident: string;
    outlined?: boolean;
}

export default function (props: TaskListItemProps) {
    const cardVariant = props.outlined ? "outlined" : "elevation"
    return (
        <Card elevation={0} variant={cardVariant}>
            <CardActionArea href={"./incident"}>
                <CardContent>
                    <Typography variant="h6">
                        {props.taskName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Last incident at {props.lastIncident}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
