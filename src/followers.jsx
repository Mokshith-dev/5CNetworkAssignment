import axios from "axios";
import React, { Component } from "react";
import "./App.css";

class Followers extends Component {
  constructor() {
    super();
    this.state = {
      followers: [],
      userName: ""
    };
  }
  handleSearch = () => {
    this.props.history.push('/repos/' + this.state.userName);
}
  handleClick = (username) => {
    this.props.history.push(`/repos/${username}`);
  }
  async componentDidMount() {
    const { data } = await axios.get(
      `https://api.github.com/users/${this.props.match.params.username}/followers`
    );
    this.setState({ followers: data });
    
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.username === this.props.match.params.username) {
      return;
    }
    const { data } = await axios.get(
      `https://api.github.com/users/${this.props.match.params.username}/followers`
    );
    this.setState({ followers: data });
    
  }
  render() {
      return (
          <>
          <div className="head">Github Search</div>
            <input className = "search" name="username" id="username" value={this.state.username} onChange={(event) => this.setState({userName:event.target.value})} />
            <button className ="repoBtn"onClick={this.handleSearch}>Search</button>
          <div className="headFollowers">Followers</div>
        <div className="outterBox">
          {this.state.followers.map((follwer) => (
            <div onClick={() => this.handleClick(follwer.login)} className="box">
              <div className="box-left">
                <img
                  src={follwer.avatar_url}
                  height={50}
                  width={50}
                  className={"my-custom-image"}
                  alt={"avatar"}
                />
              </div>
              <div box-right>
                <div class="repoName">{follwer.id}</div>
                <div className="repoDesc">{follwer.login}</div>
              </div>
            </div>
          ))}
          </div>
          </>
      );
  }

}

export default Followers;