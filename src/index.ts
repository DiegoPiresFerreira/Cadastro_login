import express from 'express';
import './models/User'
import routes from './routes';
import cors from 'cors'
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(routes)

app.listen(4000,()=>{
    console.log('Servidor rodadndo!')
})