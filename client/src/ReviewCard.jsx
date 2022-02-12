import './review.css'
const ReviewCard = ({movie,deleteReview,setNewReview,updatereview,inputValue}) => {
    return ( <div key={movie.id} className="reviewCard">
      <div className='movieName'>
      {movie.movie}
      </div>
      <div className='movieReview'>
        {movie.review}
        </div>
        <button className='deletebtn' onClick={()=>{deleteReview(movie.id)}}>delete Review </button>
        <input className='updateInput' type="text" ref={inputValue} onChange={(e)=>{
          setNewReview(e.target.value)
       }}/>
       <button className='updatebtn' onClick={()=>updatereview(movie.id)}>
         updatereview
       </button>
   </div> );
}
 
export default ReviewCard;