function Review({review}){
    return <>
    <h4>{review.title}</h4>
    <p>Skrivet den: {review.createdAt}</p>
    <p>{review.body}</p>
    </>
}
export default Review;