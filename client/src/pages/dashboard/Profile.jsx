import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  const [friends, setFriends] = useState([]);
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await axios.get(`http://localhost:5001/api/users?username=${username}`);
        setUser(userRes.data);

        const friendsRes = await axios.get(`http://localhost:5001/api/users/friends/${userRes.data._id}`);
        setFriends(friendsRes.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
    console.log(user)
  }, [username]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/users/allusers");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleFollow = async (userId) => {
    try {
      const currentUserId = user.data._id; 

      await axios.put(`http://localhost:5001/api/users/${userId}/follow`, {
        userId: currentUserId,
      });

      const res = await axios.get("http://localhost:5001/api/users/allusers");
      setUsers(res.data);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };


  return (
    <>
 <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Hi {user.username} below is your Profile</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p className="card-text">Username: {user.username}</p>
              <p className="card-text">Email: {user.email}</p>
            </div>
            <div className="col-md-6">
            </div>
          </div>
        </div>
        <div className="card-footer">
          <h5>Friends List</h5>
          <ul className="list-group">
            {friends.map((friend) => (
              <li key={friend._id} className="list-group-item">
                {friend.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    <div>
    <div className="container mt-5">
      <div className="center-heading">
        <h2>Other Users Profile</h2>
      </div>
      <div className="card-columns">
        {users.map((user) => (
          <div key={user._id} className="card">
            <div className="card-header">
              <h4 className="card-title">{user.username}'s Profile</h4>
            </div>
            <div className="card-body">
              <h5 className="card-title">{user.username}</h5>
              <p className="card-text">Email: {user.email}</p>
              <p className="card-text">Followers: {user.followers.length}</p>
              <p className="card-text">Following: {user.followings.length}</p>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-primary"
                onClick={() => handleFollow(user._id)}
              >
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>    </div>
    </>
  );
}
