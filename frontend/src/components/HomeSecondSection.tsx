import React, { Component } from 'react'
import { IonContent, IonImg, IonItemGroup, IonItem, IonText } from '@ionic/react';
import './style/HomeSecondSection.css'

class HomeSecondSection extends Component {
    render() {
        return (
            <div>
                <IonImg className="secondSlidefirstImg" src="/assets/secondSection1.jpg" />
                <IonItem lines="none" className="headerBlurb">
                    <IonText className="challengeHeader">What's the Challenge?</IonText>
                </IonItem>
                <IonItem lines="none" className="challengeBlurbItem">
                    <IonText className="challengeBlurb">
                        The Light the Night Challenge is a series of activities for participants to do to raise awareness for the Leukemia and Lymphoma Society. Participants are to complete the challenges and earn points to and win prizes all while raising awareness and collecting donations. 
                    </IonText>
                </IonItem>
            </div>
        )
    }
}

export default HomeSecondSection
