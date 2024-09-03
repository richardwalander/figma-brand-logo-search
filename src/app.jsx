import { h } from 'preact'
import { Router, Route, Switch, Redirect } from 'wouter-preact'
import { useHashLocation } from 'wouter-preact/use-hash-location'
import Home from './home.jsx'
import TabBar from './components/tabbar/tabbar.jsx'
import Explore from './explore/explore.jsx'
import More from './more/more.jsx'
import './app.css'
import ExploreCategory from './explore/explore-cat.jsx'

const App = () => {
  return (
    <>
      <Router hook={useHashLocation}>
        <TabBar></TabBar>
        <Switch>
          <Route path="/search/:q" component={Home} />
          <Route path="/search" component={Home} />
          <Route path="/explore/:cat" component={ExploreCategory} />
          <Route path="/explore" component={Explore} />
          <Route path="/more" component={More} />
          <Route path="/">
            <Redirect to="/explore" replace></Redirect>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
