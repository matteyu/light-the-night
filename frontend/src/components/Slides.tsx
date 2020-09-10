import React, { Component } from 'react'
import { 
    IonSlides,
    IonSlide, 
    IonButton
  } from '@ionic/react';
import * as CommonAPI from '../api/common'

interface IProps{
    username?: string
    email?: string,
}

class Slides extends Component<IProps> {
  handleSlideNext = () =>{
    const slides: any = document.getElementById('slides')
    slides.slideNext()
  }

  handleSlidePrev = () =>{
    const slides: any = document.getElementById('slides')
    slides.slidePrev()
  }

  completeIntro = async() => {
      await CommonAPI.redirectData(
        'accounts', 
        window.sessionStorage.getItem('token') || '', 
        'put', 
        {
            'new_user': false,
            'username': this.props.username,
            'email': this.props.email
        },
        `${this.props.username}/`
      )

      var data: any = await CommonAPI.redirectData(
          'accounts', 
          window.sessionStorage.getItem('token') || '', 
          'get', 
          {},
          `${this.props.username}/`
          )
      window.sessionStorage.setItem('data', JSON.stringify(data.data))
      window.location.replace('/dashboard')
  }

  render() {
    return(
        <IonSlides 
          id="slides"
          pager={true} 
          options={{
            initialSlide: 0,
            speed: 400}}
          >
          <IonSlide>
            <h2>Welcome to the nth annual light the night!</h2>
            <IonButton onClick={() => this.handleSlideNext()} className="letsgo">Next</IonButton>
          </IonSlide>
          <IonSlide>
            <h1>First slide about light the night</h1>
            <img alt="first" src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/reference_guide/cats_and_excessive_meowing_ref_guide/1800x1200_cats_and_excessive_meowing_ref_guide.jpg" />
            <h2>Something about light the night!</h2>
            <IonButton onClick={() => this.handleSlideNext()} className="letsgo">Next</IonButton>
            <IonButton onClick={() => this.handleSlidePrev()} className="letsprev">Back</IonButton>
          </IonSlide>
          <IonSlide>
            <h1>Second slide about light the night</h1>
            <img alt="second" src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_weight_other/1800x1200_cat_weight_other.jpg?resize=600px:*" />
            <h2>Something about light the night!</h2>
            <IonButton onClick={() => this.handleSlideNext()} className="letsgo">Next</IonButton>
            <IonButton onClick={() => this.handleSlidePrev()} className="letsprev">Back</IonButton>
          </IonSlide>
          <IonSlide>
            <h1>Third slide about light the night!</h1>
            <img alt="third" src="https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg" />
            <h2>Something about light the night!</h2>
            <IonButton onClick={() => this.completeIntro()} className="letsgo">Let's Start</IonButton>
            <IonButton onClick={() => this.handleSlidePrev()} className="letsprev">Back</IonButton>
          </IonSlide>
        </IonSlides>
      )
  }
}

export default Slides;
