import React from 'react';
import { List, Image,Grid,Button,Icon} from 'semantic-ui-react';
import "./ListItem.css";
import {TimeUtils} from '../../../utils/utils';
import ClipForm from '../../clipform/ClipForm';
import {inject,observer} from 'mobx-react'
export default inject('store')(observer(class ListItem extends React.Component {
  constructor(props){
    super(props);
    this.state ={editing:false};
    this.onItemClick = this.onItemClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);

  }
  onItemClick(){
    this.props.store.playClip(this.props.id)
  }
  onDeleteClick(){
    var item = this.props.store.clips.filter((clip)=>this.props.id == clip.id)[0];
    this.props.store.removeClip(item);
  }
  toggleEditing(){
    this.setState({editing:!this.state.editing})
  }
  render() {
    let tu = new TimeUtils();
    return (<List.Item className={"item-clip "+(this.props.playing?"playing":"")} >
                <Icon name={this.props.playing?"video":"play"} className="action_icon"  onClick={this.onItemClick} />
                <List.Content >
                  <List.Header>{this.props.name}</List.Header>
                  {!this.props.readonly?<List.Description as="div" className="clip-description">
                    <Grid>
                      <Grid.Column width={6}><b>Start:&nbsp;</b>{tu.toTimeString(this.props.start)}</Grid.Column>
                      <Grid.Column width={6}><b>End:&nbsp;</b>{tu.toTimeString(this.props.end)}</Grid.Column>
                      <Grid.Column width={2}>
                        {(!this.props.playing&&!this.props.main)?<Icon name={this.state.editing?"checkmark":"edit"} onClick={this.toggleEditing} className="action_icon" size="big" color="blue" />:""}
                      </Grid.Column>
                      <Grid.Column width={2}>
                        {(!this.props.playing&&!this.state.editing&&!this.props.main)?<Icon name="remove" onClick={this.onDeleteClick} className="action_icon" size="big" color="red" />:""}
                      </Grid.Column>
                    </Grid>
                    <Grid>
                      <Grid.Column width={16}>
                      {(this.state.editing&&!this.props.playing&&!this.props.main)?<ClipForm id={this.props.id} name={this.props.name} start={this.props.start} end={this.props.end} update={true}  />:""}
                    </Grid.Column>
                    </Grid>

                  </List.Description>:""}

                </List.Content>
              </List.Item>);
  }
}
))
