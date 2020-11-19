import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App';
import Extract from './Extract';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function NotFound() {
    return <h3 style={{marginLeft: 10, fontStyle: 'italic', fontWeight: 'bold'}}>404 Not Found</h3>
}

render((
    <BrowserRouter>
        <Switch>
            <Route exact path={"/folletticlient/"} component={App}/>
            <Route exact path={"/estrazione/"} component={Extract}/>
            <Route path='*' component={NotFound} />
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
