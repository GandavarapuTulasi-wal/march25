import axios from 'axios';
import { useEffect, useState } from 'react';

function User() {
  const addUser = (event) => {
    event.preventDefault();
    axios
      .get(`/cookies/setcookie/city/${event.target.city.value}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card-container">
      <h1>User Form</h1>
      <form onSubmit={addUser} className="box">
        <input
          type="text"
          name="city"
          placeholder="Enter City"
          className="todo-user-input"
        />

        <button>Submit</button>
      </form>
    </div>
  );
}
export default User;
