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
  render() {
    return (
      <Provider store={AppStore}>
        <Container fluid className="App">
          <Header />
           <Grid divided='vertically'>
             <Grid.Row columns={2}>
               <Grid.Column  width={4}>
                 <Sidebar />
               </Grid.Column>
               <Grid.Column width={12}>
                 <Content />
               </Grid.Column >
             </Grid.Row>
           </Grid>
        </Container>
      </Provider>

    );
  }
}

export default App;
