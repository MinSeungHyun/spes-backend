import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { config } from './config';
import { api } from './routes/api';

const port = 3000
const app = express()

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.set('jwt-secret', config.secret)

app.get('/', (_, res) => {
    res.send('spes')
})

app.use('/api', api)

app.listen(port, () => console.log(`Running on ${port}`))

mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
    console.log('Connected to mongodb')
})
