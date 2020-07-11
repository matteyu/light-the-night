import React, { Component } from 'react'
import './style/LoginForm.css';
import { IonItem, IonLabel, IonInput, IonIcon, IonButton, IonCard, IonCardContent } from '@ionic/react';
import { personSharp, lockClosedSharp, warning } from 'ionicons/icons';
import * as LoginAPI from '../api/login'
import * as CommonAPI from '../api/common'



class LoginForm extends Component{
  state = {
    username: '',
    password: '',
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

  handleLogin = async() => {
    try{
      var next = '/login'
      var res = await LoginAPI.login(this.state.username, this.state.password)
      next = res['next']
      var data: any = await CommonAPI.redirectData('accounts', res['data'].data.auth_token, 'get', {},`${this.state.username}/`)
      window.sessionStorage.setItem('data', JSON.stringify(data.data))
      window.sessionStorage.setItem('token', res['data'].data.auth_token)
      window.location.replace(next)
    } catch(error) {
      this.setState({errorMessage: 'There was a problem with the login.'})
    }
  }

  handleSignUp = () =>{
    window.location.replace('/registration')
  }

  render() {
    return (
      
      <div className="container">
        <span className="logoText">Light the Night</span>
        <br/>
        {/* <img 
          alt="Mogul" 
          src="http://localhost:8000/static/images/mogul.png"
          className="logo"
          /> */}


          <IonItem id="usernamefield">
            <IonLabel position="fixed">
              <IonIcon icon={personSharp}></IonIcon>
              Username:
            </IonLabel>
            <IonInput onIonChange={e => this.usernameInput(e)} type="text"></IonInput>
          </IonItem>

          <IonItem id="passwordfield">
            <IonLabel position="fixed">
              <IonIcon icon={lockClosedSharp}></IonIcon>
              Password:
            </IonLabel>
            <IonInput onIonChange={e => this.passwordInput(e)} type="password"></IonInput>
          </IonItem>

          <IonButton 
            color="dark"
            onClick={
            () => this.handleLogin()
            }>Login</IonButton>
          <br/>
          <IonButton 
            color="dark"
            onClick={
            () => this.handleSignUp()
            }>Sign Up</IonButton>

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


export default LoginForm;
