import React, { Component } from 'react'
import { IonImg, IonItem, IonText, IonButton, IonSlides, IonSlide, IonCard, IonCardContent } from '@ionic/react';
import './style/HomeFourthSection.css'

class HomeFourthSection extends Component {
    render() {
        return (
            <div>
                <IonItem lines="none" className="headerBlurbFourth">
                    <IonText className="challengeHeaderFour">Challenges</IonText>
                </IonItem>
                <IonItem lines="none" className="headerBlurbFourthList">
                    <IonSlides 
                        id="challengeSlides"
                        pager={true}
                        options={{
                        autoplay: true,
                        initialSlide: 0,
                        direction: "horizontal",
                        speed: 500}}
                    >
                        <IonSlide>
                            <IonCard style={{backgroundColor: "rgb(0, 74, 173)"}}>
                                <IonCardContent>
                                    <IonText style={{
                                        color: "rgb(246, 194, 47)",
                                        fontSize: "30px",
                                        display: "block",
                                        marginBottom: "10px"
                                        }}>
                                            Challenge 1
                                    </IonText>
                                    <IonText style={{
                                        color: "rgb(246, 194, 47)",
                                        fontSize: "30px",
                                        display: "block",
                                        marginBottom: "10px"
                                        }}>
                                            Challenge 2
                                    </IonText>
                                    <IonText style={{
                                        color: "rgb(246, 194, 47)",
                                        fontSize: "30px",
                                        display: "block",
                                        marginBottom: "10px"
                                        }}>
                                            Challenge 3
                                    </IonText>
                                </IonCardContent>
                            </IonCard>
                        </IonSlide>
                        <IonSlide>
                            <IonCard style={{backgroundColor: "rgb(0, 74, 173)"}}>
                                <IonCardContent>
                                    <IonText style={{
                                        color: "rgb(246, 194, 47)",
                                        fontSize: "30px",
                                        display: "block",
                                        marginBottom: "10px"
                                        }}>
                                            Challenge 4
                                    </IonText>
                                    <IonText style={{
                                        color: "rgb(246, 194, 47)",
                                        fontSize: "30px",
                                        display: "block",
                                        marginBottom: "10px"
                                        }}>
                                            Challenge 5
                                    </IonText>
                                    <IonText style={{
                                        color: "rgb(246, 194, 47)",
                                        fontSize: "30px",
                                        display: "block",
                                        marginBottom: "10px"
                                        }}>
                                            Challenge 6
                                    </IonText>
                                </IonCardContent>
                            </IonCard>
                        </IonSlide>
                        <IonSlide>
                            <IonCard style={{backgroundColor: "rgb(0, 74, 173)"}}>
                                <IonCardContent>
                                    <IonText style={{
                                        color: "rgb(246, 194, 47)",
                                        fontSize: "30px",
                                        display: "block",
                                        marginBottom: "10px"
                                        }}>
                                            Challenge 7
                                    </IonText>
                                    <IonText style={{
                                        color: "rgb(246, 194, 47)",
                                        fontSize: "30px",
                                        display: "block",
                                        marginBottom: "10px"
                                        }}>
                                            Challenge 8
                                    </IonText>
                                    <IonText style={{
                                        color: "rgb(246, 194, 47)",
                                        fontSize: "30px",
                                        display: "block",
                                        marginBottom: "10px"
                                        }}>
                                            Challenge 9
                                    </IonText>
                                </IonCardContent>
                            </IonCard>
                        </IonSlide>
                        <IonSlide>
                            <IonCard style={{backgroundColor: "rgb(0, 74, 173)"}}>
                                <IonCardContent>
                                    <IonText style={{
                                        color: "rgb(246, 194, 47)",
                                        fontSize: "30px",
                                        display: "block",
                                        marginBottom: "10px"
                                        }}>
                                            Challenge 10
                                    </IonText>
                                    <IonText style={{
                                        color: "rgb(246, 194, 47)",
                                        fontSize: "30px",
                                        display: "block",
                                        marginBottom: "10px"
                                        }}>
                                            Challenge 11
                                    </IonText>
                                    <IonText style={{
                                        color: "rgb(246, 194, 47)",
                                        fontSize: "30px",
                                        display: "block",
                                        marginBottom: "10px"
                                        }}>
                                            Challenge 12
                                    </IonText>
                                </IonCardContent>
                            </IonCard>
                        </IonSlide>
                    </IonSlides>
                </IonItem>
                <IonImg className="fourthImg" src="/assets/fourthSection.jpg" />
                <IonImg className="fourthImgSecond" src="/assets/fourthSectionIcon.png" />
            </div>
        )
    }
}

export default HomeFourthSection
