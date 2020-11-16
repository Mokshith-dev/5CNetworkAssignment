import axios from "axios";
import React from "react";
import { useEffect } from "react";
import "./App.css";
const RepoDetails = (props) => {
  // const [data, setData] = React.useState({});
  const [name, setName] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [username, setUsername] = React.useState('');
 const handleSearch = () => {
    props.history.push('/repos/' + username);
}
  useEffect(() => {
    async function getData() {
      const { username, reponame } = props.match.params;
      const { data } = await axios.get(
        `https://api.github.com/repos/${username}/${reponame}`
      );
      // console.log(data);
      // setData(data);
      setName(data.name);
      setAvatarUrl(data.owner.avatar_url);
      setDesc(data.description);
    }

    getData();
  }, []);

  return (
      <>
      <div className="head">Github Search</div>
            <input className = "search" name="username" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
            <button className ="repoBtn"onClick={handleSearch}>Search</button>
    <div className="outterBox">
      <div className="repoBox">
        <div>
          <img src={avatarUrl} className="image" alt="Repo Img" />
        </div>
        <div className="details">
          Application
          <div className="repoTitle">{name}</div>
          <div >
            <button className="repoBtn">Set up a plan</button>
          </div>
          <div className="repoDescription">{desc ? desc:"Description is not available in DB"}</div>
        </div>
      </div>
    </div>
    </>
  );
};

export default RepoDetails;
