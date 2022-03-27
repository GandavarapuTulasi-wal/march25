import axios from 'axios';
import { useEffect, useState } from 'react';

function Todo() {
  let [dishes, setDishes] = useState([]);
  let [update, setUpdate] = useState(false);
  let [editDishes, setEditDishes] = useState([]);
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    getDishes();
    getCategories();
  }, []);
  console.log(categories);
  const getDishes = () => {
    axios
      .get('/dishes')
      .then((res) => {
        setDishes(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getCategories = () => {
    axios
      .get('/categories')
      .then((res) => {
        setCategories(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addDish = (event) => {
    event.preventDefault();
    let dishObject = {
      name: event.target.name.value,
      description: event.target.description.value,
      price: event.target.price.value,
      category_id: event.target.category.value,
    };
    axios
      .post('/dishes', dishObject)
      .then((res) => {
        getDishes();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteDish = (id) => {
    axios
      .delete('/dishes/' + id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getDishes();
  };
  const deleteAll = () => {
    axios.get('/dishes/deleteall').then((res) => {
      console.log(res.data);
    });
    getDishes();
  };
  const updateDish = (dish) => {
    setUpdate(true);
    setEditDishes(dish);
  };
  const closeDish = () => {
    setUpdate(false);
  };
  const saveDish = (event) => {
    event.preventDefault();
    const obj = {
      name: event.target.name.value,
      description: event.target.description.value,
      price: event.target.price.value,
      category_id: event.target.category.value,
      dishes_id: editDishes.dishes_id,
    };
    axios.put(`/dishes/update/${editDishes.dishes_id}`, obj).then((res) => {
      getDishes();
      setUpdate(false);
      console.log(res.data);
    });
  };
  return (
    <div className="card-container">
      <h1>Todos Form</h1>
      <form onSubmit={addDish} className="box">
        <input
          type="text"
          name="name"
          placeholder="Enter Item"
          className="todo-user-input"
        />
        <textarea
          placeholder="Enter Description"
          className="todo-user-input"
          name="description"
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Enter Price"
          className="todo-user-input"
        />
        <select
          name="category"
          placeholder="Select Category"
          className="todo-user-input"
        >
          {categories.map((category) => (
            <option value={category.category_id}>{category.name}</option>
          ))}
        </select>
        <button>Add</button>
      </form>

      <button
        onClick={() => {
          deleteAll();
        }}
      >
        Delete all
      </button>
      <div>
        <h1>todos</h1>
        {dishes.map((val, index) => (
          <div>
            <div className="card">
              <h3>{val.name}</h3>
              <p>{val.description}</p>
              <p>{val.price}</p>
              <p>{val.category_id}</p>
              <button
                className="delete"
                onClick={() => {
                  deleteDish(val.dishes_id);
                }}
              >
                Delete
              </button>
              <button onClick={() => updateDish(val)}>Edit</button>
            </div>
            {update ? (
              <form onSubmit={saveDish} className="save-box">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Item"
                  className="todo-user-input"
                />
                <textarea
                  placeholder="Enter Description"
                  className="todo-user-input"
                  name="description"
                ></textarea>
                <input type="number" name="price" placeholder="Enter Price" />
                <select name="category" placeholder="Select Category">
                  {categories.map((category) => (
                    <option value={category.category_id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="button-container">
                  <button>Save</button>
                  <button className="delete" onClick={() => closeDish()}>
                    Close
                  </button>
                </div>
              </form>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Todo;
