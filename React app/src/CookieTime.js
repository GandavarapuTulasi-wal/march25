import axios from 'axios';
import { useEffect, useState } from 'react';

function CookieTime() {
  const addCookie = (event) => {
    event.preventDefault();
    axios
      .get(
        `/cookies/setcookiewithtime/${event.target.name.value}/${event.target.cookie.value}/${event.target.time.value}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="card-container">
      <h1>User Form</h1>
      <form onSubmit={addCookie} className="box">
        <input
          type="text"
          name="name"
          placeholder="Enter Cookie Name"
          className="todo-user-input"
        />
        <input
          type="text"
          name="cookie"
          placeholder="Enter Cookie value"
          className="todo-user-input"
        />
        <input
          type="number"
          placeholder="Enter Time"
          name="time"
          className="todo-user-input"
        />

        <button>Submit</button>
      </form>
    </div>
  );
}
export default CookieTime;
