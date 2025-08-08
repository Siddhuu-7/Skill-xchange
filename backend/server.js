const express=require('express');
const userRoutes=require('./routes/user.routes')
const userResquest=require('./routes/request.route')
const cors=require('cors')
require('dotenv').config()
const app=express();
const searchEngine=require('./routes/search.route')
const SeekAndSeking=require('./routes/SeekAndSeekers.route')
const Goals=require('./routes/Goals.route')
const createpost=require('./routes/createpost.route')
const Server=require('./Socket/socket.io')
const Message=require("./routes/message.route")
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));const PORT=process.env.PORT
app.use(cors({
    origin:"*"
}))
const server=new Server(app,PORT)
app.use('/user',userRoutes)
app.use('',userResquest)
app.use('/',Goals)
app.use('',searchEngine)
app.use('',SeekAndSeking)
app.use('',createpost)
app.use('',Message)
// app.listen(PORT,()=>{
//     console.log(`http://localhost:${PORT}`);
// })
server.startSocket()
server.startServer()