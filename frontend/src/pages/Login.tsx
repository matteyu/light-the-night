import { IonCardContent, IonPage, IonCard } from '@ionic/react';
import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import './style/Login.css';


class Home extends Component {

  render() {
    return (
      <IonPage>
        <IonCard>
          <IonCardContent>

          <LoginForm />

          </IonCardContent>
        </IonCard>
      </IonPage>
    )
  }
}


export default Home;
