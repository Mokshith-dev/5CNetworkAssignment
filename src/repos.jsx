import axios from "axios";
import React, { Component } from "react";
import "./App.css";

class Repos extends Component {
  constructor() {
    super();
    this.state = {
      repos: [],
      userName: ""
    };
  }
  
  handleSearch = () => {
    this.props.history.push('/repos/' + this.state.userName);
}
  handleClick = (name) => {
    this.props.history.push(
      `/repos/${this.props.match.params.username}/${name}`
    );
    
  };
  handleClickFollowers = () => {
      this.props.history.push(`/followers/${this.props.match.params.username}`);
  }
  async componentDidMount() {
    const { data } = await axios.get(
      `https://api.github.com/users/${this.props.match.params.username}/repos`
    );
    this.setState({ repos: data });
    
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.username === this.props.match.params.username) {
      return;
    }
    const { data } = await axios.get(
      `https://api.github.com/users/${this.props.match.params.username}/repos`
    );
    this.setState({ repos: data });
    
  }

  render() {
      console.log(this.state.repos);
    return (
      <>
      <div className="head">Github Search</div>
            <input className = "search" name="username" id="username" value={this.state.username} onChange={(event) => this.setState({userName:event.target.value})} />
            <button className ="repoBtn"onClick={this.handleSearch}>Search</button>
      <div className="userDetails">
    <div className ="userName">Username: {this.props.match.params.username}</div>
     <div className="followers" onClick={this.handleClickFollowers}>Followers</div>       
            
        </div>
        <div className="outterBox">
          {this.state.repos.map((repo) => (
            <div onClick={() => this.handleClick(repo.name)} className="box">
              <div className="box-left">
                <img
                  src={repo.owner.avatar_url}
                  height={50}
                  width={50}
                  className={"my-custom-image"}
                  alt={"Repo image"}
                />
              </div>
              <div box-right>
                <div class="repoName">{repo.name}</div>
                <div className="repoDesc">{repo.description ? repo.description: "Description is not available in DB"}</div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Repos;
