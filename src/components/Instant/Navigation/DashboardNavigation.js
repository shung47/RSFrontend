import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Divider} from "@mui/material";
import Grid from "@material-ui/core/Grid";
import * as React from "react";
import {LinkButton} from "../../utilities/Buttons";
import {ChevronLeft} from "@material-ui/icons";

interface DashboardNavigationProps {
    heading: string;
    backButtonName?: string;
    backButtonLink?: string;
    children?: JSX.Element;
}

export default function (props: DashboardNavigationProps) {
    return (
        <>
            <Box>
                <h1>
                    {props.backButtonName &&
                        <>
                            <Typography>
                                <LinkButton href={props.backButtonLink} variant={"body1"}
                                            actionIcon={<ChevronLeft fontSize="inherit"/>}
                                            iconLocation={"left"}>{props.backButtonName}</LinkButton>
                            </Typography>
                        </>
                    }
                    {/*{props.subheading && <Typography variant={"subtitle1"}>{props.subheading}</Typography>}*/}
                    {props.heading}
                </h1>
            </Box>
            <Box sx={{alignItems: "flex-start", textAlign: "left"}}>
                <Grid container spacing={1} direction={"row"}>
                    {props.children}
                </Grid>
            </Box>
            {props.children && <Box sx={{mt: 2, mb: 2}}/>}
            {!props.children && <Divider sx={{mt: 2, mb: 2}}/>}
        </>
    )
}

