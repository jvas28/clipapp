import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ReadOnlyPlayer from './components/readonlyplayer/ReadOnlyPlayer';
if(document.getElementById('root'))
{
  var element = document.getElementById('root');
  let url = element.getAttribute('video-url');
  ReactDOM.render(<App url = {url} />, document.getElementById('root'));
  registerServiceWorker();

}

if(document.getElementById('readonlyplayer'))
{
    var element = document.getElementById('readonlyplayer');
    let url = element.getAttribute('video-url');
    if(element.getAttribute('data-playlist'))
    {
        var playlist = JSON.parse(element.getAttribute('data-playlist'));
    }
    ReactDOM.render(<ReadOnlyPlayer url={url} playlist={playlist} />,document.getElementById('readonlyplayer'))
}
