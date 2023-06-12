import { useState } from "react";
import { useCookies } from "react-cookie";

const  Modal = ({mode, setShowModal, getData, task}) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const editMode = mode === "edit" ? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : '',
    progress: editMode ? task.progress : 10,
    date: editMode ? task.date : new Date()
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      // console.log("response: ", response);
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch(err) {
      console.log(err);
    }
  }

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      console.log("response: ", response);
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch(err) {
      console.log(err);
    }
  }

//  update the data state based on user input
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setData({
      ...data,
      [name]: value
    });
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input 
          required
          maxLength={30}
          placeholder=" Your task goes here"
          name="title"
          value={data.title}
          onChange={handleChange}
          />

          <input 
          required
          type="range"
          min={0}
          max={100}
          name="progress"
          value={data.progress}
          onChange={handleChange}/>

          <input className={mode} type="submit" onClick={editMode ? editData : postData} />
        </form>
        
      </div>

    </div>
  );
}

export default Modal;