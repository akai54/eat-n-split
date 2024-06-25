import "./index.css";
import { useState } from "react";

function App() {
  const friends = [
    { name: "Tyler", image: "https://i.pravatar.cc/400?img=68" },
    { name: "Ryan", image: "https://i.pravatar.cc/400?img=67" },
    { name: "Michael", image: "https://i.pravatar.cc/400?img=57" },
  ];

  return (
    <div className="App">
      <ListOfFriends friends={friends} />
      <AddFriend />
    </div>
  );
}

function ListOfFriends({ friends }) {
  return (
    <div className="List-friends">
      {friends.map((friend) => (
        <Friend key={friend.name} friend={friend} />
      ))}
    </div>
  );
}

function Friend({ friend }) {
  return (
    <div className="friends">
      <img src={friend.image} alt={friend.name} />
      <h1>{friend.name}</h1>
      <button className="button">Remove</button>
    </div>
  );
}

function AddFriend() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="form-add-friend">
      <button className="button" onClick={() => setShowForm(true)}>
        Add friend
      </button>
      {showForm && (
        <div>
          <div>
            <p>Friend name</p>
            <input type="text" className="name" />
            <p>Friend image</p>
            <input type="text" className="image" />
          </div>
          <button className="button">Add Friend</button>
          <button className="button" onClick={() => setShowForm(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

function Bill() {}

export default App;
