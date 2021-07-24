import React, { Component } from 'react'
import { IonText, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import './style/HomeSixthSection.css'
import API from 'axios'

class HomeSixthSection extends Component {
    state = {
        pics: []
    }
    getAllPics = () => {
        API.post("https://www.instagram.com/ialtnchallenge/channel/?__a=1", {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
            }
          })
        .then((res: any) => {
            if(res.data.graphql !== undefined){
                var galleryPics = res.data.graphql.user.edge_owner_to_timeline_media.edges.map((obj: any) => {
                    return obj.node.display_url
                })
                this.setState({pics: galleryPics})
            } 
        })
        .catch((err) => console.log(err))
    }

    componentDidMount(){
        this.getAllPics()
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <IonGrid>
                    <IonRow style={{marginTop: "9%"}}>
                        <IonCol>
                            <IonText style={{marginTop: "4%", color: "white", fontSize: "3em"}}>
                                Instagram
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            {
                                this.state.pics.length !== 0 ?
                                <IonGrid style={{width: "50%"}}>
                                    <IonRow>
                                        <IonCol>
                                            <IonImg style={{cursor: "pointer"}} onClick={() => window.open("https://www.instagram.com/ialtnchallenge")} src={this.state.pics[0]} />
                                        </IonCol>
                                        <IonCol>
                                            <IonImg style={{cursor: "pointer"}} onClick={() => window.open("https://www.instagram.com/ialtnchallenge")} src={this.state.pics[1]} />
                                        </IonCol>
                                        <IonCol>
                                            <IonImg style={{cursor: "pointer"}} onClick={() => window.open("https://www.instagram.com/ialtnchallenge")} src={this.state.pics[2]} />
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol>
                                            <IonImg style={{cursor: "pointer"}} onClick={() => window.open("https://www.instagram.com/ialtnchallenge")} src={this.state.pics[3]} />
                                        </IonCol>
                                        <IonCol>
                                            <IonImg style={{cursor: "pointer"}} onClick={() => window.open("https://www.instagram.com/ialtnchallenge")} src={this.state.pics[4]} />
                                        </IonCol>
                                        <IonCol>
                                            <IonImg style={{cursor: "pointer"}} onClick={() => window.open("https://www.instagram.com/ialtnchallenge")} src={this.state.pics[5]} />
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                                :
                                <IonText>Please login to your instagram account to view the pictures</IonText>
                            } 
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonText style={{marginTop: "4%", color: "white", fontSize: "20px"}}>
                            Follow and tag us <a target="_blank" href="https://www.instagram.com/ialtnchallenge">@ialtnchallenge</a> <a target="_blank" href="https://www.instagram.com/ialtnchallenge">#ialtnchallenge</a>
                            </IonText>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        )
    }
}

export default HomeSixthSection
