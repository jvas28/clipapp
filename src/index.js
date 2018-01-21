import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ReadOnlyPlayer from './components/readonlyplayer/ReadOnlyPlayer';
if(document.getElementById('root'))
{
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();

}

if(document.getElementById('readonlyplayer'))
{
    var element = document.getElementById('readonlyplayer');
    if(element.getAttribute('data-playlist'))
    {
        var playlist = JSON.parse(element.getAttribute('data-playlist'));
    }
    ReactDOM.render(<ReadOnlyPlayer playlist={playlist} />,document.getElementById('readonlyplayer'))
}
