import React, { Component } from 'react'
import { IonImg, IonCardContent, IonCardHeader, IonText, IonItemGroup, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { logoInstagram } from 'ionicons/icons';
import './style/HomeFirstSection.css'

class HomeFirstSection extends Component {
    handleSlideToLogin = () =>{
        const slides: any = document.getElementById('slides')
        slides.slideTo(2)
    }

    handleSlideToChallenge = () =>{
        const slides: any = document.getElementById('slides')
        slides.slideTo(3)
    }

    handleSlideToLeaderboard = () =>{
        const slides: any = document.getElementById('slides')
        slides.slideTo(4)
    }

    handleSlideToInsta = () =>{
        window.open('https://www.instagram.com/ialtnchallenge/')
    }

    render() {
        return (

            <IonCardContent>
                <IonGrid style={{'height': '90vh'}}>
                    <IonRow>
                        <IonCol size-xs="12" size-lg="6">
                            <IonImg 
                                src="/assets/logo.jpg"
                                className="firstSectionLightTheNightLogo"
                            />
                            <IonImg 
                                src="/assets/ialogo.png"
                                className="firstSectionLightTheNightLogo"
                            />
                        </IonCol>
                        <IonCol>

                                {/* <IonText
                                    className="firstSectionHeaderActionsLogin"
                                    onClick={() => this.handleSlideToLogin()}
                                >
                                    Login
                                </IonText> */}
                                <IonText
                                    className="firstSectionHeaderActionsChallenge"
                                    onClick={() => this.handleSlideToChallenge()}
                                >
                                    Challenge List
                                </IonText>
                                <IonText
                                    className="firstSectionHeaderActionsLeaderboard"
                                    onClick={() => this.handleSlideToLeaderboard()}
                                >
                                    Leaderboard
                                </IonText>
                                <IonIcon 
                                    className="firstSectionHeaderActionsInsta" 
                                    icon={logoInstagram}
                                    onClick={() => this.handleSlideToInsta()}
                                ></IonIcon>

                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonText
                                    className="firstSectionMainText"
                                >
                                    LIGHT THE NIGHT CHALLENGE
                            </IonText>
                            <IonText
                                    className="firstSectionMainSubText"
                            >
                                    SUPPORTED BY IA FINANCIAL GROUP
                            </IonText>
                        </IonCol>
                        {
                            window.innerWidth <= 1367?
                            <IonCol size-xs="10" size-lg="6" style={{margin: "auto"}}>
                                <IonImg 
                                    src="/assets/mountain.png"
                                    style={{position: "inherit", height: "80%"}}
                                />
                            </IonCol>
                            :
                            <IonCol size-xs="10" size-lg="6">
                                <IonImg 
                                    src="/assets/mountain.png"
                                    style={{position: "inherit", height: "80%"}}
                                />
                            </IonCol>
                        }
                        
                    </IonRow>
                </IonGrid>


                
                <IonCardHeader
                    className="firstSectionCardHeader"
                >
                           
                </IonCardHeader>
                <IonItemGroup>
                    
                    
                </IonItemGroup>
            </IonCardContent>
        )
    }
}

export default HomeFirstSection