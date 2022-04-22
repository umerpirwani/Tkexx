import React from 'react';
import { Router, Location, Redirect } from '@reach/router';
import ScrollToTopBtn from '../components/menu/ScrollToTop';
import Header from '../components/menu/header';
import BuySell from './buySell';
import Explore from '../components/pages/explore';
import Explore2 from '../components/pages/explore2';
import Helpcenter from '../components/pages/helpcenter';
import Rangking from '../components/pages/rangking';
import Colection from '../components/pages/colection';
import ItemDetail from '../mainComponents/ItemDetail';
import Author from '../components/pages/Author';
import Wallett from './wallet';
import Login from '../components/pages/login';
import LoginTwo from '../components/pages/loginTwo';
import Register from '../components/pages/register';
import Price from '../components/pages/price';
import Works from '../components/pages/works';
import News from '../components/pages/news';
import Create from './create';
import Auction from '../components/pages/Auction';
import Activity from '../components/pages/activity';
import Contact from '../components/pages/contact';
import ElegantIcons from '../components/pages/elegantIcons';
import EtlineIcons from '../components/pages/etlineIcons';
import FontAwesomeIcons from '../components/pages/fontAwesomeIcons';
import Accordion from '../components/pages/accordion';
import Alerts from '../components/pages/alerts';
import Progressbar from '../components/pages/progressbar';
import Tabs from '../components/pages/tabs';
import { createGlobalStyle } from 'styled-components';
import Home3 from './home3'

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0,0), [location])
  return children
}

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id='routerhang'>
        <div key={location.key}>
          <Router location={location}>
            {children}
          </Router>
        </div>
      </div>
    )}
  </Location>
);

const app= () => (
  <div className="wraper">
  <GlobalStyles />
    <Header/>
      <PosedRouter>
      <ScrollTop path="/">
        <BuySell exact path="/">
          <Redirect to="/home" />
        </BuySell>
        <Home3 path="mynfts" />
        <BuySell path="/home" />
        <Explore path="/explore" />
        <Explore2 path="/explore2" />
        <Helpcenter path="/helpcenter" />
        <Rangking path="/rangking" />
        <Colection path="/colection" />
        <ItemDetail path="/ItemDetail" />
        <Author path="/Author" />
        <Wallett path="/wallet" />
        <Login path="/login" />
        <LoginTwo path="/loginTwo" />
        <Register path="/register" />
        <Price path="/price" />
        <Works path="/works" />
        <News path="/news" />
        <Create path="/create" />
        <Auction path="/Auction" />
        <Activity path="/activity" />
        <Contact path="/contact" />
        <ElegantIcons path="/elegantIcons" />
        <EtlineIcons path="/etlineIcons" />
        <FontAwesomeIcons path="/fontAwesomeIcons" />
        <Accordion path="/accordion" />
        <Alerts path="/alerts" />
        <Progressbar path="/progressbar" />
        <Tabs path="/tabs" />
        </ScrollTop>
      </PosedRouter>
    <ScrollToTopBtn />
  </div>
);
export default app;