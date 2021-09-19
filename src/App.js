import './App.css';
import NavBar from './components/navbar/NavBar';
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import SummarizeText from './components/summarizeText/SummarizeText';
import SentimentAnalysis from './components/sentimentAnalysis/SentimentAnalysis';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/summarize-text">
            <SummarizeText />
          </Route>
          <Route path="/sentiment-analysis">
            <SentimentAnalysis />
          </Route>
          <Route exact path="/" render={() => (<Redirect to="/summarize-text" />)} />
          <Route exact path="/*" render={() => (<Redirect to="/summarize-text" />)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
