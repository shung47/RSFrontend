import PopupState, {bindHover, bindPopover, bindTrigger} from "material-ui-popup-state";
import Typography from "@material-ui/core/Typography";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import Box from "@material-ui/core/Box";
import * as React from "react";
import {PropTypes} from "@material-ui/core";
import {Variant} from "@mui/material/styles/createTypography";

interface PopoverTextProps {
    align?: PropTypes.Alignment;
    variant?: Variant;
    linkName: string;
    popupText: string;
    color: string;
}

export function PopoverText(props: PopoverTextProps) {
    return (
        <PopupState variant="popover">
            {popupState => (
                <div>
                    <Typography align={props.align || "left"} variant={props.variant || "body2"}
                                color={props.color || "inherit"}>
                        <Typography
                            variant={"inherit"}
                            {...bindHover(popupState)}
                            {...bindTrigger(popupState)}
                        >
                            {props.linkName}
                        </Typography>
                    </Typography>
                    <HoverPopover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center"
                        }}
                    >
                        <Box p={1}>
                            <Typography variant={"body2"}>{props.popupText}</Typography>
                        </Box>
                    </HoverPopover>
                </div>
            )}
        </PopupState>
    )
}
