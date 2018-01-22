import React from 'react';
import {Segment,Dimmer,Loader} from 'semantic-ui-react';
import {observer, inject} from 'mobx-react';

export default inject('store')(observer( class Content extends React.Component {

  render() {
    let current_clip = this.props.store.clips.filter((c)=>c.playing)[0];
    let start = 0;
    let end = this.props.store.duration.get();
    if(current_clip !== undefined)
    {
      start = current_clip.start;
      end = current_clip.end;
    }
    let is_loading = this.props.store.videoloading.get()
    return (
      <Segment inverted>
        {is_loading? <Dimmer active>
        <Loader size='tiny'>Loading</Loader>
      </Dimmer>:""}
        <video style={{visibility:is_loading?"hidden":"visible"}}  ref="video" onLoadedMetadata={()=>{this.props.store.setDuration(this.refs.video)}}  preload="metadata" width="100%"  >
          <source src={this.props.url+"#t="+(start||0)+","+(end||"")} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'/>
          </video>
       </Segment>
    );
  }
}
));
