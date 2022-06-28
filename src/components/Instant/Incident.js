import * as React from 'react';
import Container from "@material-ui/core/Container";
import ListItemText from "@material-ui/core/ListItemText";
import {ListItem} from "@mui/material";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {DoneAll, Error, Notes, Notifications, Search as SearchIcon} from "@material-ui/icons";
import Link from "@material-ui/core/Link";
import {ButtonWithModal} from "../utilities/Modals";
import IncidentAddEventForm from "./Incident/AddIncidentEventForm";
import {Search, SearchIconWrapper, StyledInputBase} from "../utilities/Search";
import DashboardNavigation from "./Navigation/DashboardNavigation";
import {Construction} from "@mui/icons-material";
import InfoPanelItem from "./Incident/InfoPanelItem";
import IncidentEvent from "./Incident/IncidentEvent";


export default function Incident() {
    function AlertContentModal() {
        return (
            <>
                <Typography align={"right"} variant={"body2"}>
                    <ButtonWithModal buttonText={"View"}>
                        <Typography id="modal-modal-title" variant="h6">
                            Alert Content
                        </Typography>
                        <Typography variant={"body2"}>
                            Dear CDBA users,

                            Please be informed there is Inventory raw data issue.

                            Below is the affected application:-
                            Salesforce dashboard
                            PowerBI dashboard
                            BA Tool
                            All In One Report
                            Oher CDBA Reports/Tools

                            We are working with GIS/Infosys to fix the issue. You will be informed accordingly, when the
                            issue is fixed.

                            Sorry for any inconvenience caused.
                        </Typography>
                    </ButtonWithModal>
                </Typography>
            </>

        )
    }

    function AlertRecipientsModal() {
        return (
            <>
                <ButtonWithModal buttonText={"42 users"}>
                    <Typography id="modal-modal-title" variant="h6">
                        Recipients
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search'}}
                        />
                    </Search>
                    <Typography id="modal-modal-description" variant={"body2"} sx={{mt: 2}}>
                        <Typography>
                            <Link>@cychan</Link>
                        </Typography>
                        <Typography>
                            <Link>@hildafung</Link>
                        </Typography>
                        <Typography>
                            <Link>@felixwan</Link>
                        </Typography>
                        <Typography>
                            <Link>@dericksze</Link>
                        </Typography>
                        <Typography>
                            <Link>@amywang</Link>
                        </Typography>
                    </Typography>
                </ButtonWithModal>
            </>
        )
    }

    return (
        <>
            <Container minWidth="sm" maxWidth="md">
                <>
                    <DashboardNavigation backButtonName={"Incident"} backButtonLink={"./incidents"}
                                         heading={"2022-Carload"}>
                        <Grid item>
                            <ButtonWithModal actionButton={<Button variant={"contained"}>Add Event</Button>}>
                                <IncidentAddEventForm/>
                            </ButtonWithModal>
                        </Grid>
                        <Grid item>
                            <ButtonWithModal actionButton={<Button variant={"contained"}>Send Alert</Button>}>
                                <IncidentAddEventForm defaultEventType={"notify_users"}/>
                            </ButtonWithModal>
                        </Grid>
                    </DashboardNavigation>
                </>
                <Grid container spacing={2}>
                    <Grid item md={8}>
                        <IncidentEvent
                            eventName={"Identified the issue with PO table"}
                            eventType={"Follow Up Event"}
                            icon={<Construction/>}
                            description={"The \"invCount\" field is missing"}
                            createdAt={"7 minutes ago"}
                            detailedCreatedAt={"11:57 Jun 17, 2022"}
                            createdBy={"@felixwan"}
                        />
                        <IncidentEvent
                            eventName={"Issue resolved"}
                            eventType={"Resolve Event"}
                            icon={<DoneAll/>}
                            description={"The Incident was resolved"}
                            createdAt={"13 minutes ago"}
                            detailedCreatedAt={"11:50 Jun 17, 2022"}
                            // ableToUndo={true}
                        />
                        <IncidentEvent
                            eventName={"Users notified"}
                            eventType={"Notify Users Event"}
                            icon={<Notifications/>}
                            description={"Some users are notified with the situation"}
                            createdAt={"53 minutes ago"}
                            detailedCreatedAt={"11:37 Jun 17, 2022"}
                        >
                            <ListItem>
                                <ListItemText
                                    primary={"Alert Content"}
                                    secondary={
                                        <>
                                            <Typography variant={"body2"}>
                                                Dear CDBA users,

                                                Please be informed there is Inventory raw data issue.

                                                Below is the affected application:-
                                                Salesforce dashboard
                                                PowerBI dashboard
                                                BA Tool
                                                All In One Report
                                                Oher CDBA Reports/Tools

                                                We are working with GIS/Infosys to fix the issue. You will be informed
                                                accordingly, when the
                                                issue is fixed.

                                                Sorry for any inconvenience caused.
                                            </Typography>
                                            <AlertContentModal/>
                                        </>
                                    }/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Recipients" secondary={
                                    <AlertRecipientsModal/>
                                }/>
                            </ListItem>
                        </IncidentEvent>
                        <IncidentEvent
                            eventName={"Reviewing the situation"}
                            eventType={"Add Remark Event"}
                            // icon={<Typography>AS</Typography>}
                            icon={<Notes/>}
                            description={"Contacting GIS for more info"}
                            createdAt={"1 hours ago"}
                            detailedCreatedAt={"10:13 Jun 17, 2022"}
                            createdBy={"@felixwan"}
                        />
                        <IncidentEvent
                            eventName={"Issue reported"}
                            eventType={"Incident Trigger Event"}
                            icon={<Error/>}
                            description={"This Incident is triggered by delay in PO Data"}
                            createdAt={"2 hours ago"}
                            detailedCreatedAt={"09:37 Jun 17, 2022"}
                        >
                            <ListItem>
                                <ListItemText
                                    primary={"Event Log"}
                                    secondary={
                                        <>
                                            <Typography variant={"body2"}>
                                                [DispatcherFramework] Timeout after 120 minutes<br/>
                                                [DispatcherFramework] Timeout after 120 minutes<br/>
                                                [DispatcherFramework] Timeout after 120 minutes<br/>
                                                [DispatcherFramework] Timeout after 120 minutes<br/>
                                                [DispatcherFramework] Timeout after 120 minutes<br/>
                                            </Typography>
                                            <Typography align={"right"} variant={"body2"}>
                                                <ButtonWithModal buttonText={"View"}>
                                                    <Typography id="modal-modal-title" variant="h6">
                                                        Event Log
                                                    </Typography>
                                                    <Typography variant={"body2"}>
                                                        [DispatcherFramework] Timeout after 120 minutes<br/>
                                                        [DispatcherFramework] Timeout after 120 minutes<br/>
                                                        [DispatcherFramework] Timeout after 120 minutes<br/>
                                                        [DispatcherFramework] Timeout after 120 minutes<br/>
                                                        [DispatcherFramework] Timeout after 120 minutes<br/>
                                                    </Typography>
                                                </ButtonWithModal>
                                            </Typography>
                                        </>
                                    }/>
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={"Affected Tasks"}
                                    secondary={
                                        <>
                                            <Typography variant={"body2"}>
                                                AVL_EOL_Update<br/>
                                                ASIA_POS_INV<br/>
                                                FIN_JVSorting<br/>
                                                MM PRtoPO<br/>
                                                MM_POCoverage<br/>
                                                PO_Excess<br/>
                                                V100 Usage Report<br/>
                                            </Typography>
                                            <Typography align={"right"} variant={"body2"}>
                                                <ButtonWithModal buttonText={"View"}>
                                                    <Typography id="modal-modal-title" variant="h6">
                                                        Affected Tasks
                                                    </Typography>
                                                    <Typography variant={"body2"}>
                                                        <Typography>
                                                            <Link>AVL_EOL_Update</Link>
                                                        </Typography>
                                                        <Typography>
                                                            <Link>ASIA_POS_INV</Link>
                                                        </Typography>
                                                        <Typography>
                                                            <Link>FIN_JVSorting</Link>
                                                        </Typography>
                                                        <Typography>
                                                            <Link>MM PRtoPO</Link>
                                                        </Typography>
                                                        <Typography>
                                                            <Link>MM_POCoverage</Link>
                                                        </Typography>
                                                        <Typography>
                                                            <Link>PO_Excess</Link>
                                                        </Typography>
                                                        <Typography>
                                                            <Link>V100 Usage Report</Link>
                                                        </Typography>
                                                    </Typography>
                                                </ButtonWithModal>
                                            </Typography>
                                        </>
                                    }/>
                            </ListItem>
                        </IncidentEvent>
                    </Grid>
                    <Grid item md={4}>
                        <List>
                            <InfoPanelItem header={"Incident ID"}>
                                2022-Carload
                            </InfoPanelItem>
                            <InfoPanelItem header={"Dependency"} href={"#"}>
                                PO Data
                            </InfoPanelItem>
                            <InfoPanelItem header={"PICs"} href={"#"}>
                                @felixwan
                            </InfoPanelItem>
                            <InfoPanelItem header={"Affected Tasks"} modal={
                                <>
                                    <Typography variant="h6">
                                        Affected Tasks
                                    </Typography>
                                    <Typography variant={"body2"} sx={{mt: 2}}>
                                        <Typography>
                                            <Link>AVL_EOL_Update</Link>
                                        </Typography>
                                        <Typography>
                                            <Link>ASIA_POS_INV</Link>
                                        </Typography>
                                        <Typography>
                                            <Link>FIN_JVSorting</Link>
                                        </Typography>
                                        <Typography>
                                            <Link>MM PRtoPO</Link>
                                        </Typography>
                                        <Typography>
                                            <Link>MM_POCoverage</Link>
                                        </Typography>
                                        <Typography>
                                            <Link>PO_Excess</Link>
                                        </Typography>
                                        <Typography>
                                            <Link>V100 Usage Report</Link>
                                        </Typography>
                                    </Typography>
                                </>
                            }>
                                7 tasks
                            </InfoPanelItem>
                            <InfoPanelItem header={"Affected Users"} modal={
                                <>
                                    <Typography variant="h6">
                                        Affected Users
                                    </Typography>
                                    <Typography variant={"body2"} sx={{mt: 2}}>
                                        <Typography>
                                            <Link>@cychan</Link>
                                        </Typography>
                                        <Typography>
                                            <Link>@hildafung</Link>
                                        </Typography>
                                        <Typography>
                                            <Link>@felixwan</Link>
                                        </Typography>
                                        <Typography>
                                            <Link>@dericksze</Link>
                                        </Typography>
                                        <Typography>
                                            <Link>@amywang</Link>
                                        </Typography>
                                    </Typography>
                                </>
                            }>
                                54 users
                            </InfoPanelItem>
                            <InfoPanelItem header={"Impact Duration"}>
                                2.3 hours
                            </InfoPanelItem>
                        </List>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
        ;
}
