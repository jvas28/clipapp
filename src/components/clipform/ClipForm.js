import React from 'react';
import {Button,Icon,Input,Label,Confirm } from 'semantic-ui-react';

import {TimeUtils} from '../../utils/utils';
import {observer, inject} from 'mobx-react';

import './ClipForm.css';

export default inject('store')(observer(  class ClipForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {start:this.props.start,end:this.props.end,name:this.props.name,update:this.props.update,showConfirm:false,};
    this.onStartChange = this.onStartChange.bind(this);
    this.onEndChange = this.onEndChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.addClip = this.addClip.bind(this);
    this.onCancelUdpate = this.onCancelUdpate.bind(this);
    this.showConfirm = this.showConfirm.bind(this);
  }
  onStartChange(e){
    let startValue = e.target.value;
    let endValue = parseInt(e.target.value,10) + ((parseInt(e.target.value,10) < parseInt(this.props.store.duration.get(),10)) ? 1 : 0);

    let stateUpdate = {
      start:startValue,
      end: endValue
    };
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
      this.setState({showConfirm:false});
    }

  }
  showConfirm(){
    this.setState({showConfirm:true});
  }
  onCancelUdpate(){
    this.setState({showConfirm:false});
  }

  render() {
    let tu = new TimeUtils();

    return (<div>
      <div>
        <h5>New Clip</h5>
        <Input placeholder='Name...' fluid value={this.state.name} onChange={this.onNameChange}/><br/>
        <Input fluid type="range" onChange={this.onStartChange} value={this.state.start} min="0" max={Math.round(this.props.store.duration.get())-1}  />
        <Label color="black">
          <Icon name='time' /> Start: {tu.toTimeString(this.state.start)}
        </Label>

        <Input type="range" fluid onChange={this.onEndChange}  value={this.state.end} min={this.state.start} max={Math.round(this.props.store.duration.get())} />
        <Label color="black">
          <Icon name='time' /> End:   {tu.toTimeString(this.state.end)}
        </Label>
        <hr/>
        <div>
          <Button disabled={!(this.state.name!==""&&this.state.end>0)} onClick={this.props.update?this.showConfirm:this.addClip} primary fluid>{this.state.update?"Update":"Add"}</Button>
        </div>
      </div>
      {this.props.update?<Confirm
        open={this.state.showConfirm}
        onCancel={this.onCancelUdpate}
        onConfirm={this.addClip}
      />:""}

    </div>);
  }
}
))
