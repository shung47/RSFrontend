import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {ListSubheader, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import Chip from "@mui/material/Chip";
import * as React from "react";

interface addDependencyFormProps {
    defaultEventType?: string
}

export default function (props: addDependencyFormProps) {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            },
        },
    };

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

    const [dependencyValue, setDependencyValue] = React.useState([]);

    const handleDependencyValueChange = (event: SelectChangeEvent<typeof dependencyValue>) => {
        const {
            target: { value },
        } = event;
        setDependencyValue(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <>
            <Typography variant={"h6"}>
                Add Dependency
            </Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >
                <Box m={1}/>
                <>
                    <FormControl sx={{width: "100%" }}>
                        <InputLabel id="dependencies-label">Dependencies</InputLabel>
                        <Select
                            labelId="dependencies-label"
                            id="dependencies"
                            multiple
                            value={dependencyValue}
                            onChange={handleDependencyValueChange}
                            input={<OutlinedInput id="select-multiple-Dependency" label="Dependencies" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {
                                        selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                            fullWidth={true}
                        >
                            <ListSubheader disabled>Dependencies</ListSubheader>
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
            </Box>
        </>
    )
}
