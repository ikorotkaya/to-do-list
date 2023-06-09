import ProgressBar from './ProgressBar';
import TickIcon from './TickIcon';

const ListItem = ({task}) => {

  return (
    <li className="list-item">
      <div className='info-container'>
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar />
      </div>

      <div className='button-container'>
        <button className='edit-button'>Edit</button>
        <button className='delete-button'>Delete</button>
      </div>   
    </li>
  );
}

export default ListItem;