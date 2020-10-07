import React, { Component } from 'react'
import { IonImg, IonItem, IonText, IonButton, IonSlides, IonSlide, IonCard, IonCardContent, IonIcon, IonList, IonGrid, IonRow, IonCol } from '@ionic/react';
import './style/HomeFourthSection.css'
import * as api from '../api/common'
import {arrowBackCircle, arrowForwardCircle} from 'ionicons/icons'

class HomeFourthSection extends Component {
    state = {
        tasks: [],
        loaded: false
    }
    
    async componentDidMount(){
        var tasks = await api.getTasks()
        if(tasks.data.data.length !== 0){
            this.setState({tasks: tasks.data.data, loaded: true})
        }
    }

    handleUpChallenges = () => {
        const slides: any = document.getElementById('challengeSlides')
        slides.slidePrev()
    }

    handleDownChallenges = () => {
        const slides: any = document.getElementById('challengeSlides')
        slides.slideNext()
    }

    render() {
        return (
            <div>
                <IonGrid>
                    <IonRow>
                        <IonCol size-xs="12" size-lg="6">
                            <IonRow>
                                <IonCol>
                                    <IonItem lines="none" className="headerBlurbFourth">
                                        <IonText className="challengeHeaderFour">Challenges</IonText>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem lines="none" className="headerBlurbFourthList">
                                        <IonSlides options={{direction: "horizontal"}} id="challengeSlides" style={{backgroundColor: "rgb(0, 74, 173)", width:"100%", height: "55vh"}}>
                                            {
                                                this.state.loaded &&
                                                this.state.tasks.map((obj: any, idx: number) => { 
                                                    return <IonSlide key={idx} style={{backgroundColor: "rgb(0, 74, 173)", height: "55vh"}}>
                                                                <IonCard style={{height: "90%", width: "100%", backgroundColor: "rgb(0, 74, 173)"}}>
                                                                    <IonCardContent style={{backgroundColor: "rgb(0, 74, 173)"}}>
                                                                        <IonText style={{
                                                                            color: "rgb(246, 194, 47)",
                                                                            fontSize: "3vh",
                                                                            display: "block",
                                                                            marginBottom: "10px"
                                                                            }}>
                                                                                {obj.challenge}
                                                                        </IonText>
                                                                        <IonText style={{
                                                                            color: "rgb(246, 194, 47)",
                                                                            fontSize: "3vh",
                                                                            display: "block",
                                                                            marginBottom: "10px"
                                                                            }}>
                                                                                Points: {obj.points}
                                                                        </IonText>
                                                                        <IonText style={{
                                                                            color: "rgb(246, 194, 47)",
                                                                            fontSize: "3vh",
                                                                            display: "block",
                                                                            marginBottom: "10px"
                                                                            }}>
                                                                                Category: {obj.category}
                                                                        </IonText>
                                                                        <IonIcon 
                                                                            style={{fontSize:"4vh", marginRight: "10px", cursor:"pointer"}} 
                                                                            icon={arrowBackCircle} 
                                                                            onClick={() => this.handleUpChallenges()}
                                                                        />
                                                                        <IonIcon 
                                                                            style={{fontSize:"4vh", marginLeft: "10px", cursor:"pointer"}} 
                                                                            icon={arrowForwardCircle} 
                                                                            onClick={() => this.handleDownChallenges()}
                                                                        />
                                                                    </IonCardContent>
                                                                </IonCard>
                                                                
                                                            </IonSlide> 
                                                })
                                            }
                                        </IonSlides>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                        <IonCol size-xs="3" size-lg="2">
                            <IonImg className="fourthImgSecond" src="/assets/fourthSectionIcon.png" />
                        </IonCol>
                        {
                            window.innerWidth <= 500? 
                            <IonCol size-xs="6">
                            </IonCol>
                            :
                            ''
                        }
                        <IonCol size-xs="3" size-lg="4">
                            <IonImg className="fourthImg" src="/assets/fourthSection.jpg" />   
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        )
    }
}

export default HomeFourthSection
