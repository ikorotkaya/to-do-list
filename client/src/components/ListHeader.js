import Modal from './Modal';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

const ListHeader = ({listName, getData}) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [showModal, setShowModal] = useState(false);

  const signOut = () => {
    console.log('Sign out');
    removeCookie('AuthToken');
    removeCookie('Email');

    window.location.reload();
  }

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create-button" onClick={() => setShowModal(true)}>Add new</button>
        <button className="signout-button" onClick={signOut}>Sign out</button> 
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData}/>}
    </div>
  );
}

export default ListHeader;