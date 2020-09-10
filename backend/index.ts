import express from 'express';
import rateLimit from 'express-rate-limit'
import path from 'path'
import * as auth from './helpers/authenticationHelper'

const app = express();
const PORT = process.env.PORT;

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message:
    "Too many requests from this IP.  Please wait a moment and try again later."
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(limiter)

app.post('/login', (req, res) => {
  var db = auth.dbConnect()
  db.connection.on('error', console.error.bind(console, 'connection error:'));
  db.connection.once('open', async() => {
    var userRes = await auth.userLogin(req.body.email, req.body.password)
    db.connection.close()
    res.json(userRes)
  });
});

app.post('/getusertasks', (req, res) => {
  var db = auth.dbConnect()
  db.connection.on('error', console.error.bind(console, 'connection error:'));
  db.connection.once('open', async() => {
    var userTaskList = await auth.getUserTasks(req.body.taskListId)
    db.connection.close()
    res.json(userTaskList)
  });
});

app.post('/updateusertasks', (req, res) => {
  var db = auth.dbConnect()
  db.connection.on('error', console.error.bind(console, 'connection error:'));
  db.connection.once('open', async() => {
    var userTaskList = await auth.updateUserTasks(req.body.taskListId, req.body.finishedTasks, req.body.unfinishedTasks)
    db.connection.close()
    res.json(userTaskList)
  });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on PORT: ${PORT}`);
});