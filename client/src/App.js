import "./App.css";
import {useState,useEffect,useRef} from 'react'
import axios from 'axios'
import ReviewCard from "./ReviewCard";

function App() {
  const [movieName,setMovieName]=useState('');
  const [review,setReview]=useState('');
  const [movieReviews,setMovieReviews]=useState([]);
  const [newReview,setNewReview]=useState('')
  const inputValue=useRef(null);
  useEffect(()=>{
    axios.get('http://localhost:3001/api/getreview').then(res=>setMovieReviews(res.data));
  })
  const addReviews=()=>{ 
    if(movieName.length>0 && review.length>2)
    axios.post('http://localhost:3001/api/sendreview',{
      movie:movieName,
      review:review
    }).then(()=>console.log('review sent..!')).then(()=>{
      alert('review sent..! happy reviewing :)')
    }).then(()=>{
      setMovieName('');
      setReview('');
    });
  }

  const deleteReview=(movie)=>{
      axios.delete(`http://localhost:3001/api/deletereview/${movie}`)
  }
  const updatereview=(id)=>{
          axios.put('http://localhost:3001/api/updatereview',{
            id:id,
            review:newReview
          }).then(()=>setNewReview('')).then(()=>{
            alert('review has been updated sucessfully :)')
          }).then(()=>{
              inputValue.current.value = "";
          });
  }
  return (
    <div className="App">
      <h1>React Node Sql Movie Review App</h1>
      <div className="form">
        <label htmlFor="movie" className="movieLabel">movieName:</label>
        <input type="text" name="movieName" value={movieName} onChange={(e)=>setMovieName(e.target.value)}/>
        <label htmlFor="review" className="reviewLabel">review:</label>
        <input  type="text" name="review" value={review} onChange={(e)=>setReview(e.target.value)}/>
        <button onClick={addReviews}>Add review</button>
      </div>
         {movieReviews.map((movie)=>{
           return <ReviewCard 
           movie={movie}
           inputValue={inputValue}
           setNewReview={setNewReview}
           deleteReview={deleteReview}
           updatereview={updatereview}/>
         })}
    </div>
  );
}

export default App;
