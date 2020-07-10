import React, { Component } from 'react'
import './style/LoginForm.css';
import { IonItem, IonLabel, IonInput, IonIcon, IonButton } from '@ionic/react';
import { personSharp, lockClosedSharp } from 'ionicons/icons';
import * as LoginAPI from '../api/login'
import * as CommonAPI from '../api/common'



class LoginForm extends Component{
  state = {
    username: '',
    password: ''
  }

  usernameInput = (event: any) =>{
    this.setState({username: event.target.value})
  }

  passwordInput = (event: any) => {
    this.setState({password: event.target.value})
  }

  handleLogin = async() => {
    var res = await LoginAPI.login(this.state.username, this.state.password)
    var data: any = await CommonAPI.redirectData('accounts', res.data.auth_token)
    window.sessionStorage.setItem('data', JSON.stringify(data.data))
    //console.log(JSON.parse(window.sessionStorage.getItem('data')||''))
    window.location.replace("/dashboard")
  }

  render() {
    return (
      
      <div className="container">
        <strong>Chipino</strong>
        <p>Mogul</p>


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

          <IonButton onClick={
            () => this.handleLogin()
            }>Login</IonButton>
      </div>
    )
  }
}


export default LoginForm;
