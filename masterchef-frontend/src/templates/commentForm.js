function CommentForm ({ onSubmit, commentText, onChangeComment }) {

    return (
        <form onSubmit={onSubmit} className="comment-form d-flex justify-content-evenly">
            <input
                className="comment-textbox"
                type='text'
                placeholder="Comment Here"
                name='comment-text'
                value={commentText}
                onChange={(e) => onChangeComment(e.target.value)}
                required/>

            <button
                className="comment-button fw-bold"
                type='submit'>
                POST
            </button>
        </form>
    );
}

export default CommentForm;