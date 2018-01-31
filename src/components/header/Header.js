import React from 'react';
import { Segment, Icon, Header as H,Modal,Button,Input } from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
export default  inject('store')(observer(class Header extends React.Component {
  constructor(props){
    super(props);
    this.savePlayList = this.savePlayList.bind(this);
    this.state ={code:"",showShareDialog:false,copied:false}
    this.showShareDialog = this.showShareDialog.bind(this);
    this.closeShareDialog = this.closeShareDialog.bind(this);
    this.onCopy = this.onCopy.bind(this);

  }
  savePlayList(){
    this.props.store.savePlayList();
  }
  showShareDialog(){
    this.setState({code:"<div id='react-clipper' video-url='"+this.props.url+"' readonly='true' data-playlist='"+JSON.stringify(this.props.store.clips.toJS())+"' />",showShareDialog:true});
  }
  closeShareDialog(){
    this.setState({showShareDialog:false});
  }
  onCopy(){
    let input = this.refs.inputcopy.inputRef;
    input.value = this.state.code;
    input.select()
    this.setState({copied:true});
    setTimeout(()=>{this.setState({copied:false})},5000)
    document.execCommand("Copy");
  }
  render() {
    return (<Segment inverted clearing>
      <H as="h4" floated="left" inverted color="blue"><Icon fitted name="video" />Clipper</H>
      {!this.props.store.readonly.get()?
        <H as="h3" floated="right" inverted style={{cursor:"pointer"}} onClick={this.showShareDialog} color={"teal"}> <Icon   fitted name="share" /></H>
        :""
      }
      {!this.props.store.readonly.get()?
        <H as="h3" floated="right" inverted style={{cursor:"pointer"}} onClick={this.savePlayList} color={this.props.store.playlistState.get('changed')?"blue":"green"}> <Icon   fitted name="save" />{this.props.store.playlistState.get('changed')?"Save changes...":""}</H>
        :""
      }
      <Modal size="tiny" open={this.state.showShareDialog} onClose={this.closeShareDialog}>
            <Modal.Header>
              Share your playlist
            </Modal.Header>
            <Modal.Content>
              <Input
                ref="inputcopy"
                fluid
                 action={{ color: this.state.copied?'green':'teal', labelPosition: 'right', icon: 'copy', content: this.state.copied?'Copied!':'Copy',onClick:this.onCopy}}
                 defaultValue={this.state.code}
               />
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.closeShareDialog} negative>
                Cancel
              </Button>

            </Modal.Actions>
          </Modal>
    </Segment>);
  }
}))
