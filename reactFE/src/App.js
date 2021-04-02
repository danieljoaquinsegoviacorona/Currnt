import './App.css';
import Table from './userTable.js';
import Form from './formComponent.js';
import InfoDisplay from './storeContents';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { store } from './store';
import { Provider } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <p>
            Welcome to React Hooks table.
        </p>

        </header>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={classes.paper}><Table></Table></Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}><InfoDisplay></InfoDisplay></Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}><Form></Form></Paper>
            </Grid>

          </Grid>
        </div>

      </div>
    </Provider>
  );
}

export default App;
