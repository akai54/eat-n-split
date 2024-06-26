import { useState } from "react";

function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend() {
    setShowAddForm(!showAddForm);
    setSelectedFriend(null);
  }

  function handleSelection(friend) {
    //setSelectedFriend(friend);
    setSelectedFriend((frnd) => (frnd?.id === friend.id ? null : friend));
    setShowAddForm(false);
  }

  const [friends, setFriends] = useState([
    {
      id: 159,
      name: "Tyler",
      image: "https://i.pravatar.cc/48?img=68",
      balance: -7,
    },
    {
      id: 753,
      name: "Ryan",
      image: "https://i.pravatar.cc/48?img=67",
      balance: 20,
    },
    {
      id: 2486,
      name: "Michael",
      image: "https://i.pravatar.cc/48?img=57",
      balance: 0,
    },
  ]);

  return (
    <div className="App">
      <div className="sidebar">
        <ListOfFriends
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddForm && (
          <AddFriend
            handleAddFriend={handleAddFriend}
            friends={friends}
            setFriends={setFriends}
          />
        )}

        <Button onClick={handleAddFriend}>
          {showAddForm ? "close" : "Add Friend"}
        </Button>
      </div>

      {selectedFriend && (
        <Bill
          selectedFriend={selectedFriend}
          setFriends={setFriends}
          onHandleForm={setShowAddForm}
          setSelectedFriend={setSelectedFriend}
        />
      )}
    </div>
  );
}

function ListOfFriends({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}€
        </p>
      )}

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function AddFriend({ handleAddFriend, friends, setFriends }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      id: id,
      name: name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    setFriends([...friends, newFriend]);

    setName("");
    setImage("https://i.pravatar.cc/48");

    handleAddFriend();
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼️ Friend image</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add friend</Button>
    </form>
  );
}

function Bill({ selectedFriend, setFriends, onHandleForm, setSelectedFriend }) {
  const [bill, setBill] = useState(0);
  const [yourExpense, setYourExpense] = useState(0);
  const [whoPays, setWhoPays] = useState("you");
  const paidByFriend = bill ? bill - yourExpense : "";

  function handlePayment(e) {
    e.preventDefault();

    if (whoPays === "you") {
      setFriends((frnds) =>
        frnds.map((frnd) =>
          frnd.id === selectedFriend.id
            ? { ...frnd, balance: frnd.balance + (bill - yourExpense) }
            : frnd
        )
      );
    } else {
      setFriends((frnds) =>
        frnds.map((frnd) =>
          frnd.id === selectedFriend.id
            ? { ...frnd, balance: frnd.balance - (bill - yourExpense) }
            : frnd
        )
      );
    }

    setBill(0);
    setYourExpense(0);
    setWhoPays("you");
    onHandleForm(false);
    setSelectedFriend(null);
  }

  return (
    <form className="form-split-bill">
      <h2>ٍsplit a bill with {selectedFriend.name}</h2>

      <label>💸 Bill value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>👨‍🍼 Your expense</label>
      <input
        type="number"
        value={yourExpense}
        onChange={(e) =>
          setYourExpense(
            Number(e.target.value) > bill ? yourExpense : Number(e.target.value)
          )
        }
      />

      <label>👩‍🦱 {selectedFriend.name}'s expense</label>
      <input type="number" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bills</label>
      <select value={whoPays} onChange={(e) => setWhoPays(e.target.value)}>
        <option value="you">You</option>
        <option value={selectedFriend.name}>{selectedFriend.name}</option>
      </select>

      <Button onClick={handlePayment}>Split</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default App;
