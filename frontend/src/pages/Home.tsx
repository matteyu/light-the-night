import React, { Component } from 'react';
import { IonSlides, IonSlide, IonButton, IonCardContent, IonCard, IonImg } from '@ionic/react';
import HomeFirstSection from '../components/HomeFirstSection'
import HomeSecondSection from '../components/HomeSecondSection'
import HomeThirdSection from '../components/HomeThirdSection'
import HomeFourthSection from '../components/HomeFourthSection'
import HomeFifthSection from '../components/HomeFifthSection'
import HomeSixthSection from '../components/HomeSixthSection'
import './style/Home.css'


class Home extends Component {
    handleSlideNext = () =>{
      const slides: any = document.getElementById('slides')
      slides.slideNext()
    }
    
    handleSlidePrev = () =>{
      const slides: any = document.getElementById('slides')
      slides.slidePrevious()
    }
    render() {
        return (
            <IonSlides 
                id="slides"
                pager={true} 
                options={{
                initialSlide: 0,
                direction: "vertical",
                speed: 400}}
            >
                <IonSlide>
                    <IonCard>
                        <IonCardContent>
                            <HomeFirstSection></HomeFirstSection>
                            <IonButton onClick={()=>this.handleSlideNext()} fill="clear" className="transitionButton"></IonButton>
                        </IonCardContent>
                    </IonCard>
                </IonSlide>
                <IonSlide className="secondSlideBackground">
                    <HomeSecondSection/>
                    <IonButton onClick={()=>this.handleSlideNext()} fill="clear" className="transitionButton"></IonButton>
                </IonSlide>
                <IonSlide className="thirdSlideBackground">
                    <HomeThirdSection/>
                    <IonButton onClick={()=>this.handleSlideNext()} fill="clear" className="transitionButton2"></IonButton>
                </IonSlide>
                <IonSlide className="fourthSlideBackground">
                    <HomeFourthSection/>
                    <IonButton onClick={()=>this.handleSlideNext()} fill="clear" className="transitionButton"></IonButton>
                </IonSlide>
                <IonSlide className="fifthSlideBackground">
                    <HomeFifthSection/>
                    <IonButton onClick={()=>this.handleSlideNext()} fill="clear" className="transitionButton"></IonButton>
                </IonSlide>
                <IonSlide className="sixthSlideBackground">
                    <HomeSixthSection/>
                </IonSlide>
            </IonSlides>

        );
    }
}

export default Home;