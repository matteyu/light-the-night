import React, { Component } from 'react'
import { IonImg, IonItem, IonText, IonInput, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { returnDownForwardOutline, star } from 'ionicons/icons';
import './style/HomeThirdSection.css'

class HomeThirdSection extends Component {
    render() {
        return (
            <div>
                <IonImg className="thirdImg" src="/assets/registration_login.jpg" />
                <IonItem lines="none" className="headerBlurbThird">
                    <IonText className="loginHeader">Registration / Log In</IonText>
                </IonItem>
                <IonItem lines="none" className="challengeBlurbItemThird">
                    <IonLabel style={{fontSize: "30px", color: "white"}}>Email:</IonLabel>
                    <IonInput className="email">
                    </IonInput>
                </IonItem>
                <IonItem lines="none" className="challengeBlurbItemThirdTwo">
                    <IonLabel style={{fontSize: "30px", color: "white"}}>Password:</IonLabel>
                    <IonInput type="password" className="password">
                    </IonInput>
                </IonItem>
                <IonItem lines="none" className="challengeBlurbItemThirdThree">
                    <IonButton 
                        fill="clear"
                        style={{
                            left: "0", 
                            position: "absolute",
                            fontSize: "30px",
                            color: "white",
                            height: "50px",
                            marginBottom: "0"
                        }}
                    >
                        <IonIcon slot="start" icon={returnDownForwardOutline} />
                        Log In</IonButton>
                    <IonButton 
                        fill="clear"
                        style={{
                            right: "0", 
                            position: "absolute",
                            fontSize: "30px",
                            color: "white",
                            height: "50px",
                            marginBottom: "0"
                        }}
                    >
                        <IonIcon slot="start" icon={star} />
                        Register</IonButton>
                </IonItem>
            </div>
        )
    }
}

export default HomeThirdSection
