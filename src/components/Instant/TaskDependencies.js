import * as React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import DashboardNavigation from "./Navigation/DashboardNavigation";
import {Spotlight} from "./Navigation/Spotlight";
import TaskDependencyListItem from "./TaskDependency/TaskDependencyListItem";


export default function TaskDependencies() {

    return (
        <Container maxWidth="md">
            <Grid container direction={"column"} spacing={2}>
                {/*Navigation*/}
                <Grid item>
                    <DashboardNavigation heading={"Task Dependency"}/>
                </Grid>
                <Grid item container direction={"row"} spacing={3}>
                    {/*Left Panel*/}
                    <Grid item md={9}>
                        <TaskDependencyListItem
                            dependencyName={"PO Backlog"}
                            lastIncident={"13 minutes ago"}
                        />
                        <TaskDependencyListItem
                            dependencyName={"SO Backlog"}
                            lastIncident={"1 hour ago"}
                        />
                        <TaskDependencyListItem
                            dependencyName={"BookBill"}
                            lastIncident={"2 hours ago"}
                        />
                        <TaskDependencyListItem
                            dependencyName={"Inventory"}
                            lastIncident={"2 hours ago"}
                        />
                        <TaskDependencyListItem
                            dependencyName={"DRMS"}
                            lastIncident={"1 day ago"}
                        />
                        <TaskDependencyListItem
                            dependencyName={"Quote Data"}
                            lastIncident={"3 days ago"}
                        />
                    </Grid>
                    {/*Right Panel*/}
                    <Grid item md={3} container direction={"column"} spacing={3}>
                        <Grid item>
                            <Spotlight heading={"Active Dependencies"} highlightedNumber={"92.6%"}
                                       description={"5 task dependencies are active"}/>
                        </Grid>
                        <Grid item>
                            <Spotlight heading={"Dependent Tasks"} highlightedNumber={"237"}
                                       description={"with dependency"}/>
                        </Grid>
                        <Grid item>
                            <Spotlight heading={"Independent Tasks"} highlightedNumber={"27"}
                                       description={"with any dependency"}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
