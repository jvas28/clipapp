import React, { Component } from 'react';
import './App.css';
import { Grid, Container } from 'semantic-ui-react'
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Content from './components/content/Content';
import 'semantic-ui-css/semantic.min.css';
import {Provider} from 'mobx-react'
import AppStore from './store/appstore';
class App extends Component {
  componentWillMount(){
    if(this.props.readonly)
    {
        AppStore.setReadOnly()
        if(this.props.playlist.length>0)
        AppStore.setPlayList(this.props.playlist)
    }

  }
  render() {
    return (
      <Provider store={AppStore}>
        <Container fluid className="App">
          <Header url = {this.props.url} />
           <Grid divided='vertically'>
             <Grid.Column mobile={16} widescreen={12} largeScreen={10}  computer={10} tablet={16}>
               <Content url={this.props.url} />
             </Grid.Column >
                <Grid.Column  mobile={16} widescreen={4} largeScreen={6} computer={6}  tablet={16}>
                 <Sidebar />
               </Grid.Column>
           </Grid>
        </Container>
      </Provider>

    );
  }
}

export default App;
