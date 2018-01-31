import React from 'react';
import {Card, Button,Icon,Grid,Segment } from 'semantic-ui-react';
import ClipForm from '../../clipform/ClipForm';
import {TimeUtils} from '../../../utils/utils';
import {observer, inject} from 'mobx-react';

import "./Main.css"

export default  inject('store')(observer( class MainVideo extends React.Component {
  constructor(props){
    super(props)
    this.state = {start:0,end:0,name:"",showForm:false};
    this.toggleForm = this.toggleForm.bind(this);
    this.playNext = this.playNext.bind(this);
    this.playPrevious = this.playPrevious.bind(this);
    this.togglePlayer = this.togglePlayer.bind(this);

  }
  componentDidMount(){
    document.body.onkeypress = (e)=>{
      if (e.ctrlKey){
        if(e.charCode===10)
        {
          this.props.store.playNext();
        }
        if(e.charCode===26)
        {
          this.props.store.playPrevious();
        }
      }

    }
  }
  togglePlayer(){
    this.props.store.requestTogglePlayer();
  }
  toggleForm(){
    this.setState({showForm:!this.state.showForm})
  }
  playNext(){
    this.props.store.playNext();
  }
  playPrevious(){
    this.props.store.playPrevious();
  }
  render() {
    let tu = new TimeUtils();

    return (<Card fluid className="main_video" >
      <Card.Content inverted>
        <Card.Meta  >
          <Grid  >
            <Grid.Row >
              <Grid.Column>
                  <Segment  inverted><p >{this.props.store.playerState.get('title')||"Main Video"}</p> <p>{tu.toTimeString(this.props.store.playerState.get('current_time'))}/{tu.toTimeString(this.props.store.playerState.get('current_duration')||0)}</p></Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16} textAlign="center">
                <Button.Group fluid inverted >
                  <Button   color="twitter" size="huge" onClick={this.playPrevious}  icon>
                    <Icon name='chevron left' />
                  </Button>
                  <Button  color="blue" size="huge" onClick={this.togglePlayer} icon>
                    <Icon name={!this.props.store.playerState.get('playing')?"video play":'pause'}  />
                  </Button>
                  <Button   color="twitter" size="huge" onClick={this.playNext}  icon>
                    <Icon name='chevron right' />
                  </Button>
                </Button.Group>
                </Grid.Column>


            </Grid.Row>
            {!this.props.store.readonly.get()?
              <Grid.Row>
                <Grid.Column width={16}>
                  <Button icon color={!this.state.showForm?"green":"orange"} onClick={this.toggleForm} size="mini" floated="right" labelPosition='right'>
                    {(!this.state.showForm?"Add Clip":"Hide Form")}<Icon name={(!this.state.showForm?"add":"up arrow")} />
                  </Button>
                </Grid.Column>
              </Grid.Row>:""
            }



          </Grid>

        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Segment style={{display:(!this.state.showForm)?"none":"block"}}>
          <ClipForm {...this.state} update={false}/>
        </Segment>
      </Card.Content>
    </Card>);
  }
}
))
