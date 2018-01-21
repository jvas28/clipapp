import React, {PropTypes} from 'react';
import List  from '../sidebar/list/List';
import Content from '../content/Content'
import { Segment} from 'semantic-ui-react';
import {Provider} from 'mobx-react'
import AppStore from '../../store/appstore';
export default class ReadOnlyPlayer extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
          <Provider store={AppStore}>
              <Segment  inverted style={{width:"300px"}} >
                <Content />
                <List readonly={true} playlist={this.props.playlist||[]}/>
              </Segment>
            </Provider>

    );
  }
}
