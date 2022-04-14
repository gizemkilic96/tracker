import { createContext, useReducer } from 'react';




export const GiderlerContext = createContext({
  giderler: [],
  addGider: ({ description, amount, date }) => {},
  setGiderler:(giderler)=>{},
  deleteGider: (id) => {},
  updateGider: (id, { description, amount, date }) => {},
});

function giderlerReducer(state, action) {
  switch (action.type) {
    case 'ADD':
     
      return [action.payload  , ...state];
      
      case 'SET':
        const inverted= action.payload.reverse();
        return inverted;
    case 'UPDATE':
      const updatableGiderIndex = state.findIndex(
        (gider) => gider.id === action.payload.id
      );
      const updatableGider = state[updatableGiderIndex];
      const updatedItem = { ...updatableGider, ...action.payload.data };
      const updatedGiderler = [...state];
      updatedGiderler[updatableGiderIndex] = updatedItem;
      return updatedGiderler;
    case 'DELETE':
      return state.filter((gider) => gider.id !== action.payload);
    default:
      return state;
  }
}

function GiderlerContextProvider({ children }) {
  const [giderlerState, dispatch] = useReducer(giderlerReducer, []);

  function addGider(giderData) {
    dispatch({ type: 'ADD', payload: giderData });
  }

  function setGiderler(giderler){
    dispatch({ type: 'ADD', payload:giderler});
    
  }

  function deleteGider(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateGider(id, giderData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: giderData } });
  }

  const value = {
    giderler: giderlerState,
    addGider: addGider,
    setGiderler: setGiderler,
    deleteGider: deleteGider,
    updateGider: updateGider,
  };

  return (
    <GiderlerContext.Provider value={value}>
      {children}
    </GiderlerContext.Provider>
  );
}

export default GiderlerContextProvider;