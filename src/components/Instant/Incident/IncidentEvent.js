import {
    Card,
    CardActionArea,
    CardContent,
    Collapse, Divider,
    IconButtonProps,
    ListItem,
    ListItemAvatar,
    styled
} from "@mui/material";
import IconButton from "@material-ui/core/IconButton";
import * as React from "react";
import Avatar from "@material-ui/core/Avatar";
import {Event, MoreHoriz, Undo} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {PopoverText} from "../../utilities/Popover";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";
import {LinkButton} from "../../utilities/Buttons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

interface incidentEventProps {
    icon?: JSX.Element;
    eventName: JSX.Element;
    eventType: string;
    description: JSX.Element;
    createdAt: string;
    detailedCreatedAt: string;
    children?: JSX.Element;
    ableToUndo?: boolean;
}

export default function(props: incidentEventProps) {
    interface ExpandMoreProps extends IconButtonProps {
        expand: boolean;
    }

    const ExpandMore = styled((props: ExpandMoreProps) => {
        const {expand, ...other} = props;
        return <IconButton {...other} />;
    })(({theme, expand}) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <>
            <Card sx={{mb: 1}} elevation={0 || (expanded && 1)}>
                <CardActionArea onClick={handleExpandClick}>
                    <CardContent sx={{m: -2}}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar>
                                    {props.icon}
                                    {!props.icon && <Event/>}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Grid container>
                                        <Grid item md>
                                            {props.eventName}
                                        </Grid>
                                        <Grid item md>
                                            {!expanded &&
                                                <Box textAlign={"right"}>
                                                    <PopoverText
                                                        linkName={props.createdAt}
                                                        popupText={props.detailedCreatedAt}
                                                        align={"right"}
                                                        variant={"body2"}
                                                        color={"disabled"}
                                                    />
                                                </Box>
                                            }
                                        </Grid>
                                    </Grid>
                                }
                                secondary={
                                    <>

                                        <Typography variant="body2">
                                            {!expanded &&
                                                props.description
                                            }
                                            {expanded &&
                                                <Box sx={{ fontStyle: 'italic' }}>Click to collapse</Box>
                                            }
                                        </Typography>
                                        {!expanded &&
                                            <>
                                                <Grid container>
                                                    <Grid item md={6}>
                                                        <Box sx={{mt: 1}}>
                                                            <Typography variant="body2" align={"left"}>
                                                                {props.createdBy}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <Box textAlign={"right"} sx={{mt: 1}}>
                                                            <MoreHoriz color={"disabled"}/>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </>
                                        }
                                    </>
                                }
                            />
                        </ListItem>
                    </CardContent>
                </CardActionArea>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Box sx={{alignContent: 'flex-start', textAlign: 'left'}}>
                            <List>
                                <ListItem>
                                    <ListItemText primary={props.description}/>
                                </ListItem>
                                <Divider/>
                                {props.children}
                            </List>
                        </Box>
                        {props.children && <Divider/>}
                        <ListItem>
                            <Grid container direction="row" alignItems="flex-end" spacing={2}>
                                <Grid item md={6}>
                                    <Typography variant={"body2"}>
                                        {props.eventType}
                                    </Typography>
                                    <Typography variant={"body2"} align={"left"}>
                                        Created by&nbsp;
                                        {props.createdBy && (
                                            <Link href={"#"}>
                                                {props.createdBy}
                                            </Link>
                                        )}
                                        {!props.createdBy && "System"}
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant={"body2"} align={"right"}>
                                        {props.detailedCreatedAt}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem sx={{mb: -3}}>
                            {props.ableToUndo &&
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                >
                                    {props.ableToUndo &&
                                        <Grid item>
                                            <LinkButton actionIcon={<Undo/>}></LinkButton>
                                        </Grid>
                                    }
                                    <Grid item>
                                        <ExpandMore
                                            expand={expanded}
                                            onClick={handleExpandClick}
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon/>
                                        </ExpandMore>
                                    </Grid>
                                </Grid>
                            }
                        </ListItem>
                    </CardContent>
                </Collapse>
            </Card>
        </>
    )
}
