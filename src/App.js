import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'

import Home from './components/Home'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={VideoItemDetails} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="bad-path" />
  </Switch>
)

export default App
