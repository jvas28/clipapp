import React from 'react';
import {Segment,Dimmer,Loader} from 'semantic-ui-react';
import {observer, inject} from 'mobx-react';

export default inject('store')(observer( class Content extends React.Component {
  constructor(props){
    super(props);
    this.onVideoLoaded = this.onVideoLoaded.bind(this)
    this.state = {firstLoad:true,paused:true}
  }
  onVideoLoaded(){
    let playerState = this.props.store.playerState;
    if(this.state.firstLoad)
    {
      this.props.store.setPlayerProperties(this.refs.video);
      this.refs.video.addEventListener('pause',()=>{
          let curr_clip_index = playerState.get('current_clip_index');
          let curr_clip = this.props.store.clips[curr_clip_index];
          if(parseInt(playerState.get('current_time'),10)+parseInt(curr_clip.start,10) === parseInt(curr_clip.end,10))
          {
            this.props.store.videoLoadingStarted();
            setTimeout(()=>{this.props.store.playNext();return;},3000);
          }else{
            this.props.store.playerState.set('playing',false);
          }
      },false);
      this.refs.video.addEventListener('play',()=>{
          this.props.store.playerState.set('playing',true);
      },false);
      this.refs.video.addEventListener('loadstart',()=>{
          this.props.store.videoLoadingStarted();
      });
      this.refs.video.addEventListener('timeupdate',(e)=>{
          this.props.store.updatePlayerCurrentTime(e.target.currentTime);
      },false);
      this.refs.video.addEventListener('loadeddata',()=>{
          this.props.store.videoLoadingFinished();

      });
      this.setState({firstLoad:false})
    }

  }
  componentWillUpdate(prevProps, prevState){
    if(this.props.store.playerState.get('toggle_requested'))
    {

      if(this.state.paused)
      {
            this.refs.video.play();
            this.setState({paused:false})
      }else{
          this.refs.video.pause();
          this.setState({paused:true})
      }
      this.props.store.playerState.set('toggle_requested',false)
    }
    if(this.props.store.playerState.get('new_play_requested'))
    {
      this.refs.video.load();
      this.refs.video.play();
      this.setState({paused:false})
      this.props.store.playerState.set('new_play_requested',false);
    }


  }
  render() {
    let current_clip = this.props.store.clips[this.props.store.playerState.get('current_clip_index')];
    let start = 0;
    let end = this.props.store.duration.get();
    if(current_clip !== undefined)
    {
      start = current_clip.start;
      end = current_clip.end;
    }
    let is_loading = this.props.store.playerState.get("loading")||this.props.store.playerState.get('new_play_requested') || this.props.store.playerState.get('toggle_requested');
    return (
      <Segment inverted>
        {is_loading? <Dimmer active>
        <Loader size='tiny'>Loading</Loader>
      </Dimmer>:""}
        <video style={{visibility:is_loading?"hidden":"visible"}} controls  ref="video" onLoadedMetadata={this.onVideoLoaded}  preload="metadata" width="100%"  >
          <source src={this.props.url+"#t="+(start||0)+","+(end||"")} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'/>
          </video>
       </Segment>
    );
  }
}
));
