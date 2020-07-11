import { IonCardContent, IonPage, IonCard } from '@ionic/react';
import React, { Component } from 'react';
import RegisterForm from '../components/RegisterForm';
import './style/Registration.css';


class Registration extends Component {

  render() {
    return (
      <IonPage>
        <IonCard>
          <IonCardContent>

          <RegisterForm />

          </IonCardContent>
        </IonCard>
      </IonPage>
    )
  }
}


export default Registration;
