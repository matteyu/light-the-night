import React, { Component } from 'react'
import './style/RegisterForm.css';
import { IonItem, IonLabel, IonInput, IonIcon, IonButton, IonCard, IonCardContent } from '@ionic/react';
import { personSharp, lockClosedSharp, warning, mail } from 'ionicons/icons';
import * as RegistrationAPI from '../api/register'



class RegisterForm extends Component{
  state = {
    username: '',
    password: '',
    password2: '',
    email: '',
    errorMessage: '',
  }

  componentDidMount(){
    this.setState({errorMessage: ''})
  }

  usernameInput = (event: any) =>{
    this.setState({username: event.target.value})
  }

  passwordInput = (event: any) => {
    this.setState({password: event.target.value})
  }

  password2Input = (event: any) => {
    this.setState({password2: event.target.value})
  }

  emailInput = (event: any) => {
    this.setState({email: event.target.value})
  }

  handleBack = () => {
    window.location.replace('/login')
  }

  handleRegistration = async() => {
    try{
      var next = '/login'
      if(this.state.password !== this.state.password2){
          throw Object.assign(
            new Error('Passwords do not match!'),
            { code: 400 }
         );
      }
      var res = await RegistrationAPI.register(
          this.state.username, 
          this.state.password,
          this.state.password2,
          this.state.email)

      next = res['next']
      window.location.replace(next)
    } catch(error) {
      var actualError = ''
      if(error.message === "Passwords do not match!"){
        actualError = error
      }
      else{
        actualError = 'Try again later.'
      }
      this.setState({errorMessage: 'There was a problem with the registration. ' + actualError})
    }
  }

  render() {
    return (
      <div className="container">
          <IonItem id="usernamefield">
            <IonLabel position="fixed">
              <IonIcon icon={personSharp}></IonIcon>
            </IonLabel>
            <IonInput onIonChange={e => this.usernameInput(e)} type="text" placeholder="Username"></IonInput>
          </IonItem>

          <IonItem id="passwordfield">
            <IonLabel position="fixed">
              <IonIcon icon={lockClosedSharp}></IonIcon>
            </IonLabel>
            <IonInput onIonChange={e => this.passwordInput(e)} type="password" placeholder="Password"></IonInput>
          </IonItem>

          <IonItem id="passwordfield">
            <IonLabel position="fixed">
              <IonIcon icon={lockClosedSharp}></IonIcon>
            </IonLabel>
            <IonInput onIonChange={e => this.password2Input(e)} type="password" placeholder="Confirm Password"></IonInput>
          </IonItem>

          <IonItem id="emailfield">
            <IonLabel position="fixed">
              <IonIcon icon={mail}></IonIcon>
            </IonLabel>
            <IonInput onIonChange={e => this.emailInput(e)} type="text" placeholder="Email"></IonInput>
          </IonItem>

          <IonButton 
            color="dark"
            onClick={
            () => this.handleRegistration()
            }>
              Submit
          </IonButton>
          <br />
          <IonButton 
            color="dark"
            onClick={
            () => this.handleBack()
            }>
              Go Back to Login
          </IonButton>

          {
            this.state.errorMessage === ''?'':
            <IonCard>
              <IonCardContent className="error">
              <IonIcon style={{fontSize: "20px"}} icon={warning}></IonIcon>
                {this.state.errorMessage}
              </IonCardContent>
            </IonCard>
          }
          
      </div>
    )
  }
}


export default RegisterForm;
