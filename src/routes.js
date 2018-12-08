import React from 'react';
import { Route, Switch } from 'react-router-dom';

import asyncComponent from './components/async.component';
import Classic from './layouts/layout-classic/layout-classic.component';
import Compact from './layouts/layout-compact/layout-compact.component';
import Toolbar from './layouts/layout-toolbar/layout-toolbar.component';
import Boxed from './layouts/layout-boxed/layout-boxed.component';
import Funky from './layouts/layout-funky/layout-funky.component';
import Tabbed from './layouts/layout-tabbed/layout-tabbed.component';
import NoLayout from './layouts/layout-none/layout-none.component';

// DASHBOARD ROUTE
const AsyncEcommerceDashboard = asyncComponent(() => import('./containers/dashboards/ecommerce/ecommerce.component'));


//Tienda routes
const Productos = asyncComponent(() => import('./containers/tienda/productos.component'));
const NuevoProducto = asyncComponent(() => import('./containers/tienda/agregarProducto/nuevoProducto.component'));

const Ventas = asyncComponent(() => import('./containers/tienda/ventas.component'));


// AUTHENTICATION ROUTES
const AsyncLogin = asyncComponent(() => import('./containers/authentication/login/login.component'));
const AsyncRegister = asyncComponent(() => import('./containers/authentication/register/register.component'));
const AsyncProfile = asyncComponent(() => import('./containers/authentication/profile/profile.component'));
const AsyncLock = asyncComponent(() => import('./containers/authentication/lock/lock.component'));
const AsyncForgot = asyncComponent(() => import('./containers/authentication/forgot-password/forgot-password.component'));

// ERROR ROUTES
const AsyncError404 = asyncComponent(() => import('./containers/errors/404.component'));
const AsyncError500 = asyncComponent(() => import('./containers/errors/500.component'));

const AsyncNotFound = asyncComponent(() => import('./containers/not-found/not-found.component'));

// PAGES ROUTES
const AsyncTypography = asyncComponent(() => import('./containers/pages/typography.component'));
const AsyncColors = asyncComponent(() => import('./containers/pages/colors.component'));

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

const ClassicLayout = props => (
  <Classic>{props.children}</Classic>
);

const CompactLayout = props => (
  <Compact>{props.children}</Compact>
);

const ToolbarLayout = props => (
  <Toolbar>{props.children}</Toolbar>
);

const BoxedLayout = props => (
  <Boxed>{props.children}</Boxed>
);

const FunkyLayout = props => (
  <Funky>{props.children}</Funky>
);

const TabbedLayout = props => (
  <Tabbed>{props.children}</Tabbed>
);

// TODO: Consider looping through an object containing all routes
export default ({ childProps, layout }) => {
  let activeLayout;
  switch (layout.currentLayout) {
  case 'classic':
    activeLayout = ClassicLayout;
    break;
  case 'compact':
    activeLayout = CompactLayout;
    break;
  case 'toolbar':
    activeLayout = ToolbarLayout;
    break;
  case 'boxed':
    activeLayout = BoxedLayout;
    break;
  case 'funky':
    activeLayout = FunkyLayout;
    break;
  case 'tabbed':
    activeLayout = TabbedLayout;
    break;
  default:
    activeLayout = ClassicLayout;
  }

  return (
    <Switch>
      <AppRoute path="/" exact component={AsyncEcommerceDashboard} props={childProps} layout={activeLayout} />
      <AppRoute path="/productos" exact component={Productos} props={childProps} layout={activeLayout} />
      <AppRoute path="/productos/nuevo" exact component={NuevoProducto} props={childProps} layout={activeLayout} />
      <AppRoute path="/ventas" exact component={Ventas} props={childProps} layout={activeLayout} />
      
      
      <AppRoute path="/login" exact component={AsyncLogin} props={childProps} layout={NoLayout} />
      <AppRoute path="/register" exact component={AsyncRegister} props={childProps} layout={NoLayout} />
      <AppRoute path="/profile" exact component={AsyncProfile} props={childProps} layout={activeLayout} />
      <AppRoute path="/lock" exact component={AsyncLock} props={childProps} layout={NoLayout} />
      <AppRoute path="/forgot-password" exact component={AsyncForgot} props={childProps} layout={NoLayout} />
      <AppRoute path="/errors/404" exact component={AsyncError404} props={childProps} layout={NoLayout} />
      <AppRoute path="/errors/500" exact component={AsyncError500} props={childProps} layout={NoLayout} />
      <AppRoute path="/pages/typography" exact component={AsyncTypography} props={childProps} layout={activeLayout} />
      <AppRoute path="/pages/colors" exact component={AsyncColors} props={childProps} layout={activeLayout} />
      <AppRoute component={AsyncNotFound} layout={activeLayout} />
    </Switch>);
};
