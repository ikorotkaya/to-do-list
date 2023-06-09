const ListHeader = ({listName}) => {

  const signOut = () => {
    console.log('Sign out');
  }

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create-button">Add new</button>
        <button className="signout-button">Sign out</button> 
      </div>
    </div>
  );
}

export default ListHeader;