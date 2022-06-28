import * as React from 'react';
import Container from "@material-ui/core/Container";
import {Paper} from "@mui/material";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DashboardNavigation from "./Navigation/DashboardNavigation";
import {Spotlight} from "./Navigation/Spotlight";
import Box from "@material-ui/core/Box";
import {Delete, Edit, ErrorOutline, Info, PriorityHigh} from "@material-ui/icons";
import {CollapseCard} from "../utilities/Cards";
import IconButton from "@material-ui/core/IconButton";
import TaskListItem from "./Task/TaskListItem";

interface DependencyItemProps {
    name: string;
    description: string;
    isActive?: boolean;
}

function TaskDependencyItem(props: DependencyItemProps) {
    return (
        <CollapseCard
            elevation={1}
            collapseContent={
                <Grid container justifyContent="flex-start">
                    <Grid item md>
                        <Box textAlign={"left"}>
                            <IconButton>
                                <Info fontSize={"small"}/>
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item md>
                        <Box textAlign={"right"}>
                            <IconButton>
                                <Delete fontSize={"small"}/>
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            }
        >
            <Grid container={true} spacing={1} justifyContent={"flex-start"}>
                <Grid item md={11}>
                    <Typography gutterBottom variant="h6">
                        {props.name}
                    </Typography>
                </Grid>
                {props.isActive &&
                    <Grid item md={1}>
                        <Box textAlign={"right"}>
                            <ErrorOutline fontSize={"small"}/>
                        </Box>
                    </Grid>
                }
            </Grid>

            <Typography variant="body2">
                {props.description}
            </Typography>
        </CollapseCard>
    )
}

interface TaskDependencyUserProps {
    name: string;
    role: string;
    isKeyPerson?: boolean;
}

function TaskDependencyUserItem(props: TaskDependencyUserProps) {
    return (
        <CollapseCard elevation={1}
                      collapseContent={
                          <Box textAlign={"right"}>
                              <Grid container alignItems="flex-end">
                                  <Grid item md>
                                      <Box textAlign={"left"}>
                                          <IconButton>
                                              <Info fontSize={"small"}/>
                                          </IconButton>
                                      </Box>
                                  </Grid>
                                  <Grid item md>
                                      <Box textAlign={"right"}>
                                          <IconButton>
                                              <Edit fontSize={"small"}/>
                                          </IconButton>
                                          <IconButton>
                                              <Delete fontSize={"small"}/>
                                          </IconButton>
                                      </Box>
                                  </Grid>
                              </Grid>
                          </Box>
                      }
        >
            <Grid container direction={"row"}>
                <Grid item md>
                    <Typography gutterBottom variant="body1">
                        {props.isKeyPerson &&
                            <Box sx={{fontWeight: "bold"}}>
                                {props.name}
                            </Box>
                        }
                        {!props.isKeyPerson &&
                            props.name
                        }
                    </Typography>
                </Grid>
                <Grid item md>
                    {props.isKeyPerson &&
                        <Box textAlign={"right"}>
                            <PriorityHigh fontSize={"small"}/>
                        </Box>
                    }
                </Grid>
            </Grid>
            <Typography variant="body2">
                {props.role}
            </Typography>
        </CollapseCard>
    )
}

export default function TaskDependency() {
    return (
        <Container maxWidth="md">
            <Grid container direction={"column"} spacing={2}>
                {/*Navigation*/}
                <Grid item>
                    <DashboardNavigation backButtonName={"Task Dependency"} backButtonLink={"./taskDependencies"}
                                         heading={"SO Backlog"}/>
                </Grid>
                {/*Content*/}
                <Grid item xs container direction={"row"} spacing={3}>
                    {/*Left Panel*/}
                    <Grid item xs={12} md={9} container direction={"column"} spacing={2}>
                        {/*Trigger*/}
                        <Grid item md>
                            <Typography variant={"h6"}>
                                Trigger
                            </Typography>
                            <Grid container direction={"row"} spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TaskDependencyItem
                                        name={"Delay Check"}
                                        description={"Triggered 5 minutes ago"}
                                        isActive={true}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TaskDependencyItem
                                        name={"Missing Data Check"}
                                        description={"Last triggered at June 17, 2022"}
                                        isActive={true}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TaskDependencyItem
                                        name={"Discrepancy Check"}
                                        description={"Last triggered at June 17, 2022"}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        {/*User*/}
                        <Grid item md>
                            <Typography variant={"h6"}>
                                User
                            </Typography>
                            {/*<Divider/>*/}
                            <Grid container direction={"row"} spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TaskDependencyUserItem
                                        name={"Jeff Leung"}
                                        role={"PIC"}
                                        isKeyPerson={true}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TaskDependencyUserItem
                                        name={"CDBA BA"}
                                        role={"Developer"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TaskDependencyUserItem
                                        name={"CDBA SA"}
                                        role={"Developer"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TaskDependencyUserItem
                                        name={"MM Department"}
                                        role={"User"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TaskDependencyUserItem
                                        name={"CS Department"}
                                        role={"User"}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        {/*Incidents*/}
                        <Grid item md>
                            <Typography variant={"h6"}>
                                Task
                            </Typography>
                            <Paper>
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
                            </Paper>
                        </Grid>
                    </Grid>
                    {/*Right Panel*/}
                    <Grid item xs={12} md={3}>
                        <Grid container direction={"column"} justifyContent={"flex-start"} spacing={3}>
                            <Grid item xs md>
                                <Spotlight heading={"Dependent Tasks"} highlightedNumber={"141"}/>
                            </Grid>
                            <Grid item xs md>
                                <Spotlight heading={"Users"} highlightedNumber={"107"}
                                           description={""}/>
                            </Grid>
                            <Grid item xs md>
                                <Spotlight heading={"Total Incidents"} highlightedNumber={"21"}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
