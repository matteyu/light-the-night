import React, { Component } from 'react'
import { IonImg, IonItem, IonText, IonButton, IonSlides, IonSlide, IonCard, IonCardContent, IonModal } from '@ionic/react';
import { Table, Tag, Input, Button } from 'antd'
import 'antd/dist/antd.css';
import './style/HomeFifthSection.css'
import * as api from '../api/common'

class HomeFifthSection extends Component {
    state = {
      data: [
        {
          key: '1',
          indteam: 'Mike',
          points: 32
        }
      ],
      columns: [],
      leaderModal: false
    }
    
    sortingUsers = (a:any, b: any) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    }

    async componentDidMount(){
      const columns = [
            {
                title: 'Rank',
                key: 'index',
                render: (text: any, record: any, index: any) => (
                  <span>
                    {index+1}
                  </span> 
                ),
            },
            {
              title: 'Challenger',
              dataIndex: 'indteam',
              key: 'indteam',
            },
            {
              title: 'Points',
              dataIndex: 'points',
              key: 'points',
            }
        ];
      var users = await api.getUsers()
      var leaderBoardUsers = users.data.data.map((obj: any) => {
        return {
          key: obj.taskListId,
          indteam: `${obj.firstName} ${obj.lastName}`,
          points: obj.totalPoints + (obj.totalBonus || 0),
          date: new Date(obj.updatedDate)
        }
      })
      leaderBoardUsers.sort((a: any, b: any) => {
        return this.sortingUsers(a.points ,b.points) || this.sortingUsers(-a.date, -b.date)
      })

      var finalLeaderboard = leaderBoardUsers.slice(0, 10).map((obj: any) => {
        return {
          key: obj.key,
          indteam: obj.indteam,
          points: obj.points
        }
      })

      this.setState({data: finalLeaderboard})
      this.setState({columns: columns})
    }

    handleOpenLeaderModal = () => {
      this.setState({leaderModal: true})
    }

    handleCloseLeaderModal = () => {
      this.setState({leaderModal: false})
    }

    render() {
        return (
            <div>
              {
                window.innerHeight <= 811 ?
                <div>
                  <IonModal isOpen={this.state.leaderModal} onWillDismiss={()=>this.setState({leaderModal: false})}>
                    <IonCard>
                      <IonCardContent>
                        <Table 
                          style={{width: "90%"}}
                          className="leaderboard" 
                          dataSource={this.state.data} 
                          columns={this.state.columns}
                          pagination={{ hideOnSinglePage: true, pageSize: 10 }}
                          scroll={{y: 350}}
                        />
                        <IonButton onClick={() => this.handleCloseLeaderModal()}>Close</IonButton>
                      </IonCardContent>
                    </IonCard>
                  </IonModal>
                  <IonText 
                    style={{
                      position: "relative", 
                      top: "20vh", 
                      isplay:"block", 
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: "7vh",
                      color: "white"
                      }}>
                        Leaderboard
                  </IonText>
                  <IonButton 
                  onClick={() => this.handleOpenLeaderModal()}
                  style={{position: "relative", top: "30vh", margin: "auto", display:"block"}}>Check out the competition!</IonButton>
                </div>
                :
                <Table 
                  style={{paddingTop: "7vh", width: "90%"}}
                  className="leaderboard" 
                  dataSource={this.state.data} 
                  columns={this.state.columns}
                  pagination={{ hideOnSinglePage: true, pageSize: 10 }}
                  title={() => <span style={{fontSize: "3vh"}}>Leaderboard</span>}
                 />
              }
            </div>
        )
    }
}

export default HomeFifthSection
