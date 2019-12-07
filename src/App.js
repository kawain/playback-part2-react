import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PageNav from './component/PageNav';
import Foot from './component/Foot';
import Top from './component/Top';
import About from './component/About';
import Privacy from './component/Privacy';
import Terms from './component/Terms';
import Quiz from './component/Quiz';
import Scale from './component/Scale';
import Tuning from './component/Tuning';
import Basic from './component/Basic';
import Triad from './component/Triad';
import Chord from './component/Chord';

import NotFound from './component/NotFound';



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <PageNav />
          <Switch>
            <Route path='/' exact component={Top} />
            <Route path='/basic.html' exact component={Basic} />
            <Route path='/triad.html' exact component={Triad} />
            <Route path='/chord.html' exact component={Chord} />
            <Route path='/quiz.html' exact component={Quiz} />
            <Route path='/tuning.html' exact component={Tuning} />
            <Route path='/scale.html' exact component={Scale} />
            <Route path='/about.html' exact component={About} />
            <Route path='/privacy.html' exact component={Privacy} />
            <Route path='/terms.html' exact component={Terms} />
            <Route component={NotFound} />
          </Switch>
          <Foot />
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App;