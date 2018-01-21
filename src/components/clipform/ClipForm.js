import React, {PropTypes} from 'react';
import {Button,Icon,Input,Label } from 'semantic-ui-react';
import {TimeUtils} from '../../utils/utils';
import {observer, inject} from 'mobx-react';
import './ClipForm.css';
export default inject('store')(observer(  class ClipForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {start:this.props.start,end:this.props.end,name:this.props.name,update:this.props.update};
    this.onStartChange = this.onStartChange.bind(this);
    this.onEndChange = this.onEndChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.addClip = this.addClip.bind(this);

  }
  onStartChange(e){
    let stateUpdate = {start:e.target.value,end:parseInt(e.target.value)+(parseInt(e.target.value)<parseInt(this.props.store.duration.get())?1:0)};
    this.setState(stateUpdate)

  }
  onEndChange(e){
    this.setState({end:e.target.value})
  }
  onNameChange(e){
    this.setState({name:e.target.value})
  }
  addClip(){
    let clip = {name:this.state.name,start:this.state.start,end:this.state.end,main:false};
      if(!this.props.update)
      {
        this.props.store.addClip(clip);
        this.setState({name:"",start:0,end:0})
      }else{
        clip.id=this.props.id;
        this.props.store.updateClip(clip);
      }

  }

  render() {
    let tu = new TimeUtils();

    return (<div>
      <h5>New Clip</h5>
      <Input placeholder='Name...' fluid value={this.state.name} onChange={this.onNameChange}/><br/>
      <Input fluid type="range" onChange={this.onStartChange} value={this.state.start} min="0" max={Math.round(this.props.store.duration.get())}  />
      <Label color="black">
       <Icon name='time' /> Start: {tu.toTimeString(this.state.start)}
     </Label>

     <Input type="range" fluid onChange={this.onEndChange}  value={this.state.end} min={this.state.start} max={Math.round(this.props.store.duration.get())} />
     <Label color="black">
      <Icon name='time' /> End:   {tu.toTimeString(this.state.end)}
     </Label>
     <hr/>
      <div>
       <Button disabled={!(this.state.name!=""&&this.state.end>0)} onClick={this.addClip} primary fluid>{this.state.update?"Update":"Add"}</Button>
     </div>
   </div>);
  }
}
))
