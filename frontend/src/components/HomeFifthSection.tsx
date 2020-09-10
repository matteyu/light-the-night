import React, { Component } from 'react'
import { IonImg, IonItem, IonText, IonButton, IonSlides, IonSlide, IonCard, IonCardContent } from '@ionic/react';
import { Table, Tag, Input, Button } from 'antd'
import 'antd/dist/antd.css';
import './style/HomeFifthSection.css'

class HomeFifthSection extends Component {
    state = {
        data: [
        {
          key: '1',
          indteam: 'Mike',
          points: 32
        },
        {
          key: '2',
          indteam: 'John',
          points: 42,
        },
        {
            key: '3',
            indteam: 'John',
            points: 42,
          },
          {
            key: '4',
            indteam: 'John',
            points: 42,
          },
          {
            key: '5',
            indteam: 'John',
            points: 42,
          },
          {
            key: '6',
            indteam: 'John',
            points: 42,
          },
          {
            key: '7',
            indteam: 'John',
            points: 42,
          },
          {
            key: '8',
            indteam: 'John',
            points: 42,
          },
          {
            key: '9',
            indteam: 'John',
            points: 42,
          },
          {
            key: '10',
            indteam: 'John',
            points: 42,
          },
      ],
      columns: []
    }
      
    componentDidMount(){
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
              title: 'Individual/Team',
              dataIndex: 'indteam',
              key: 'indteam',
            },
            {
              title: 'Points',
              dataIndex: 'points',
              key: 'points',
            }
          ];
        this.setState({columns: columns})
    }

    render() {
        return (
            <div>
                <Table 
                    className="leaderboard" 
                    dataSource={this.state.data} 
                    columns={this.state.columns}
                    pagination={{ hideOnSinglePage: true, pageSize: 10 }}
                    title={() => <span style={{fontSize: "30px"}}>Leaderboard</span>}
                 />
            </div>
        )
    }
}

export default HomeFifthSection
