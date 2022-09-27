import * as c from '../actions/ActionTypes';

const animalsReducer = (state, action) => {
  switch (action.type) {
    case c.GET_ANIMALS_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        animals: action.animals
      };
    case c.GET_ANIMALS_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: action.error
      };
    default: 
      throw new Error(`There is no action matching ${action.type}.`);
  }
};

export default animalsReducer;