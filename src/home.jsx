import React from 'react';
import './index.css';
const Home = (props) => {

    const handleSearch = () => {
        props.history.push('/repos/' + username);
    }

    const [username, setUsername] = React.useState('');
    return (
        <>
            <div className="head">Github Search</div>
            <input className = "search" name="username" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
            <button className ="repoBtn"onClick={handleSearch}>Search</button>
        </>
    );
}
 
export default Home;