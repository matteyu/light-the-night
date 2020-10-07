import React, { Component } from 'react'
import { IonImg, IonItem, IonText, IonInput, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { returnDownForwardOutline, star } from 'ionicons/icons';
import './style/HomeThirdSection.css'

interface ComponentProps{
    handleEmailChange: (val: string) => void;
    handlePasswordChange: (val: string) => void;
    handleLogin: () => void;
    handleDisclaimer: () => void;
}

class HomeThirdSection extends Component<ComponentProps, {}> {
    render() {
        return (
            <div style={{height: "100%", overflowY: "scroll"}}>
                <IonGrid>
                    <IonRow>
                        <IonCol size-xs="7" size-lg="6" style={{margin:"auto"}}>
                        {
                            window.innerWidth <=1367?
                            <IonImg style={{height: "80%"}} src="/assets/registration_login.jpg" />
                            :
                            <IonImg style={{height: "90vh"}} src="/assets/registration_login.jpg" />
                        }
                        </IonCol>
                        
                        {
                            window.innerWidth <= 1367?
                            <IonCol>
                                <IonRow>
                                    <IonCol style={{margin:"auto"}}>
                                        <IonItem lines="none" className="headerBlurbThird">
                                            {
                                                window.innerWidth <= 1367?
                                                <IonText className="loginHeaderResponsive">Registration / Log In</IonText>
                                                :
                                                <IonText className="loginHeader">Registration / Log In</IonText>
                                            }
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow style={{paddingTop:"1%"}}>
                                    <IonCol style={{margin:"auto"}}>
                                        <IonItem lines="none" className="challengeBlurbItemThird" style={{marginBottom: "3vh", width:"100%"}}>
                                            <IonLabel style={{fontSize: "3vh", color: "white"}}>Email:</IonLabel>
                                            <IonInput onIonChange={(e: any) => {this.props.handleEmailChange(e.target.value)}} className="email">
                                            </IonInput>
                                        </IonItem>
                                        <IonItem lines="none" className="challengeBlurbItemThirdTwo" style={{width:"100%"}}>
                                            <IonLabel style={{fontSize: "3vh", color: "white"}}>Password:</IonLabel>
                                            <IonInput onIonChange={(e: any) => {this.props.handlePasswordChange(e.target.value)}} type="password" className="password">
                                            </IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol style={{margin:"auto"}}>
                                        <IonItem lines="none" className="challengeBlurbItemThirdThree">
                                            <IonButton 
                                                fill="clear"
                                                style={{
                                                    fontSize: "2vh",
                                                    color: "white",
                                                    height: "20px",
                                                    marginBottom: "0",
                                                    width: "100%"
                                                }}
                                                onClick={() => this.props.handleLogin()}
                                            >
                                                <IonIcon slot="start" icon={returnDownForwardOutline} />
                                                Log In</IonButton>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol style={{margin:"auto"}}>
                                        <IonItem lines="none" className="challengeBlurbItemThirdThree">
                                            <IonButton 
                                                fill="clear"
                                                style={{
                                                    fontSize: "2vh",
                                                    color: "white",
                                                    height: "20px",
                                                    marginBottom: "0",
                                                    width: "100%"
                                                }}
                                                onClick={() => this.props.handleDisclaimer()}
                                            >
                                                <IonIcon slot="start" icon={star} />
                                                Register</IonButton>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                            :
                            <IonCol style={{marginTop: "15vh"}}>
                                <IonRow>
                                <IonCol style={{margin:"auto"}}>
                                    <IonItem lines="none" className="headerBlurbThird">
                                        {
                                            window.innerWidth <= 1367 ?
                                            <IonText className="loginHeaderResponsive">Registration / Log In</IonText>
                                            :
                                            <IonText className="loginHeader">Registration / Log In</IonText>
                                        }
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                                <IonRow style={{paddingTop:"6%"}}>
                                <IonCol style={{margin:"auto"}}>
                                    <IonItem lines="none" className="challengeBlurbItemThird" style={{marginBottom: "3vh", width:"100%"}}>
                                        <IonLabel style={{fontSize: "3vh", color: "white"}}>Email:</IonLabel>
                                        <IonInput type="email" onIonChange={(e: any) => {this.props.handleEmailChange(e.target.value)}} className="email">
                                        </IonInput>
                                    </IonItem>
                                    <IonItem lines="none" className="challengeBlurbItemThirdTwo" style={{marginBottom: "3vh", width:"100%"}}>
                                        <IonLabel style={{fontSize: "3vh", color: "white"}}>Password:</IonLabel>
                                        <IonInput onIonChange={(e: any) => {this.props.handlePasswordChange(e.target.value)}} type="password" className="password">
                                        </IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                                <IonRow>
                                <IonCol style={{margin:"auto"}}>
                                    <IonItem lines="none" className="challengeBlurbItemThirdThree">
                                        <IonButton 
                                            fill="clear"
                                            style={{
                                                fontSize: "2vh",
                                                color: "white",
                                                height: "50px",
                                                marginBottom: "0",
                                                width: "100%"
                                            }}
                                            onClick={() => this.props.handleLogin()}
                                        >
                                            <IonIcon slot="start" icon={returnDownForwardOutline} />
                                            Log In</IonButton>
                                    </IonItem>
                                </IonCol>
                                <IonCol style={{margin:"auto"}}>
                                    <IonItem lines="none" className="challengeBlurbItemThirdThree">
                                        <IonButton 
                                            fill="clear"
                                            style={{
                                                fontSize: "2vh",
                                                color: "white",
                                                height: "50px",
                                                marginBottom: "0",
                                                width: "100%"
                                            }}
                                            onClick={() => this.props.handleDisclaimer()}
                                        >
                                            <IonIcon slot="start" icon={star} />
                                            Register</IonButton>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            </IonCol>
                        }
                        
                    
                    </IonRow>
                </IonGrid>
            </div>
        )
    }
}

export default HomeThirdSection
