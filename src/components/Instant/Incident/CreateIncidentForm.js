import Typography from "@material-ui/core/Typography";
import * as React from "react";
import {ChangeEvent} from "react";
import Box from "@material-ui/core/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@mui/material/MenuItem";
import {OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

export default function (props) {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            },
        },
    };

    const incidentTypes = [
        {
            value: 'dependencyBased',
            label: 'Dependency Based'
        },
        // {
        //     value: 'taskBased',
        //     label: 'Task Based'
        // }
    ]
    const dependencies = [
        {
            value: 'bb',
            label: 'BookBill',
        },
        {
            value: 'so_backlog',
            label: 'SO Backlog',
        },
        {
            value: 'inventory',
            label: 'Inventory',
        },
        {
            value: 'po_backlog',
            label: 'PO Backlog',
        },
        {
            value: 'drms',
            label: 'DRMS',
        },
        {
            value: 'quote_data',
            label: 'Quote Data',
        },
    ];

    const [incidentTypeValue, setIncidentTypeValue] = React.useState('');
    const handleIncidentTypeValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIncidentTypeValue(event.target.value);
    };

    const [dependencyValue, setDependencyValue] = React.useState([]);
    const handleDependencyValueChange = (event: SelectChangeEvent<typeof dependencyValue>) => {
        const {
            target: {value},
        } = event;
        setDependencyValue(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <>
            <Typography variant={"h6"}>
                Create Incident
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
                        label={"Incident Type"}
                        value={incidentTypeValue}
                        onChange={handleIncidentTypeValueChange}
                        fullWidth={true}
                    >
                        {incidentTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
                <Box sx={{m: 5}}/>
                {incidentTypeValue === "dependencyBased" &&
                    <>
                        <FormControl sx={{width: "100%"}}>
                            <InputLabel id="dependency-label">Dependency</InputLabel>
                            <Select
                                labelId="dependency-label"
                                id="dependency"
                                value={dependencyValue}
                                onChange={handleDependencyValueChange}
                                input={<OutlinedInput id="select-dependency" label="Dependency"/>}
                                // renderValue={(selected) => (
                                //     <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                //         {
                                //             selected.map((value) => (
                                //                 <Chip key={value} label={value}/>
                                //             ))}
                                //     </Box>
                                // )}
                                MenuProps={MenuProps}
                                fullWidth={true}
                            >
                                {dependencies.map((options) => (
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

                {incidentTypeValue === "taskBased" &&
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
            </Box>
        </>
    )

}
