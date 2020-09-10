import { 
  IonCardContent, 
  IonPage, 
  IonCard, 
  IonButton,
  IonList,
  IonIcon,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOption,
  IonItemOptions,
  IonMenuButton
} from '@ionic/react';
import React, { Component } from 'react';
import { school, star, hammer, people } from 'ionicons/icons';
import './style/Dashboard.css';
import '../components/Slides'
import Slides from '../components/Slides';
import * as CommonAPI from '../api/common'
import Menu from '../components/Menu'

class Dashboard extends Component {
  state = {
    redirectData: {},
    viewMentors: false,
    viewOwners: false,
    viewContractors: false,
    searchData: []
  }

  componentDidMount(){
    var dataString = window.sessionStorage.getItem('data')
    if(dataString === ""){
      window.location.replace('/login')
    }
    window.sessionStorage.setItem('username', JSON.parse(dataString||'')['username'])
    this.setState({redirectData: JSON.parse(dataString||'')})
    window.sessionStorage.removeItem('data')
  }

  renderUsers = (viewData: string) => {
    var filteredJsonObjs = this.state.searchData.filter((obj: any) => {
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

  viewMentors = async() => {
    var data: any = await CommonAPI.redirectData(
        'accounts', 
        window.sessionStorage.getItem('token') || '', 
        'get',
        )
    this.setState({searchData: data.data})
    this.setState({viewOwners: false})
    this.setState({viewContractors: false})
    this.setState({viewMentors: true})
  }

  viewOwners = async() => {
    var data: any = await CommonAPI.redirectData(
      'accounts', 
      window.sessionStorage.getItem('token') || '', 
      'get',
      )
      this.setState({searchData: data.data})
    this.setState({viewMentors: false})
    this.setState({viewContractors: false})
    this.setState({viewOwners: true})
  }

  viewContractors = async() => {
    var data: any = await CommonAPI.redirectData(
      'accounts', 
      window.sessionStorage.getItem('token') || '', 
      'get',
      )
      this.setState({searchData: data.data})
    this.setState({viewMentors: false})
    this.setState({viewContractors: true})
    this.setState({viewOwners: false})
  }

  viewAll = async() =>{
    var data: any = await CommonAPI.redirectData(
      'accounts', 
      window.sessionStorage.getItem('token') || '', 
      'get',
      )
    this.setState({searchData: data.data})
    this.setState({viewMentors: true})
    this.setState({viewOwners: true})
    this.setState({viewContractors: true})
  }

  render() {
    return (
      <IonPage>
        <IonCard>
          <Menu userData={this.state.redirectData}/>
          <IonCardContent id="main-content">
            {
              (this.state.redirectData as any)['new_user']?
              <Slides 
                username={(this.state.redirectData as any)['username']} 
                email={(this.state.redirectData as any)['email']} 
                />:
              <div>
                <IonMenuButton />
                <IonList>
                  {
                    this.state.viewMentors &&
                    this.renderUsers("mentors").map((val: any) =>
                      
                        <IonItemSliding key={val.id}>
                          <IonItem>
                            <IonLabel>{val.username}</IonLabel>
                          </IonItem>
                          <IonItemOptions side="end">
                            <IonItemOption onClick={() => {}}>Connect</IonItemOption>
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
              </div>

            }
            
          </IonCardContent>
        </IonCard>
      </IonPage>
    )
  }
}


export default Dashboard;
