import React, { useReducer, useEffect } from 'react';
import animalsReducer from '../reducers/animals-reducer';
import { getAnimalsFailure, getAnimalsSuccess } from '../actions/index';

const initialState = {
  isLoaded: false,
  animals: [],
  error: null
};

const Animals = () => {
  const [state, dispatch] = useReducer(animalsReducer, initialState);

  useEffect(() => {
    fetch(`https://slagapi.azurewebsites.net/api/animals/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          return response.json()
        }
      })
      .then((jsonifiedResponse) => {
        const action = getAnimalsSuccess(jsonifiedResponse.results)
        dispatch(action);
        })
      .catch((error) => {
        const action = getAnimalsFailure(error.message)
        dispatch(action);
      });
    }, [])

    const { error, isLoaded, animals } = state;

    if (error) {
      return <h1>Error: {error}</h1>;
    } else if (!isLoaded) {
      return <h1>...Loading...</h1>
    } else {
      return (
        <React.Fragment>
          <h1>SLAG ANIMALS</h1>
          <div>
            {animals.map((animal, index) =>
              <div key={index}>
                <h3>{animal.name}</h3>
                <img src={animal.image} alt="animal" />
              </div>
            )}
          </div>
        </React.Fragment>
      );
    }
}

export default Animals;