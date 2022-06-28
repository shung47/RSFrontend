import {Card, CardActionArea, CardContent} from "@mui/material";
import * as React from "react";
import Typography from "@material-ui/core/Typography";

interface TaskDependencyListItemProps {
    dependencyName: string;
    lastIncident: string;
    outlined?: boolean;
}

export default function(props: TaskDependencyListItemProps) {
    const cardVariant = props.outlined ? "outlined" : "elevation"
    return (
        <Card elevation={0} variant={cardVariant}>
            <CardActionArea href={"./taskDependency"}>
                <CardContent>
                    <Typography variant="h6">
                        {props.dependencyName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Last incident at {props.lastIncident}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
