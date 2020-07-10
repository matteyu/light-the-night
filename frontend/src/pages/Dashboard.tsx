import { 
  IonCardContent, 
  IonPage, 
  IonCard, 
  IonButton,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonIcon, 
} from '@ionic/react';
import React, { Component } from 'react';
import { school, star, hammer, people } from 'ionicons/icons';
// import LoginForm from '../components/LoginForm';
import './style/Dashboard.css';


class Dashboard extends Component {
  state = {
    redirectData: '',
    viewMentors: false,
    viewOwners: false,
    viewContractors: false
  }

  componentDidMount(){
    var dataString = window.sessionStorage.getItem('data')
    this.setState({redirectData: dataString})
    window.sessionStorage.removeItem('data')
  }

  renderUsers = (viewData: string) => {
    var jsonObjs = JSON.parse(this.state.redirectData)
    var filteredJsonObjs = jsonObjs.filter((obj: any) => {
      if(viewData === "mentors"){
        return obj['is_mentor'] === true
      }
      else if(viewData === "owners"){
        return obj['is_startup_owner'] === true
      }
      else if(viewData === "contractors"){
        return obj['is_contractor'] === true
      }
      return obj
    })

    return filteredJsonObjs
  }

  viewMentors = () => {
    this.setState({viewOwners: false})
    this.setState({viewContractors: false})
    this.setState({viewMentors: true})
  }

  viewOwners = () => {
    this.setState({viewMentors: false})
    this.setState({viewContractors: false})
    this.setState({viewOwners: true})
  }

  viewContractors = () => {
    this.setState({viewMentors: false})
    this.setState({viewContractors: true})
    this.setState({viewOwners: false})
  }

  viewAll = () =>{
    this.setState({viewMentors: true})
    this.setState({viewOwners: true})
    this.setState({viewContractors: true})
  }

  render() {
    return (
      <IonPage>
        <IonCard>
          <IonCardContent>
            <IonList>
              {
                this.state.viewMentors &&
                this.renderUsers("mentors").map((val: any) =>
                  
                    <IonItemSliding key={val.id}>
                      <IonItem>
                        <IonLabel>{val.username}</IonLabel>
                      </IonItem>
                      <IonItemOptions side="end">
                        <IonItemOption onClick={() => {}}>Unread</IonItemOption>
                      </IonItemOptions>
                    </IonItemSliding>
                )
              }
              {
                this.state.viewOwners &&
                this.renderUsers("owners").map((val: any) =>
                  
                    <IonItemSliding key={val.id}>
                      <IonItem>
                        <IonLabel>{val.username}</IonLabel>
                      </IonItem>
                      <IonItemOptions side="end">
                        <IonItemOption onClick={() => {}}>Unread</IonItemOption>
                      </IonItemOptions>
                    </IonItemSliding>
                )
              }
              {
                this.state.viewContractors &&
                this.renderUsers("contractors").map((val: any) =>
                  
                    <IonItemSliding key={val.id}>
                      <IonItem>
                        <IonLabel>{val.username}</IonLabel>
                      </IonItem>
                      <IonItemOptions side="end">
                        <IonItemOption onClick={() => {}}>Unread</IonItemOption>
                      </IonItemOptions>
                    </IonItemSliding>
                )
              }
            </IonList>
            <IonButton color="dark" shape="round" expand='full' onClick={()=>this.viewMentors()}>
              <IonIcon slot="start" icon={school} />
              View Mentors
            </IonButton>
            <IonButton color="dark" shape="round" expand='full' onClick={()=>this.viewOwners()}>
              <IonIcon slot="start" icon={star} />
              View Owners
            </IonButton>
            <IonButton color="dark" shape="round" expand='full' onClick={()=>this.viewContractors()}>
              <IonIcon slot="start" icon={hammer} />
              View Contractors
            </IonButton>
            <IonButton color="dark" shape="round" expand='full' onClick={()=>this.viewAll()}>
              <IonIcon slot="start" icon={people} />
              View All
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonPage>
    )
  }
}


export default Dashboard;
