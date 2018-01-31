import React from 'react';
import { List as SemanticList,Transition} from 'semantic-ui-react';
import ListItem  from './ListItem';
import {observer,inject} from 'mobx-react';
export default inject('store')(observer(class List extends React.Component {
  componentDidMount(){
    if(this.props.playlist)
    {
      this.props.playlist.map((clip)=>{
            this.props.store.addClip(clip);
            return clip;
      })
    }
  }

  render() {
    return (
      <Transition.Group
          as={SemanticList}
          duration={200}
          divided
          color="white"
          size="large"
          verticalAlign='middle'
          >


                {
                  this.props.store.clips.map((clip,k)=>{
                        return <ListItem as={SemanticList.Item} key={k} index={k} {...clip} readonly = {this.props.readonly} />
                  })
                }
              </Transition.Group>
          );
  }
}
));
