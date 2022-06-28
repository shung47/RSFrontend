import * as React from 'react';
import Container from "@material-ui/core/Container";
import {Paper} from "@mui/material";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IncidentListItem from "./Incident/IncidentListItem";
import DashboardNavigation from "./Navigation/DashboardNavigation";
import {Spotlight} from "./Navigation/Spotlight";
import Box from "@material-ui/core/Box";
import {Delete, Edit, ErrorOutline, Info, PriorityHigh} from "@material-ui/icons";
import {ButtonWithModal} from "../utilities/Modals";
import Button from "@material-ui/core/Button";
import {CollapseCard} from "../utilities/Cards";
import IconButton from "@material-ui/core/IconButton";
import AddDependencyForm from "./Task/AddDependencyForm";
import AddUserForm from "./Task/AddUserForm";

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
                <Grid container alignItems="flex-end">
                    <Grid item md>
                        <Box textAlign={"left"}>
                            <IconButton href={"./taskDependency"}>
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

interface TaskUserProps {
    name: string;
    role: string;
    isKeyPerson?: boolean;
}

function TaskUserItem(props: TaskUserProps) {
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

export default function Task() {
    const isEditable: boolean = true
    return (
        <Container maxWidth="md">
            <Grid container direction={"column"} spacing={2}>
                {/*Navigation*/}
                <Grid item>
                    <DashboardNavigation backButtonName={"Task"} backButtonLink={"./tasks"} heading={"AVL_EOL_Update"}>
                        {isEditable &&
                            <>
                                <Grid item>
                                    <ButtonWithModal
                                        actionButton={<Button variant={"contained"}>Add Dependency</Button>}>
                                        <AddDependencyForm/>
                                    </ButtonWithModal>
                                </Grid>
                                <Grid item>
                                    <ButtonWithModal actionButton={<Button variant={"contained"}>Add User</Button>}>
                                        <AddUserForm/>
                                    </ButtonWithModal>
                                </Grid>
                            </>
                        }
                    </DashboardNavigation>
                </Grid>
                {/*Content*/}
                <Grid item xs container direction={"row"} spacing={3}>
                    {/*Left Panel*/}
                    <Grid item xs={12} md={9} container direction={"column"} spacing={2}>
                        {/*Task Dependency*/}
                        <Grid item md>
                            <Typography variant={"h6"}>
                                Task Dependency
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TaskDependencyItem
                                        name={"PO Backlog"}
                                        description={"Last incident at June 22, 2022"}
                                        isActive={true}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TaskDependencyItem
                                        name={"SO Backlog"}
                                        description={"Last incident at June 17, 2022"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TaskDependencyItem
                                        name={"BookBill"}
                                        description={"Last incident at June 17, 2022"}
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
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TaskUserItem
                                        name={"Jeff Leung"}
                                        role={"PIC"}
                                        isKeyPerson={true}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TaskUserItem
                                        name={"CDBA BA"}
                                        role={"Developer"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TaskUserItem
                                        name={"CDBA SA"}
                                        role={"Developer"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TaskUserItem
                                        name={"MM Department"}
                                        role={"User"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TaskUserItem
                                        name={"CS Department"}
                                        role={"User"}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        {/*Incidents*/}
                        <Grid item md>
                            <Typography variant={"h6"}>
                                Incident
                            </Typography>
                            <Paper>
                                {/*<Divider/>*/}
                                <IncidentListItem
                                    incidentId={"2022-Carload"}
                                    dependency={"PO Data Delay"}
                                    friendlyTime={"13 minutes ago"}
                                    affectedUserCount={51}
                                />
                                <IncidentListItem
                                    incidentId={"2022-Reversion"}
                                    dependency={"Quote Data Delay"}
                                    friendlyTime={"1 hour ago"}
                                    affectedUserCount={54}
                                />
                                <IncidentListItem
                                    incidentId={"2022-Abstract"}
                                    dependency={"DRMS Data Delay"}
                                    friendlyTime={"2 hours ago"}
                                    affectedUserCount={6}
                                />
                                <IncidentListItem
                                    incidentId={"2022-Stardust"}
                                    dependency={"Inventory Delay"}
                                    friendlyTime={"2 hours ago"}
                                    affectedUserCount={16}
                                />
                                <IncidentListItem
                                    incidentId={"2022-Unchanged"}
                                    dependency={"PO Backlog Delay"}
                                    friendlyTime={"1 day ago"}
                                    affectedUserCount={54}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                    {/*Right Panel*/}
                    <Grid item xs={12} md={3}>
                        <Grid container direction={"column"} justifyContent={"flex-start"} spacing={3}>
                            <Grid item xs md>
                                <Spotlight heading={"Active Incidents"} highlightedNumber={"1"}/>
                            </Grid>
                            <Grid item xs md>
                                <Spotlight heading={"Users"} highlightedNumber={"27"}
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
