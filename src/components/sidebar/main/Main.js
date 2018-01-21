import React from 'react';
import {Card, Button,Icon,Grid,Segment } from 'semantic-ui-react';
import "./Main.css"
import {observer, inject} from 'mobx-react';
import {TimeUtils} from '../../../utils/utils';
import ClipForm from '../../clipform/ClipForm';
export default  inject('store')(observer( class MainVideo extends React.Component {
  constructor(props){
    super(props)
    this.state = {start:0,end:0,name:"",showForm:false};
    this.toggleForm = this.toggleForm.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);

  }

  toggleForm(){
    this.setState({showForm:!this.state.showForm})
  }
  onSaveClick(){
    this.props.store.savePlayList();
  }
  render() {
    let tu = new TimeUtils();
    return (<Card fluid className="main_video">
             <Card.Content>
               <Card.Header  >
                 Main Video
               </Card.Header>
               <Card.Meta  >
                 <Grid >
                   <Grid.Column width={7}>Duration: {tu.toTimeString(this.props.store.duration.get())}</Grid.Column>
                   <Grid.Column width={4}>
                     <Button icon color={!this.state.showForm?"green":"orange"} onClick={this.toggleForm} size="mini" floated="right" labelPosition='right'>
                       {(!this.state.showForm?"Add":"Hide")}<Icon name={(!this.state.showForm?"down":"up")+" arrow"} />
                     </Button>
                   </Grid.Column>
                   <Grid.Column width={4}>
                     <Button icon color="blue" onClick={this.onSaveClick} size="mini" floated="right" labelPosition='right'>
                       Save <Icon name="save" />
                     </Button>
                  </Grid.Column>

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
