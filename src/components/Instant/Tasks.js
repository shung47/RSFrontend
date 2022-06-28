import * as React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import DashboardNavigation from "./Navigation/DashboardNavigation";
import {Spotlight} from "./Navigation/Spotlight";
import TaskListItem from "./Task/TaskListItem";


export default function Tasks() {

    return (
        <Container maxWidth="md">
            <Grid container direction={"column"} spacing={2}>
                {/*Navigation*/}
                <Grid item xs>
                    <DashboardNavigation heading={"Tasks"}/>
                </Grid>
                {/*Content*/}
                <Grid item xs container direction={"row"} spacing={3}>
                    {/*Left Panel*/}
                    <Grid item xs={12} md={9} container direction={"column"}>
                        <TaskListItem
                            taskName={"AVL_EOL_Update"}
                            lastIncident={"13 minutes ago"}
                        />
                        <TaskListItem
                            taskName={"ASIA_POS_INV"}
                            lastIncident={"1 hour ago"}
                        />
                        <TaskListItem
                            taskName={"FIN_JVSorting"}
                            lastIncident={"2 hours ago"}
                        />
                        <TaskListItem
                            taskName={"MM PRtoPO"}
                            lastIncident={"2 hours ago"}
                        />
                        <TaskListItem
                            taskName={"MM_POCoverage"}
                            lastIncident={"1 day ago"}
                        />
                        <TaskListItem
                            taskName={"PO_Excess"}
                            lastIncident={"3 days ago"}
                        />
                    </Grid>
                    {/*Right Panel*/}
                    <Grid item xs={12} md={3}>
                        <Grid container direction={"column"} justifyContent={"flex-start"} spacing={3}>
                            <Grid item xs md>
                                <Spotlight heading={"Active Tasks"} highlightedNumber={"92.6%"}
                                           description={"237 tasks are active"}/>
                            </Grid>
                            <Grid item xs md>
                                <Spotlight heading={"Halted Tasks"} highlightedNumber={"19"}
                                           description={"estimated by active incidents"}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
