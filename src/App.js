import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Followers from './followers';
import Home from './home';
import RepoDetails from './repoDetails';
import Repos from './repos';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <Switch>
                <Route path="/repos/:username/:reponame" component={RepoDetails}/>
                <Route exact path="/repos/:username" component={Repos}/>                
                <Route path="/followers/:userId" component={Followers}/>
                <Route path="/" component={Home}/>
                
            </Switch>
        );
    }
}
 
export default App;