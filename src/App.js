import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PageNav from './component/PageNav';
import Foot from './component/Foot';
import Top from './component/Top';
import PlayBack from './component/PlayBack';
import Metronome from './component/Metronome';
import Tuning from './component/Tuning';
import Quiz from './component/Quiz';
import Basic from './component/Basic';
import Triad from './component/Triad';
import Chord from './component/Chord';
import Scale from './component/Scale';
import HowToWrite from './component/HowToWrite';
import About from './component/About';
import Privacy from './component/Privacy';
import Terms from './component/Terms';

import NotFound from './component/NotFound';




class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <PageNav />
          <Switch>
            <Route path='/' exact component={Top} />
            <Route path='/playback.html' exact component={PlayBack} />
            <Route path='/metronome.html' exact component={Metronome} />
            <Route path='/tuning.html' exact component={Tuning} />
            <Route path='/quiz.html' exact component={Quiz} />
            <Route path='/basic.html' exact component={Basic} />
            <Route path='/triad.html' exact component={Triad} />
            <Route path='/chord.html' exact component={Chord} />
            <Route path='/scale.html' exact component={Scale} />
            <Route path='/howtowrite.html' exact component={HowToWrite} />
            <Route path='/about.html' exact component={About} />
            <Route path='/privacy.html' exact component={Privacy} />
            <Route path='/terms.html' exact component={Terms} />

            {/* <Route path='/test/react_test/' exact component={Top} />
            <Route path='/test/react_test/basic.html' exact component={Basic} />
            <Route path='/test/react_test/triad.html' exact component={Triad} />
            <Route path='/test/react_test/chord.html' exact component={Chord} />
            <Route path='/test/react_test/metronome.html' exact component={Metronome} />
            <Route path='/test/react_test/playback.html' exact component={PlayBack} />
            <Route path='/test/react_test/howtowrite.html' exact component={HowToWrite} />
            <Route path='/test/react_test/quiz.html' exact component={Quiz} />
            <Route path='/test/react_test/tuning.html' exact component={Tuning} />
            <Route path='/test/react_test/scale.html' exact component={Scale} />
            <Route path='/test/react_test/about.html' exact component={About} />
            <Route path='/test/react_test/privacy.html' exact component={Privacy} />
            <Route path='/test/react_test/terms.html' exact component={Terms} /> */}

            <Route component={NotFound} />
          </Switch>
          <Foot />
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App;