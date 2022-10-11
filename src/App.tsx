import React from 'react';
import List from './components/list/List';
import AddItem from './components/AddItem/AddItem';
import { useTodoList } from './useTodoList';


const App = () => {
  const {loading, error, addItem, items, toggleCompleted, deleteItem} = useTodoList();


  if(loading) {
    return (
      <h1>...</h1>
    )
  }

  if(error) {
    return (
      <>
        <h1>Errore server:</h1>
        <h3>{error?.message}</h3>
      </>
    )
  }


  if(!items) {
    return <ul></ul>
  }

  return (
    <>
      <AddItem addItem={addItem.mutate}/> 
      <List items={items} toggleCompleted={toggleCompleted.mutate} deleteItem={deleteItem.mutate}/>
      {deleteItem.isSuccess && <pre>cancellato elemento {deleteItem.data}</pre>}
    </>
    );


} 

export default App;
