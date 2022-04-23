import React from "react";
import "./Joke.css";

// function Joke({ vote, votes, text, id }) {
//   const upVote = () => vote(id, +1);
//   const downVote = () => vote(id, -1);
class Joke extends React.Component {
  constructor(props){
    super(props)
    // console.log(this.props)
  }
  
  render () {
    const {text, votes, vote, id} = this.props
    return (
      <div className="Joke">
        <div className="Joke-votearea">
          <button onClick={() => vote(id, +1)}>
            <i className="fas fa-thumbs-up" />
          </button>
  
          <button onClick={() => vote(id, -1)}>
            <i className="fas fa-thumbs-down" />
          </button>
  
          {votes}
        </div>
  
        <div className="Joke-text">{text}</div>
        {/* {this.props.text} */}
      </div>
    );
  }
 
}

export default Joke;
