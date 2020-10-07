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
  IonMenuButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCheckbox,
  IonSkeletonText
} from '@ionic/react';
import React, { Component } from 'react';
import { school, star, hammer, people } from 'ionicons/icons';
import './style/Dashboard.css';
import '../components/Slides'
import './style/Dashboard.css'
import * as LOGIN from "../api/login"
import * as API from "../api/common"
import Swal from 'sweetalert2';
import { login } from '../api/login';

interface ComponentProps{
  user: object;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dashboard: boolean;
}
class Dashboard extends Component<ComponentProps, {}> {
  state = {
    tasks: [],
    userTaskListFinished:[],
    userTaskListUnFinished:[],
    totalPoints: 0,
    totalBonus: 0,
    user: {},
    changeLock: false,
    value: 0,
    skeletonText: false
  }

  shouldComponentUpdate(nextProps: any, nextState: any) { 
    if (nextState.value !== 0) { 
      return false;
    }
    return true;
  }

  sortingTasks = (a:any, b: any) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  }

  handleReloadStatus = async() => {
    this.setState({changeLock: true})
    this.setState({skeletonText: true})
    var user = await LOGIN.login(this.props.email, this.props.password)
    this.setState({user: user.data.data.user})

    var tasks = await API.getTasks()
    var userTaskList = await API.getUserTasks((this.state.user as any).taskListId)
    var unfilteredFinishedTask: any = []
    var filteredFinishedTask: any = []
    var totalPoints: any = []
    var totalBonus = 0

    this.setState({tasks: tasks.data.data})

    if("unfinishedTasks" in userTaskList.data.data){
      if(userTaskList.data.data.unfinishedTasks.length !== 0){
        var unfin = userTaskList.data.data.unfinishedTasks
        if(unfin[0] instanceof Array){
          unfin = userTaskList.data.data.unfinishedTasks[0]
        }
        
        // sets the unfinished tasks for the user
        unfin = unfin.map((obj: any) => { return obj.taskId })
        unfilteredFinishedTask = this.state.tasks.filter((taskunFin: any) => unfin.includes(taskunFin.taskId))
        unfilteredFinishedTask = Array.from(new Set(unfilteredFinishedTask.map((a: any) => a.taskId)))
          .map(taskId => {
            return unfilteredFinishedTask.find((a: any) => a.taskId === taskId)
          })
        
      }
    }
    
    //sets the finished tasks for the user
    if("finishedTasks" in userTaskList.data.data){
      if(userTaskList.data.data.finishedTasks.length !== 0){
        var finishFilter = userTaskList.data.data.finishedTasks.map((fin: any) => { return fin.taskId })
        filteredFinishedTask = this.state.tasks.filter((taskFin: any) => finishFilter.includes(taskFin.taskId))
        totalPoints = filteredFinishedTask.map((obj:any) => {
          return obj.points
        })
        totalPoints = totalPoints.reduce((a: any, b: any) => {
          return a + b;
        }, 0)
        totalBonus = Math.floor(userTaskList.data.data.finishedTasks.length/5) * 5
      }
    }

    this.setState({value: 1})
    this.setState({userTaskListUnFinished: unfilteredFinishedTask})
    this.setState({userTaskListFinished: filteredFinishedTask})
    this.setState({totalPoints: totalPoints})
    this.setState({totalBonus: totalBonus})
    this.setState({changeLock: false})
    this.setState({skeletonText: false})
    this.setState({value: 0})
  }

  handleSave = async() => {
    this.setState({skeletonText: true})
    this.setState({changeLock: true})
    this.setState({value: 1})

    var finished = this.state.userTaskListFinished.map((obj: any) => {
      return {"taskId": obj.taskId}
    })

    var unfinished = this.state.userTaskListUnFinished.map((obj: any) => {
      return {"taskId": obj.taskId}
    })

    try{
        var res = await API.updateUserTasks((this.state.user as any).taskListId, finished, unfinished)
        if(res){
          var totalPoints = this.state.userTaskListFinished.map((obj:any) => {
            return obj.points
          })
          totalPoints = totalPoints.reduce((a: any, b: any) => {
            return a + b;
          }, 0)
          var totalBonus = Math.floor(this.state.userTaskListFinished.length/5) * 5
          this.setState({totalPoints: totalPoints})
          this.setState({totalBonus: totalBonus})
          this.setState({skeletonText: false})
          this.setState({changeLock: false})
          this.setState({value: 0})
        }
    }
    catch(e){
      Swal.fire("Something went wrong!", "Please try again later", "error")
        .then((ok: any) => {
          this.setState({skeletonText: false})
          this.setState({changeLock: false})
          this.setState({value: 0})
        })
    }
  }

  handleChangeList = async(status: any, taskId: any) =>{
    this.setState({value: 1})
    var finishedList: any = this.state.userTaskListFinished
    var unfinishedList: any = this.state.userTaskListUnFinished

    if(status){
      unfinishedList = unfinishedList.map((obj: any) => {
        if(obj.taskId === taskId){
          finishedList.push(obj)
        }
        else{
          return obj
        }
      })

      unfinishedList = unfinishedList.filter((el: any) => {
              return el != undefined;
      });
      finishedList = finishedList.filter((el: any) => {
        return el != undefined;
      });
      this.setState({userTaskListFinished: finishedList})
      this.setState({userTaskListUnFinished: unfinishedList})
    }
    else{
      finishedList = finishedList.map((obj: any) => {
        if(obj.taskId === taskId){
          unfinishedList.push(obj)
        }
        else{
          return obj
        }
      })
      unfinishedList = unfinishedList.filter((el: any) => {
        return el != undefined;
      });
      finishedList = finishedList.filter((el: any) => {
        return el != undefined;
      });
      this.setState({userTaskListFinished: finishedList})
      this.setState({userTaskListUnFinished: unfinishedList})
    }
  }

  async componentDidMount(){
    this.handleReloadStatus()
  }

  render() {
    return (
      <IonPage style={{backgroundColor: "rgb(0, 74, 173)", overflowY: "scroll"}}>
        <IonGrid style={{width: "100%"}}>
          <IonRow style={{paddingTop: "15vh", width: "100%"}}>
            <IonCol size-lg="6" size-xs="12">
              <IonCard>
                <IonCardContent 
                  style={
                    {
                      width:"100%",
                      height: "65vh",
                      backgroundColor: "rgb(0, 74, 173)",
                      color: "white"
                    }
                    }>
                  <IonText style={{display: "block", color: "white", fontSize: "4vh"}}>Hello,</IonText>
                  <IonText style={{display: "block", color: "white", fontSize: "7vh"}}>
                    {
                      (this.state.user as any).firstName
                    }
                    </IonText>
                  <IonText style={{display: "block", color: "white", fontSize: "2vh", marginTop: "5vh"}}>Total Points: {this.state.totalPoints}</IonText>
                  <IonText style={{display: "block", color: "white", fontSize: "2vh"}}>Bonus Points Earned: {this.state.totalBonus}</IonText>
                  <IonText style={{display: "block", color: "white", fontSize: "2vh"}}>Number of Challenges Completed: {this.state.userTaskListFinished.length}</IonText>
                  <IonButton style={{display: "block"}} onClick={() => this.handleSave()}>
                    Save My Challenge List
                  </IonButton>
                  <IonButton style={{display: "block"}} color="danger" onClick={() => window.location.reload()  }>
                    Logout
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size-lg="6" size-xs="12">
              <IonCard>
                <IonCardContent 
                  style={
                    {
                      width:"100%",
                      height: "65vh",
                      backgroundColor: "rgb(246, 194, 47)",
                      color: "white",
                      overflowY: "scroll"
                    }
                    }>
                      {
                        this.state.skeletonText &&
                        <IonList style={{backgroundColor: "rgb(246, 194, 47)"}}>
                          {
                            Array(60).fill("test").map((obj, i) => {
                              return <IonSkeletonText key={i} animated style={{ width: '60%', color: "rgb(0, 74, 173)" }} />
                            })
                          }
                        </IonList>
                      }
                      {
                        !this.state.skeletonText &&
                        (((this.state.userTaskListFinished.length === 0 && this.state.userTaskListUnFinished.length === 0))?
                        <IonList style={{backgroundColor: "rgb(246, 194, 47)"}}>
                          {
                            Array(60).fill("test").map((obj, i) => {
                              return <IonSkeletonText key={i} animated style={{ width: '60%', color: "rgb(0, 74, 173)" }} />
                            })
                          }
                        </IonList>
                        :
                        <IonList style={{backgroundColor: "rgb(246, 194, 47)"}}>
                          {
                            this.state.userTaskListFinished.length !== 0 &&
                            this.state.userTaskListFinished.map((obj: any, idx: number) => {
                              return (<IonItem color="rgb(246, 194, 47)" key={idx} lines="none">
                                        <IonCheckbox 
                                          style={{backgroundColor: "rgb(246, 194, 47)"}}
                                          disabled={this.state.changeLock}
                                          checked={true} 
                                          slot="start" 
                                          color="dark"
                                          onIonChange={e=>this.handleChangeList(e.detail.checked, obj.taskId)} 
                                          />

                                            {
                                              obj &&
                                            <strong><span style={{color: "rgb(0, 74, 173)"}}>[{obj.category}] {obj.challenge || ''} ({obj.points || ''} points)</span></strong>
                                            }
                                      </IonItem>)
                            })
                          }
                          {
                            this.state.userTaskListUnFinished.length !== 0 &&
                            this.state.userTaskListUnFinished.map((obj: any, idx: number) => {
                              return (<IonItem color="rgb(246, 194, 47)" key={idx} lines="none">
                                        <IonCheckbox 
                                          style={{backgroundColor: "rgb(246, 194, 47)"}}
                                          disabled={this.state.changeLock}
                                          checked={false} 
                                          slot="start" 
                                          color="dark"
                                          onIonChange={e=>this.handleChangeList(e.detail.checked, obj.taskId)}
                                          />
                                            {
                                              obj &&
                                              <strong><span style={{color: "rgb(0, 74, 173)"}}>[{obj.category}] {obj.challenge || ''} ({obj.points || ''} points)</span></strong>
                                            }
                                      </IonItem>)
                            })
                          }
                        </IonList>
                        )  
                    }
                </IonCardContent>
              </IonCard>
            </IonCol>          
          </IonRow>
        </IonGrid>
      </IonPage>
    )
  }
}


export default Dashboard;
