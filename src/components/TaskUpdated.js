import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  

export default function TaskUpdated() {
    const classes = useStyles();

    return(
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
            
            <h3>The task has been updated successfully</h3>
            <Link href="/Tasks">
                Go back to tasks
            </Link>
            </div>
        </Container>
    )
}
