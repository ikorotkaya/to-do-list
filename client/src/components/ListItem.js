import ProgressBar from './ProgressBar';
import TickIcon from './TickIcon';
import { useState } from 'react';
import Modal from './Modal';

const ListItem = ({task, getData}) => {
  const [showModal, setShowModal] = useState(false);

  const deleteData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response: ", response);
      if (response.status === 200) {
        getData();
      }
    } catch(err) {
      console.log(err);
    }
  }


  return (
    <li className="list-item">
      <div className='info-container'>
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar />
      </div>

      <div className='button-container'>
        <button className='edit-button' onClick={() => setShowModal(true)}>Edit</button>
        <button className='delete-button' onClick={deleteData} >Delete</button>
      </div>
      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task} />}
    </li>
  );
}

export default ListItem;