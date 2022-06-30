import {Card, CardActionArea, CardContent} from "@mui/material";
import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

interface IncidentListItemProps {
    incidentId: string;
    dependency: string;
    friendlyTime: string;
    affectedTaskCount?: number;
    affectedUserCount?: number;
    outlined?: boolean;
}

export default function(props: IncidentListItemProps) {
    const cardVariant = props.outlined ? "outlined" : "elevation"
    return (
        <Card elevation={0} variant={cardVariant}>
            <CardActionArea href={"./incident"}>
                <CardContent>
                    <Grid container direction={"row"}>
                        <Grid item md>
                            <Typography variant="h6">
                                {props.incidentId}
                            </Typography>
                        </Grid>
                        <Grid item md>
                            <Typography variant="body2" align={"right"} color="textSecondary">
                                {props.friendlyTime}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="body2" color="textSecondary">
                        {props.dependency}
                    </Typography>
                    {props.affectedTaskCount &&
                        <Typography variant="body2" color="textSecondary">
                            {props.affectedTaskCount} tasks affected
                        </Typography>
                    }
                    {props.affectedUserCount &&
                        <Typography variant="body2" color="textSecondary">
                            {props.affectedUserCount} users affected
                        </Typography>
                    }
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
