import React, { Component } from 'react';
import { IonSlides, IonSlide, IonButton, IonCardContent, IonCard, IonImg, IonIcon } from '@ionic/react';
import HomeFirstSection from '../components/HomeFirstSection'
import HomeSecondSection from '../components/HomeSecondSection'
import HomeThirdSection from '../components/HomeThirdSection'
import HomeFourthSection from '../components/HomeFourthSection'
import HomeFifthSection from '../components/HomeFifthSection'
import HomeSixthSection from '../components/HomeSixthSection'
import Dashboard from './Dashboard'
import * as login from '../api/login'
import Swal from 'sweetalert2'

import {arrowDownCircleOutline, arrowUpCircleOutline, arrowDownCircle, arrowUpCircle} from 'ionicons/icons'
import './style/Home.css'

var Filter = require('bad-words'),
filter = new Filter();

interface ComponentState{
    user: object;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dashboard: boolean;
}

class Home extends Component<{}, ComponentState> {
    constructor(props: any){
        super(props)
        this.state = {
            user: {},
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            dashboard: false
        }
    }

    handleSlideNext = () =>{
      const slides: any = document.getElementById('slides')
      slides.slideNext()
    }

    handleSlidePrev = () =>{
      const slides: any = document.getElementById('slides')
      slides.slidePrev()
    }

    /* LOGIN FUNCTIONS */
    handleEmailChange = (val: string) => {
        this.setState({email: val})
    }
    handlePasswordChange = (val: string) => {
        this.setState({password: val})
    }

    handleRegisterEmaillPass = async(formValues: any, passed: boolean) => {
        var msg: any = passed?`Thanks ${formValues[0]}!`:"Ensure you've filled both email and password"
        Swal.fire(msg)
            .then(async() => {
                const { value: formValues2 } = await Swal.fire({
                    title: 'Now register an email and a password for your account',
                    html:
                      "<span><strong>If you've made a light the night donation, it has to be the same email from there to receive extra points!</strong></span>" +
                      '<input type="email" placeholder="Email" id="swal-input3" class="swal2-input">' +
                      '<input placeholder="Password" id="swal-input4" type="password" class="swal2-input">',
                    focusConfirm: false,
                    showCancelButton: true,
                    preConfirm: () => {
                        var email: any = document.getElementById('swal-input3')
                        var pass: any = document.getElementById('swal-input4')
                        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        if (reg.test(email.value) == false) 
                        {
                            Swal.fire("Invalid Email Address")
                            .then(() => {
                                this.handleRegisterEmaillPass(formValues, false)
                            })
                        }
                        if(email.value === ""){
                            Swal.fire("Missing Email Address")
                            .then(() => {
                                this.handleRegisterEmaillPass(formValues, false)
                            })
                        }
                        else if(pass.value === ""){
                            Swal.fire("Missing Password")
                            .then(() => {
                                this.handleRegisterEmaillPass(formValues, false)
                            })
                        }
                        else{
                            this.setState({email: email.value})
                            this.setState({password: pass.value})
                            return [
                                email.value,
                                pass.value
                            ]
                        }
                    }
                  })
                if(formValues2){
                    var user: any = await login.login(this.state.email, this.state.password, this.state.firstName, this.state.lastName)
                    if("error" in user.data.data){
                        Swal.fire(`Somethine went wrong!`, `${user.data.data.error}`, "error")
                        .then(() => {
                            window.location.reload()
                        })
                    }
                    else{
                        this.setState({user: user.data.data.user})
                        Swal.fire(`Thanks for registering!`, "Click OK to enter the dashboard", "success")
                            .then(async(ok: any) => {
                                if(ok){
                                    this.setState({dashboard: true})
                                }
                            })
                    }
                    
                }
            })
    }

    handleDisclaimer = async() => {
        try{
            const { value: formValues } = await Swal.fire({
              title: 'Terms and Conditions',
              icon: 'warning',
              html:
                `<div style="text-align: left;">
                    <strong>Participant Acknowledgement of Risk and Consent:</strong><br/><br/>
                    The undersigned, having reviewed the material provided by iA Financial Group (IA) on the activity, hereby:<br/>
                    a) Consent to participating in the activity.<br/>
                    b) Recognize and understand the inherent risks associated with the activity including but not limited to bodily injuries and other circumstances beyond the control of IA, related parties and agents.<br/>
                    c) Understand the specific risks associated with the activity named above, including but not limited to various physical injuries.<br/>
                    d) Consequences of these risks may result in physical or emotional injury, paralysis, death or damage to property or third parties.<br/>
                    <strong>e) I have read and understood the requirements for this activity and I will ensure that I am adequately prepared based on the instructions provided by the IA fundraising team.</strong><br/>
                </div>`+
                '<br/>'+
                '<label for="swal-input1">Check the checkbox to continue</label>'+
                '<input type="checkbox" id="swal-input1" class="swal2-input">',
              focusConfirm: false,
              preConfirm: () => {
                return (document as any).getElementById('swal-input1').checked
              }
            })
            if (formValues) {
              this.handleRegister()
            }
        }
        catch(e){
            Swal.fire("Something went wrong!", "Please try again later", "error")
        }
    }

