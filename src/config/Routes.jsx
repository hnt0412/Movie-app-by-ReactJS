import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Catalog from '../components/Pages/Catalog';
import Detail from '../components/Pages/detail/Detail';
import Home from '../components/Pages/Home';


const Routes = () => {
    return (
        <Switch>
            <Route
                path='/:category/search/:keyword'
                component={Catalog}
            />
            <Route
                path='/:category/:id'
                component={Detail}
            />
            <Route
                path='/:category'
                component={Catalog}
            />
            <Route
                path='/'
                component={Home}
            />
        </Switch>
    );
}

export default Routes;