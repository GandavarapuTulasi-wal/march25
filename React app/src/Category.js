import axios from 'axios';
import { useEffect, useState } from 'react';

function Category() {
  let [categories, setCategories] = useState([]);
  let [update, setUpdate] = useState(false);
  let [editCategories, setEditCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = () => {
    axios
      .get('/categories')
      .then((res) => {
        setCategories(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addCategory = (event) => {
    event.preventDefault();
    let categoryObject = {
      name: event.target.name.value,
      description: event.target.description.value,
    };
    axios
      .post('/categories', categoryObject)
      .then((res) => {
        getCategories();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteCategory = (id) => {
    axios
      .delete('/categories/' + id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getCategories();
  };
  const deleteAll = () => {
    axios.get('/categories/deleteall').then((res) => {
      console.log(res.data);
    });
    getCategories();
  };
  const updateCategory = (category) => {
    setUpdate(true);
    setEditCategories(category);
    console.log(editCategories);
  };
  const closeCategory = () => {
    setUpdate(false);
  };
  const saveCategory = (event) => {
    event.preventDefault();
    const obj = {
      name: event.target.name.value,
      description: event.target.description.value,
      category_id: editCategories.category_id,
    };
    axios
      .put(`/categories/update/${editCategories.category_id}`, obj)
      .then((res) => {
        getCategories();
        setUpdate(false);
        console.log(res.data);
      });
  };
  return (
    <div className="card-container">
      <h1>Category Form</h1>
      <form onSubmit={addCategory} className="box">
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
        <h1>categories</h1>
        {categories.map((val, index) => (
          <div>
            <div className="card">
              <h3>{val.name}</h3>
              <p>{val.description}</p>
              <button
                className="delete"
                onClick={() => {
                  deleteCategory(val.category_id);
                }}
              >
                Delete
              </button>
              <button onClick={() => updateCategory(val)}>Edit</button>
            </div>
            {update ? (
              <form onSubmit={saveCategory} className="save-box">
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
                <div className="button-container">
                  <button>Save</button>
                  <button className="delete" onClick={() => closeCategory()}>
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
export default Category;
