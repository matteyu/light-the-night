import React, { Component } from 'react'
import { IonContent, IonImg, IonItemGroup, IonItem, IonText, IonButton, IonCol, IonRow, IonGrid, IonModal } from '@ionic/react';
import './style/HomeSecondSection.css'

class HomeSecondSection extends Component {
    state = {
        findOut: false
    }

    handleSlideToRegister = () =>{
        const slides: any = document.getElementById('slides')
        slides.slideTo(2)
        this.setState({findOut: false})
    }

    handleDismiss = () => {
        this.setState({findOut: false})
    }

    handleFindOut = () => {
        this.setState({findOut: true})
    }

    render() {
        return (
            <div style={{height: "100%"}}>
                <IonModal isOpen={this.state.findOut} onWillDismiss={() => this.handleDismiss()}>
                    <IonContent style={{backgroundColor: "rgb(246, 194, 47)"}} >
                        <IonItem lines="none" className="challengeBlurbItem" style={{overflowY: "scroll", paddingBottom: "5px", border:"double  "}}>
                            <IonText className="challengeBlurb">
                                iA Financial Group Vancouver fundraiser for Light the Night Vancouver for The Leukemia & Lymphoma Society of Canada (LLSC)
                                Like everything in 2020 things look a little different this year!
                                So, we have created a Scavenger Hunt Challenge to raise money and have some fun!
                                60 challenges, 15 days and endless fun!
                                Complete as many of the 60 challenges between October 1st – 15th 2020. You can make these challenges as wild, or low key as you like! Create a Team or participate as an individual, the scavenger hunt is open to all iA Employees, friends and family with a minimum $5 donation.
                                We will keep track of the completed challenges via a Leaderboard (link here). Each challenge is unique, and the leaderboard is your chance to show off your dedication and creativity!
                                Challenges have been designed to be friendly, fun and attainable by everyone!
                                So, will there be prizes?
                                Of course, the biggest prize is being awesome and supporting the fight against blood cancers through Light the Night. However, if that still isn’t enough there will be prizes handed out to some of you super achievers!
                                Let’s get this challenge started!
                                <IonText 
                                    style={
                                        {
                                            "display": "block",
                                            "color": "blue",
                                            "cursor":"pointer"
                                        }
                                    } 
                                    onClick={() => this.handleSlideToRegister()}>
                                    Register here!
                                </IonText>
                            </IonText>
                        </IonItem>
                        <IonButton onClick={() => this.handleDismiss()}>Close</IonButton>
                    </IonContent>
                    
                </IonModal>


                <IonGrid style={{height: "100%"}}>
                    <IonRow style={{height: "100%"}}>
                        <IonCol size-xs="12" size-lg="6">
                            {
                                window.innerWidth <= 415 ?
                                <IonImg style={{marginBottom: "-20vh"}} className="secondSlidefirstImg" src="/assets/secondSection1.jpg" />
                                :
                                <IonImg className="secondSlidefirstImg" src="/assets/secondSection1.jpg" />
                            }
                        </IonCol>
                        <IonCol style={{marginTop: "6%"}}>
                            <IonRow>
                                <IonCol>
                                    <IonItem lines="none" className="headerBlurb">
                                        <IonText className="challengeHeader">What's the Challenge?</IonText>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    {
                                        window.innerWidth <= 1367 ?
                                        <IonButton onClick={() => this.handleFindOut()}>Find out More!</IonButton> 
                                        :
                                        <IonItem lines="none" className="challengeBlurbItem">
                                            <IonText className="challengeBlurb">
                                                iA Financial Group Vancouver fundraiser for Light the Night Vancouver for The Leukemia & Lymphoma Society of Canada (LLSC)
                                                Like everything in 2020 things look a little different this year!
                                                So, we have created a Scavenger Hunt Challenge to raise money and have some fun!
                                                60 challenges, 15 days and endless fun!
                                                Complete as many of the 60 challenges between October 1st – 15th 2020. You can make these challenges as wild, or low key as you like! Create a Team or participate as an individual, the scavenger hunt is open to all iA Employees, friends and family with a minimum $5 donation.
                                                We will keep track of the completed challenges via a Leaderboard (link here). Each challenge is unique, and the leaderboard is your chance to show off your dedication and creativity!
                                                Challenges have been designed to be friendly, fun and attainable by everyone!
                                                So, will there be prizes?
                                                Of course, the biggest prize is being awesome and supporting the fight against blood cancers through Light the Night. However, if that still isn’t enough there will be prizes handed out to some of you super achievers!
                                                Let’s get this challenge started!
                                                <IonText 
                                                    style={
                                                        {
                                                            "display": "block",
                                                            "color": "blue",
                                                            "cursor":"pointer"
                                                        }
                                                    } 
                                                    onClick={() => this.handleSlideToRegister()}>
                                                    Register here!
                                                </IonText>
                                            </IonText>
                                        </IonItem>
                                    }
                                    
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        )
    }
}

export default HomeSecondSection
