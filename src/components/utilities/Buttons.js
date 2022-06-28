import {Variant} from "@mui/material/styles/createTypography";
import Typography from "@material-ui/core/Typography";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import * as React from "react";

interface LinkButtonProps {
    children?: JSX.Element;
    onclick?: any;
    variant?: Variant;
    href?: string;
    actionIcon?: JSX.Element;
    iconLocation?: "left" | "right";
}

export function LinkButton(props: LinkButtonProps) {
    const iconLocation = !props.iconLocation ? "right" : props.iconLocation
    const variant = props.variant ? props.variant : "body2"
    const { children, onclick, href, actionIcon, ...other } = props;
    return (
        <Typography variant={variant} {...other}>
            <IconButton onClick={props.onClick} href={props.href} aria-label="view" size="small">
                {iconLocation === "left" &&
                    <>
                        {!props.actionIcon && (
                            <ChevronLeft fontSize="inherit"/>
                        )}
                        {props.actionIcon}
                    </>
                }
                <Typography variant={variant}>
                    {props.children}
                </Typography>
                {iconLocation === "right" &&
                    <>
                        {!props.actionIcon && (
                            <ChevronRight fontSize="inherit"/>
                        )}
                        {props.actionIcon}
                    </>
                }

            </IconButton>
        </Typography>
    )
}
