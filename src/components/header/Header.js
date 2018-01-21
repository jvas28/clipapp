import React from 'react';
import { Segment, Icon, Header as H } from 'semantic-ui-react'
export default class Header extends React.Component {

  render() {
    return (<Segment inverted>
             <H as='h4' inverted color='blue'><Icon fitted name='video' />Clipper</H>
              
           </Segment>);
  }
}
