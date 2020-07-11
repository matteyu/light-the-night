import React, { Component } from 'react'
import { 
    IonSlides,
    IonSlide, 
    IonButton
  } from '@ionic/react';
import * as CommonAPI from '../api/common'

interface IProps{
    username?: string
    email?: string
}

class Slides extends Component<IProps> {

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
        return (
            <IonSlides 
                pager={true} 
                options={{
                  initialSlide: 0,
                  speed: 400}}>
                <IonSlide>
                  <h2>Thanks for joining the Chipino Mogul Family!</h2>
                </IonSlide>
                <IonSlide>
                  <h1>Teach Business Owners!</h1>
                  <img alt="mentor" src="http://localhost:8000/static/images/mentor.png" />
                  <h2>Become a Mentor! Get paid to share knowledge with business owners!</h2>
                </IonSlide>
                <IonSlide>
                  <h1>Be a Business Owner!</h1>
                  <img alt="owner" src="http://localhost:8000/static/images/owner.png" />
                  <h2>Bring your ideas to life or build on top of your current business to make it even better!</h2>
                </IonSlide>
                <IonSlide>
                  <h1>Find Work in a Flash!</h1>
                  <img alt="contractor" src="http://localhost:8000/static/images/contractor.png" />
                  <h2>Become a Contractor and earn by helping the mentors and business owners bring companies to life!</h2>
                  <IonButton onClick={() => this.completeIntro()} className="letsgo">Let's Start</IonButton>
                </IonSlide>
            </IonSlides>
        )
    }
}

export default Slides;
