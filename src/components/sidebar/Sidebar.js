import React from 'react';
import { Segment} from 'semantic-ui-react';
import Main from './main/Main';
import List from './list/List';
export default class Sidebar extends React.Component {


  render() {
    return (<Segment >
              <Main />
              <List readonly={false}/>
            </Segment>);
  }
}
