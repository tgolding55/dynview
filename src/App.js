import "./App.css";
import DynView from "./DynView";
import DynEdit from "./DynEdit";
import React, { useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";

function App() {
  const [viewObjects, setViewObjects] = useState([]);

  return (
    <div className="App">
      <Grid
        style={{
          height: "100%",
          width: "100%",
          margin: "0 0 0 0"
        }}
      >
        <Grid.Row
          style={{
            height: "3vh",
            width: "100%",
            paddingTop: 0,
            paddingBottom: 0
          }}
        >
          <Grid.Column style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Link to="/dynview">To View</Link>{" "}
            <Link to="/dynedit">To Edit</Link>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row
          style={{
            height: "100%",
            width: "100%",
            paddingTop: 0,
            paddingBottom: 0
          }}
        >
          <Grid.Column
            style={{
              height: "100%",
              width: "100%",
              paddingLeft: 0,
              paddingRight: 0
            }}
          >
            <Switch>
              <Route path="/dynview">
                <DynView viewObjects={viewObjects} />
              </Route>

              <Route path="/dynedit">
                <DynEdit
                  viewObjects={viewObjects}
                  setViewObjects={setViewObjects}
                />
              </Route>
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;