    handleRegister = async() => {
        try{
            const { value: formValues } = await Swal.fire({
                title: 'Lets start with your \nFirst and Last name',
                html:
                  "<span><strong>If you've made a light the night donation, it has to be the same name from there to receive extra points!</strong></span>" +
                  '<input placeholder="First Name" id="swal-input1" class="swal2-input">' +
                  '<input placeholder="Last Name" id="swal-input2" class="swal2-input">',
                focusConfirm: false,
                showCancelButton: true,
                preConfirm: () => {
                    var firstName: any = document.getElementById('swal-input1')
                    var lastName: any = document.getElementById('swal-input2')
                    if(filter.isProfane(firstName.value) || filter.isProfane(lastName.value)){
                        Swal.fire("The name you have specified has profanity")
                        .then(() => {
                            this.handleRegister()
                        })
                    }
                    if(firstName.value === ""){
                        Swal.fire("Missing first name")
                        .then(() => {
                            this.handleRegister()
                        })
                    }
                    else if(lastName.value === ""){
                        Swal.fire("Missing last name")
                        .then(() => {
                            this.handleRegister()
                        })
                    }
                    else{
                        this.setState({firstName: firstName.value})
                        this.setState({lastName: lastName.value})
                        return [
                            firstName.value,
                            lastName.value
                        ]
                    }
                },
                icon: 'question'
              })
              
              if (formValues) {
                this.handleRegisterEmaillPass(formValues, true)
              }
        }
        catch(e){
            Swal.fire("Something went wrong!", "Please try again later", "error")
        }
    }

    handleLogin = async() => {
        try{
            var user: any = await login.login(this.state.email, this.state.password)
            if("success" in user.data.data){
                Swal.fire("Success!", user.data.data.success, "success")
                .then((ok: any) => {
                    if(ok){
                        this.setState({user: user.data.data.user})
                        this.setState({dashboard: true})
                    }
                })
            }
            else if("error" in user.data.data){
                Swal.fire("Something went wrong!", user.data.data.error, "error")
            }
        }
        catch(e){
            Swal.fire("Something went wrong!", "Please try again later", "error")
        }
    }


    render() {
        if(this.state.dashboard){
            return <Dashboard {...this.state} />
        }
        else{
            return (
                <IonSlides 
                    id="slides"
                    pager={true} 
                    options={{
                    initialSlide: 0,
                    direction: "vertical",
                    speed: 400}}
                >
                    <IonSlide style={{backgroundColor: "white"}}>
                        <IonCard style={{backgroundColor: "white"}}>
                            <IonCardContent style={{backgroundColor: "white"}}>
                                <HomeFirstSection 
                                />
                                {/* <IonButton onClick={()=>this.handleSlideNext()} fill="clear" className="transitionButton"></IonButton> */}
                                {
                                    window.innerWidth>1367?
                                    <IonIcon icon={arrowDownCircleOutline} onClick={()=>this.handleSlideNext()} className="transitionButton" />
                                    :
                                    ''
                                }
                            </IonCardContent>
                        </IonCard>
                    </IonSlide>
                    <IonSlide className="secondSlideBackground">
                        <HomeSecondSection/>
                        {
                            window.innerWidth>1367?
                            <div>
                                <IonIcon icon={arrowUpCircleOutline} onClick={()=>this.handleSlidePrev()} className="reversetransitionButton" />
                                <IonIcon icon={arrowDownCircleOutline} onClick={()=>this.handleSlideNext()} className="transitionButton" />
                            </div>
                            :
                            ''
                        }
                        
                    </IonSlide>
                    {/* <IonSlide className="thirdSlideBackground">
                        <HomeThirdSection
                            {...this.state}
                            handleEmailChange={this.handleEmailChange}
                            handlePasswordChange={this.handlePasswordChange}
                            handleLogin={this.handleLogin}
                            handleDisclaimer={this.handleDisclaimer}
                        />
                        {
                            window.innerWidth>1367?
                            <div>
                                <IonIcon style={{color: "#737373"}} icon={arrowUpCircleOutline} onClick={()=>this.handleSlidePrev()} className="reversetransitionButton" />
                                <IonIcon style={{color: "#737373"}}  icon={arrowDownCircleOutline} onClick={()=>this.handleSlideNext()} className="transitionButton" />
                            </div>
                            :
                            ''
                        }
                    </IonSlide> */}
                    <IonSlide className="fourthSlideBackground">
                        <HomeFourthSection/>
                        {
                            window.innerWidth>1367?
                            <div>
                                <IonIcon icon={arrowUpCircleOutline} onClick={()=>this.handleSlidePrev()} className="reversetransitionButton" />
                                <IonIcon icon={arrowDownCircleOutline} onClick={()=>this.handleSlideNext()} className="transitionButton" />
                            </div>
                            :
                            ''
                        }
                    </IonSlide>
                    <IonSlide className="fifthSlideBackground">
                        <HomeFifthSection/>
                        {
                            window.innerWidth>1367?
                            <div>
                                <IonIcon style={{color: "#737373"}} icon={arrowUpCircleOutline} onClick={()=>this.handleSlidePrev()} className="reversetransitionButton" />
                                <IonIcon style={{color: "#737373"}} icon={arrowDownCircleOutline} onClick={()=>this.handleSlideNext()} className="transitionButton" />
                            </div>
                            :
                            ''
                        }
                    </IonSlide>
                    <IonSlide className="sixthSlideBackground">
                        <HomeSixthSection/>
                        {
                            window.innerWidth>1367?
                            <div>
                                <IonIcon style={{color: "#737373"}} icon={arrowUpCircleOutline} onClick={()=>this.handleSlidePrev()} className="reversetransitionButton" />
                            </div>
                            :
                            ''
                        }
                    </IonSlide>
                </IonSlides>
            )
        }        
    }
}

export default Home;