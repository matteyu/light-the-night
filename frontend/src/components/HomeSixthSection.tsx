import React, { Component } from 'react'
import { IonText, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import './style/HomeSixthSection.css'
import API from 'axios'

class HomeSixthSection extends Component {
    state = {
        pics: []
    }
    getAllPics = () => {
        API.get("https://www.instagram.com/chestershire.cat/?__a=1").then((res: any) => {
            if(res.data.graphql !== undefined){
                var galleryPics = res.data.graphql.user.edge_owner_to_timeline_media.edges.map((obj: any) => {
                    return obj.node.display_url
                })
                this.setState({pics: galleryPics})
            } 
        })
    }

    componentDidMount(){
        this.getAllPics()
    }

    render() {
        return (
            <div>
                {
                    this.state.pics.length !== 0 ?
                    <IonGrid style={{width: "50%", marginTop: "5%"}}>
                        <IonRow>
                            <IonCol>
                                <IonImg src={this.state.pics[1]} />
                            </IonCol>
                            <IonCol>
                                <IonImg src={this.state.pics[2]} />
                            </IonCol>
                            <IonCol>
                                <IonImg src={this.state.pics[3]} />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonImg src={this.state.pics[4]} />
                            </IonCol>
                            <IonCol>
                                <IonImg src={this.state.pics[5]} />
                            </IonCol>
                            <IonCol>
                                <IonImg src={this.state.pics[6]} />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    :
                    <IonText>Please login to your instagram account to view the pictures</IonText>
                } 
            </div>
        )
    }
}

export default HomeSixthSection
