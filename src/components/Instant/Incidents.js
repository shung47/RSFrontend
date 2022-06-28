import * as React from 'react';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {ButtonWithModal} from "../utilities/Modals";
import DashboardNavigation from "./Navigation/DashboardNavigation";
import {Spotlight} from "./Navigation/Spotlight";
import IncidentListItem from "./Incident/IncidentListItem";
import CreateIncidentForm from "./Incident/CreateIncidentForm";


export default function Incidents() {

    return (
        <Container maxWidth="md">
            <Grid container direction={"column"} spacing={2}>
                {/*Navigation*/}
                <Grid item xs>
                    <DashboardNavigation heading={"Incidents"}>
                        <Grid item>
                            <ButtonWithModal actionButton={<Button variant={"contained"}>Create Incident</Button>}>
                                <CreateIncidentForm/>
                            </ButtonWithModal>
                        </Grid>
                    </DashboardNavigation>
                </Grid>
                {/*Content*/}
                <Grid item xs container direction={"row"} spacing={3}>
                    {/*Left Panel*/}
                    <Grid item xs={12} md={9} container direction={"column"}>
                        <Grid item>
                            <IncidentListItem
                                incidentId={"2022-Carload"}
                                dependency={"PO Data Delay"}
                                friendlyTime={"13 minutes ago"}
                                affectedTaskCount={5}
                            />
                            <IncidentListItem
                                incidentId={"2022-Reversion"}
                                dependency={"Quote Data Delay"}
                                friendlyTime={"1 hour ago"}
                                affectedTaskCount={3}
                            />
                            <IncidentListItem
                                incidentId={"2022-Abstract"}
                                dependency={"DRMS Data Delay"}
                                friendlyTime={"2 hours ago"}
                                affectedTaskCount={7}
                            />
                            <IncidentListItem
                                incidentId={"2022-Stardust"}
                                dependency={"Inventory Delay"}
                                friendlyTime={"2 hours ago"}
                                affectedTaskCount={13}
                            />
                            <IncidentListItem
                                incidentId={"2022-Unchanged"}
                                dependency={"PO Backlog Delay"}
                                friendlyTime={"1 day ago"}
                                affectedTaskCount={54}
                            />
                            <IncidentListItem
                                incidentId={"2022-Possibly"}
                                dependency={"Quote Data Delay"}
                                friendlyTime={"3 days ago"}
                                affectedTaskCount={11}
                            />
                        </Grid>
                    </Grid>
                    {/*Right Panel*/}
                    <Grid item xs={12} md={3}>
                        <Grid container direction={"column"} justifyContent={"flex-start"} spacing={3}>
                            <Grid item xs md>
                                <Spotlight heading={"Active Incidents"} highlightedNumber={"5"} description={""}/>
                            </Grid>
                            <Grid item xs md>
                                <Spotlight heading={"Affected Users"} highlightedNumber={"27"}
                                           description={"estimated by affected tasks"}/>
                            </Grid>
                            <Grid item xs md>
                                <Spotlight heading={"Total Incidents"} highlightedNumber={"21"}
                                           description={"for last 7 days"}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
