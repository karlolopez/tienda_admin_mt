import React from 'react';

import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PinDropIcon from '@material-ui/icons/PinDrop';
import EmailIcon from '@material-ui/icons/Email';
import ExtensionIcon from '@material-ui/icons/Extension';
import MenuIcon from '@material-ui/icons/Menu';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import InfoIcon from '@material-ui/icons/Info';
import BuildIcon from '@material-ui/icons/Build';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import PaletteIcon from '@material-ui/icons/Palette';
import PersonIcon from '@material-ui/icons/Person';
import EventNoteIcon from '@material-ui/icons/EventNote';
import FaceIcon from '@material-ui/icons/Face';
import ChatIcon from '@material-ui/icons/Chat';
import DateRangeIcon from '@material-ui/icons/DateRange';

import themes from './themes';

export const configuredTheme = themes[0].theme;

export const configuredLayout = {
  currentLayout: 'classic',
  notificationsOpen: false
};

const iconStyle = {
  fontSize: 16
};

export const menuItems = [{
  title: 'Dashboard',
  href: '/',
  icon: <HomeIcon style={iconStyle} />
}, {
  title: 'Productos',
  href: '/productos',
  icon: <ShoppingCartIcon style={iconStyle} />
}, {
  title: 'Ventas',
  href: '/ventas',
  icon: <EuroSymbolIcon style={iconStyle} />
}, {
  title: 'PAGES',
  type: 'header'
}, {
  title: 'Authentication',
  icon: <PersonIcon style={iconStyle} />,
  children: [{
    title: 'Login',
    href: '/login'
  }, {
    title: 'Register',
    href: '/register'
  }, {
    title: 'Forgot Password',
    href: '/forgot-password'
  }, {
    title: 'Profile',
    href: '/profile'
  }, {
    title: 'Lock Screen',
    href: '/lock'
  }]
}, {
  title: 'Errors',
  icon: <InfoIcon style={iconStyle} />,
  children: [{
    title: '404',
    href: '/errors/404'
  }, {
    title: '500',
    href: '/errors/500'
  }]
}];
