import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";
import { render } from "@testing-library/react";
import App from "./App";

class JokeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {jokes:[]}
    this.getJokes = this.getJokes.bind(this)
    this.getNewJokes = this.getNewJokes.bind(this)
    this.vote = this.vote.bind(this)
    this.numJokesToGet = 10
  }

  // setJokes () {
  //   this.setState({jokes: })
  // }
  async getJokes() {
    let j = [...this.state.jokes];
    let seenJokes = new Set(j);
    try {
      while (j.length < this.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { status, ...jokeObj } = res.data;

        if (!seenJokes.has(jokeObj.id)) {
          seenJokes.add(jokeObj.id);
          j.push({ ...jokeObj, votes: 0 });
        } else {
          console.error("duplicate found!");
        }
      }
      this.setState({jokes:j});
      console.log('New Jokes Set')
    } catch (e) {
      console.log(e);
    }
  }

 
  async componentDidMount() {
    if (!this.state.jokes.length){
      await this.getJokes()
    }
    
  };

  async componentDidUpdate() {
      if (!this.state.jokes.length){
      await this.getJokes()
      }
    
  };

  async getNewJokes () {
    console.log(this.state.jokes)
    this.setState({jokes:[]})
    // await this.getJokes()
  }

  vote (id, delta) {
    this.state.jokes.forEach(j => {if(j.id === id) j.votes = j.votes+delta })
    this.setState({jokes : this.state.jokes})
  }

  // if (this.state.jokes.length) {
  //   let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  
    render() {
      let jokes = this.state.jokes
      return (
        <div className="JokeList">
          <h2>Jokes Coming Soon</h2>
          <button onClick={this.getNewJokes} className="JokeList-getmore">
            Get New Jokes
          </button>
    
          {jokes.map(j => (
            <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
          ))}
        </div>
      );
      
    }
    
    
  }
  
  
// }
// function JokeList({ numJokesToGet = 10 }) {
//   const [jokes, setJokes] = useState([]);

  /* get jokes if there are no jokes */

  // useEffect(function() {
  //   async function getJokes() {
  //     let j = [...jokes];
  //     let seenJokes = new Set();
  //     try {
  //       while (j.length < numJokesToGet) {
  //         let res = await axios.get("https://icanhazdadjoke.com", {
  //           headers: { Accept: "application/json" }
  //         });
  //         let { status, ...jokeObj } = res.data;
  
  //         if (!seenJokes.has(jokeObj.id)) {
  //           seenJokes.add(jokeObj.id);
  //           j.push({ ...jokeObj, votes: 0 });
  //         } else {
  //           console.error("duplicate found!");
  //         }
  //       }
  //       setJokes(j);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

  //   if (jokes.length === 0) getJokes();
  // }, [jokes, numJokesToGet]);

  /* empty joke list and then call getJokes */

  // function generateNewJokes() {
  //   setJokes([]);
  // }

  /* change vote for this id by delta (+1 or -1) */

  // function vote(id, delta) {
  //   setJokes(allJokes =>
  //     allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
  //   );
  // }

  /* render: either loading spinner or list of sorted jokes. */

  // if (jokes.length) {
  //   let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  
  //   return (
  //     <div className="JokeList">
  //       <button className="JokeList-getmore" onClick={generateNewJokes}>
  //         Get New Jokes
  //       </button>
  
  //       {sortedJokes.map(j => (
  //         <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
  //       ))}
  //     </div>
  //   );
    
  // }
  // return null
  ;



export default JokeList;
