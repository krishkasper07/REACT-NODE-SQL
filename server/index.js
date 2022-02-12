const express =require('express');

const app=express();

const cors=require('cors')

app.use(cors());

app.use(express.json())

require('dotenv').config();

const mysql=require('mysql');

const db=mysql.createPool({
    user:'root',
    host:'localhost',
    password:process.env.PASSWORD,
    database:'moviereview',
})

app.post('/api/sendreview',(req,res)=>{
    const sqlInsert="INSERT INTO reviews (movie, review) VALUES (?,?)"
    const movie=req.body.movie;
    const review=req.body.review;
    db.query(sqlInsert,[movie,review],(err,result)=>{
        if(err){
            console.log('err:',err)
        }
        res.send("hello pedro");
    });
})

app.get('/api/getreview',(req,res)=>{
    const getReview="SELECT * FROM moviereview.reviews";
    db.query(getReview,(err,result)=>{
        if(err){
            console.log(err)
        }
      res.send(result);
    })
})

app.delete('/api/deletereview/:movieName',(req,res)=>{
    const deleteReview="DELETE FROM reviews WHERE id = ?";
    const movieName=req.params.movieName
    db.query(deleteReview,movieName,(err,result)=>{
       if(err){
           console.log(err)
       }
    })
})

app.put('/api/updatereview',(req,res)=>{
    const updateQuery=" UPDATE  reviews SET review=? WHERE id = ?";
    const id=req.body.id;
    const review=req.body.review;
    db.query(updateQuery,[review,id],(err,result)=>{
        if(err){
            console.log(err)
        }
        res.status(200);
        res.send('review updated');
    })
   
})
app.listen(3001,()=>{
    console.log("running server on port 3001");
});


