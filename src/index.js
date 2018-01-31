import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var element;
if(document.getElementById('react-clipper'))
{
  element = document.getElementById('react-clipper');
  let url = element.getAttribute('video-url');
  let readonly = false;
  let playlist = [];
  if(element.getAttribute('readonly'))
  {
      readonly = true;
  }
  if(readonly)
  if(element.getAttribute('data-playlist'))
  {
      playlist = JSON.parse(element.getAttribute('data-playlist'));
  }

  ReactDOM.render(<App url = {url} readonly = {readonly} playlist = {playlist} />, document.getElementById('react-clipper'));
  registerServiceWorker();

}
