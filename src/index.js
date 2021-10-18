const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const {startDatabase} = require('./database/mongo');
const {insertAd, getAds, deleteAd, updateAd} = require('./database/ads');
const {register} = require('./database/users');

const {index : userIndex} = require('./routes/user');

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// app.get('/', async(req, res)=>{
//     res.send(await getAds());
// });

// app.post('/', async(req, res)=>{
//     const newAd = req.body;
//     await insertAd(newAd);
//     res.send({message:'New ad inserted'});
// });

// app.post('/delete', async (req, res) =>{
//     deleteAd(req.body.id);
//     res.send({message:'Ad removed'});
// });

// app.post('/update', async (req, res)=>{
//     const {id, ...otherAttr} = req.body;
//     // const updatedAd = req.body;
//     // const updatedId = req.body;
//     await updateAd(id, otherAttr);
//     res.send({message:'Ad updated'});
// });

app.post('/register', (req, res)=>{
    const newUser = req.body;
    userIndex(req.url,newUser,"");
    res.send({
        responseCode:200,
        responseMessage:"registered"
    });
});

app.post('/login', (req, res)=>{
    const creds = req.body;
    userIndex(req.url,creds,"").then((response)=>{
        console.log({
            responseCode:200,
            responseMessage:"logged in",
            result:response
        });
        res.send({
            responseCode:200,
            responseMessage:"logged in",
            result:response
        });
    });
});

startDatabase().then(async ()=>{
    app.listen(3001, () =>{
        console.log('listening on port 3001');
    });
});

