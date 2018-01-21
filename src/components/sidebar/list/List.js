import React from 'react';
import { List as SemanticList} from 'semantic-ui-react';
import ListItem  from './ListItem';
import {observer,inject} from 'mobx-react';
export default inject('store')(observer(class List extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    if(this.props.playlist)
    {
      this.props.playlist.map((clip)=>{
            this.props.store.addClip(clip);
      })
    }
  }

  render() {
    return (<SemanticList color="white" size="large">
                {
                  this.props.store.clips.map((clip,k)=>{
                        return <ListItem key={k} {...clip} readonly = {this.props.readonly} />
                  })
                }
             </SemanticList>);
  }
}
));
