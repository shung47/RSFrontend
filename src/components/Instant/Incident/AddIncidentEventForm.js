import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {ButtonGroup, ListSubheader, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import Chip from "@mui/material/Chip";
import * as React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

interface createIncidentEventsProps {
    defaultEventType?: string
}

export default function (props: createIncidentEventsProps) {
    let eventTypes = [
        {
            value: 'add_remark',
            label: 'Add Remark',
        },
        {
            value: 'notify_users',
            label: 'Notify Users',
        },
        {
            value: 'change_pics',
            label: 'Change PICs',
        },
        {
            value: 'resolve',
            label: 'Resolve',
        },
    ];

    eventTypes.push({
        value: 'followup',
        label: 'Follow Up',
    })

    eventTypes.push({
        value: 'reopen',
        label: 'Reopen Incident',
    })

    const [eventType, setEventType] = React.useState(props.defaultEventType);

    const handleEventTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEventType(event.target.value);
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            },
        },
    };

    const userGroups = [
        {
            value: 'cdba_member',
            label: 'CDBA Member',
        },
        {
            value: 'cdba_sa',
            label: 'CDBA SA',
        },
        {
            value: 'cdba_ba',
            label: 'CDBA BA',
        },
        {
            value: 'pic',
            label: 'PICs',
        },
        {
            value: 'affected_users',
            label: 'Affected Users (27)',
        },
        {
            value: 'department_cs',
            label: 'CS Department',
        },
        {
            value: 'department_mm',
            label: 'MM Department',
        },
    ];

    const users = [
        {
            value: 'cychan',
            label: 'CY Chan',
        },
        {
            value: 'felixwan',
            label: 'Felix Wan',
        },
        {
            value: 'dianawong',
            label: 'Diana Wong',
        },
        {
            value: 'cathaychen',
            label: 'Cathay Chen',
        },
        {
            value: 'juliaang',
            label: 'Julia Ang',
        },
    ];

    const [alertGroupValue, setAlertGroupValue] = React.useState([]);
    const [picValue, setPICValue] = React.useState(['felixwan']);

    const handleAlertGroupValueChange = (event: SelectChangeEvent<typeof alertGroupValue>) => {
        const {
            target: {value},
        } = event;
        setAlertGroupValue(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handlePICValueChange = (event: SelectChangeEvent<typeof picValue>) => {
        const {
            target: {value},
        } = event;
        setPICValue(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <>
            <Typography variant={"h6"}>
                Add Event
            </Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >
                <Box m={1}/>
                <FormControl fullWidth>
                    <TextField
                        select
                        id="outlined-select-currency"
                        labelId="event-type-label"
                        label={"Event Type"}
                        value={eventType}
                        onChange={handleEventTypeChange}
                        fullWidth={true}
                    >
                        {eventTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
                <Box sx={{m: 5}}/>
                {/*Add Remark*/}
                {eventType === "add_remark" &&
                    <>
                        <TextField
                            id="outlined-multiline-static"
                            label="Remarks"
                            multiline
                            minRows={4}
                            fullWidth={true}
                        />
                    </>
                }
                {/*Notify Users*/}
                {eventType === "notify_users" &&
                    <>
                        <FormControl sx={{width: "100%"}}>
                            <InputLabel id="recipients-label">Recipients</InputLabel>
                            <Select
                                labelId="recipients-label"
                                id="recipients"
                                multiple
                                value={alertGroupValue}
                                onChange={handleAlertGroupValueChange}
                                input={<OutlinedInput id="select-multiple-recipients" label="Recipients"/>}
                                renderValue={(selected) => (
                                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                        {
                                            selected.map((value) => (
                                                <Chip key={value} label={value}/>
                                            ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                fullWidth={true}
                            >
                                <ListSubheader disabled>Alert Group</ListSubheader>
                                {userGroups.map((options) => (
                                    <MenuItem
                                        key={options.value}
                                        value={options.value}
                                    >
                                        {options.label}
                                    </MenuItem>
                                ))}
                                <ListSubheader disabled>Users</ListSubheader>
                                {users.map((options) => (
                                    <MenuItem
                                        key={options.value}
                                        value={options.value}
                                    >
                                        {options.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </>
                }
                {/*Change PICs*/}
                {eventType === "change_pics" &&
                    <>
                        <FormControl sx={{width: "100%"}}>
                            <InputLabel id="people-in-charge-label">People in Charge</InputLabel>
                            <Select
                                labelId="people-in-charge-label"
                                id="people-in-charge"
                                multiple
                                value={picValue}
                                onChange={handlePICValueChange}
                                input={<OutlinedInput id="select-multiple-people-in-charge" label="People in Charge"/>}
                                renderValue={(selected) => (
                                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value}/>
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                fullWidth={true}
                            >
                                <ListSubheader disabled>CDBA Users</ListSubheader>
                                {users.map((options) => (
                                    <MenuItem
                                        key={options.value}
                                        value={options.value}
                                    >
                                        {options.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Remarks"
                            multiline
                            minRows={4}
                            fullWidth={true}
                        />
                    </>
                }
                {/*Resolve*/}
                {eventType === "resolve" &&
                    <>
                        <TextField
                            label="Remarks"
                            multiline
                            minRows={4}
                            fullWidth={true}
                        />
                    </>
                }
                {/*Follow Up*/}
                {eventType === "followup" &&
                    <>
                        <TextField
                            label="Remarks"
                            multiline
                            minRows={4}
                            fullWidth={true}
                        />
                    </>
                }
                {/*Reopen*/}
                {eventType === "reopen" &&
                    <>
                        <TextField
                            label="Remarks"
                            multiline
                            minRows={4}
                            fullWidth={true}
                        />
                    </>
                }
                {/*Any Event Type*/}
                {eventType &&
                    <>
                        <Box sx={{m: 3}}/>
                        <Grid container direction={"row"} justifyContent={"flex-end"}>
                            <ButtonGroup variant="text">
                                <Button variant="contained" color="primary">Submit</Button>
                            </ButtonGroup>
                        </Grid>
                    </>
                }
            </Box>
        </>
    )
}
