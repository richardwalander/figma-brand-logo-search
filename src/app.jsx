import { h } from 'preact'
import { Router, Route, Switch, Redirect } from 'wouter-preact'
import { useHashLocation } from 'wouter-preact/use-hash-location'
import Home from './search/home.jsx'
import TabBar from './components/tabbar/tabbar.jsx'
import Explore from './explore/explore.jsx'
import More from './more/more.jsx'
import './app.css'
import ExploreCategory from './explore/explore-cat.jsx'
import Details from './details/details.jsx'
import { AppStateProvider } from './context/appstate.jsx'
import LogoDevBar from './components/bars/logodev.jsx'
import NewsDialog from './components/dialogs/newsdialog.jsx'

const App = () => {
  return (
    <AppStateProvider>
      <Router hook={useHashLocation}>
        <div id="app">
          <TabBar></TabBar>
          <Switch>
            <Route path="/search/:q" component={Home} />
            <Route path="/search" component={Home} />
            <Route path="/explore/:cat" component={ExploreCategory} />
            <Route path="/explore" component={Explore} />
            <Route path="/more" component={More} />
            <Route path="/details/:domain" component={Details} />
            <Route path="/">
              <Redirect to="/explore" replace></Redirect>
            </Route>
          </Switch>
          <LogoDevBar></LogoDevBar>
          <NewsDialog></NewsDialog>
        </div>
      </Router>
    </AppStateProvider>
  )
}

export default App
