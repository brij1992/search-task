import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  useEffect(() => {
    setFilteredData(
      users.filter((user) =>
        user.name.toLowerCase().includes(search.toLocaleLowerCase())
      )
    );
  }, [search, users]);
  return (
    <div className="App">
      <input
        type="text"
        placeholder="search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {filteredData.length === 0 ? (
        <div style={{ color: "red" }}>No result found!!</div>
      ) : (
        filteredData.map((val) => {
          return (
            <div key={val.id}>
              <p>{val.name}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;
