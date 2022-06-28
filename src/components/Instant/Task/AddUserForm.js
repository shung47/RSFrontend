import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {ListSubheader, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import Chip from "@mui/material/Chip";
import * as React from "react";

interface addUserFromProps {
    defaultEventType?: string
}

export default function (props: addUserFromProps) {
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

    const userRoles = [
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

    const [userValue, setUserValue] = React.useState([]);

    const handleUserValueChange = (event: SelectChangeEvent<typeof userValue>) => {
        const {
            target: { value },
        } = event;
        setUserValue(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [userRole, setUserRole] = React.useState();
    const handleUserRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserRole(event.target.value);
    };

    return (
        <>
            <Typography variant={"h6"}>
                Add User
            </Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >
                <Box m={1}/>
                <>
                    <FormControl fullWidth={true}>
                        <InputLabel id="user-label">Users</InputLabel>
                        <Select
                            labelId="user-label"
                            id="user"
                            multiple
                            value={userValue}
                            onChange={handleUserValueChange}
                            input={<OutlinedInput id="select-multiple-user" label="Users"/>}
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
                    <Box m={1}/>
                    <FormControl fullWidth={true}>
                        <InputLabel id="user-role-label">User Role</InputLabel>
                        <Select
                            labelId="user-role-label"
                            id="user-role"
                            value={userRole}
                            onChange={handleUserRoleChange}
                            input={<OutlinedInput id="select-user-role" label="User Role"/>}
                            fullWidth={true}
                        >
                            {userRoles.map((options) => (
                                <MenuItem key={options.value} value={options.value}>
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
