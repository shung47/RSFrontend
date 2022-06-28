import {Card, CardActionArea, CardContent, Collapse, IconButtonProps, styled} from "@mui/material";
import IconButton from "@material-ui/core/IconButton";
import * as React from "react";
import {MoreHoriz} from "@material-ui/icons";
import Box from "@material-ui/core/Box";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

export const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface CollapseCardProps {
    children: JSX.Element;
    collapseContent: JSX.Element;
    elevation?: number;
    outlined?: boolean;
    color?: string;
}

export function CollapseCard(props: CollapseCardProps) {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const elevation = props.outlined ? 0 : props.elevation
    const cardVariant = props.outlined ? "outlined" : "elevation"

    return (
        <>
            <Card
                sx={{mb: 1, backgroundColor: props.color || "inherit"}} elevation={elevation || (expanded && 1)}
                variant={cardVariant}
            >
                <CardActionArea onClick={handleExpandClick}>
                    <CardContent>
                        {props.children}
                        {!expanded &&
                            <Box textAlign={"right"}>
                                <MoreHoriz color="disabled"/>
                            </Box>
                        }
                    </CardContent>
                </CardActionArea>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {props.collapseContent}
                    </CardContent>
                </Collapse>
            </Card>
        </>
    )
}
