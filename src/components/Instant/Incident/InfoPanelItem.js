import {ListItem} from "@mui/material";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import {LinkButton} from "../../utilities/Buttons";
import {ButtonWithModal} from "../../utilities/Modals";
import * as React from "react";

export default function(props) {
    return (
        <>
            <ListItem>
                <ListItemText
                    primary={props.header}
                    secondary={
                        <>
                            <Typography variant={"body2"}>
                                {props.href &&
                                    <>
                                        <LinkButton onClick={props.onClick} href={props.href}>
                                            {props.children}
                                        </LinkButton>
                                    </>
                                }
                                {props.modal &&
                                    <>
                                        <ButtonWithModal buttonText={props.children}>
                                            {props.modal}
                                        </ButtonWithModal>
                                    </>
                                }
                                {(!props.modal && !props.href) && props.children}
                            </Typography>
                        </>
                    }
                />
            </ListItem>
            {props.modal && <>

            </>}
        </>
    )
}
