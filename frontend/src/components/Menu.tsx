import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
  } from '@ionic/react';
  import React, { Component } from 'react'
  import { walk, person, grid } from 'ionicons/icons';
  import './style/Menu.css';
  
  interface IProps {
    userData?: {}
  }

  interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
  }
  
  const appPages: AppPage[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        iosIcon: grid,
        mdIcon: grid
    },
    {
        title: 'Profile',
        url: '/profile',
        iosIcon: person,
        mdIcon: person
    },
    {
        title: 'Logout',
        url: '/login',
        iosIcon: walk,
        mdIcon: walk
    }
  ];
  
  class Menu extends Component<IProps> {
  
    navigator = (url: string) =>{
        window.sessionStorage.setItem('data', JSON.stringify(this.props.userData||{}))
        window.location.replace(url)
    }

    render() {
      return (
        <IonMenu contentId="main" type="overlay">
          <IonContent>
            <IonList id="inbox-list" className="menulist">
              <IonListHeader>Chipino Mogul</IonListHeader>
              <IonNote>{(this.props.userData as any)['username']}</IonNote>
              {appPages.map((appPage, index) => {
                return (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem 
                        button
                        onClick={()=>this.navigator(appPage.url)}
                        className="clickable ion-activatable"
                        >
                      <IonIcon slot="start" icon={appPage.iosIcon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                );
              })}
            </IonList>
          </IonContent>
        </IonMenu>
      )
    }
  }
  
  export default Menu;
  