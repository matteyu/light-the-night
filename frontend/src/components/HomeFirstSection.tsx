import React, { Component } from 'react'
import { IonImg, IonSlides, IonSlide, IonButton, IonCardContent, IonCard, IonCardHeader, IonText, IonItemGroup, IonIcon } from '@ionic/react';
import { logoInstagram } from 'ionicons/icons';
import './style/HomeFirstSection.css'

class HomeFirstSection extends Component {
    render() {
        return (
            <IonCardContent>
                <IonCardHeader
                    className="firstSectionCardHeader"
                >
                    <IonImg 
                        src="/assets/logo.jpg"
                        className="firstSectionLightTheNightLogo"
                    ></IonImg>
                    <IonImg 
                        src="/assets/ialogo.png"
                        className="firstSectionLightTheNightLogo"
                    ></IonImg>
                    <IonItemGroup
                        className="headerActions"
                    >
                        <IonText
                            className="firstSectionHeaderActionsLogin"
                        >
                            Login
                        </IonText>
                        <IonText
                            className="firstSectionHeaderActionsChallenge"
                        >
                            Challenge List
                        </IonText>
                        <IonText
                            className="firstSectionHeaderActionsLeaderboard"
                        >
                            Leaderboard
                        </IonText>
                        <IonIcon className="firstSectionHeaderActionsInsta" icon={logoInstagram}></IonIcon>
                    </IonItemGroup>         
                </IonCardHeader>
                <IonItemGroup>
                    <IonText
                            className="firstSectionMainText"
                        >
                            LIGHT THE NIGHT CHALLENGE
                    </IonText>
                    <IonText
                            className="firstSectionMainSubText"
                        >
                            PRESENTED BY IA FINANCIAL GROUP
                    </IonText>
                    <IonImg 
                        src="/assets/mountain.png"
                        className="firstSectionMainImage"
                    ></IonImg>
                </IonItemGroup>
            </IonCardContent>
        )
    }
}

export default HomeFirstSection