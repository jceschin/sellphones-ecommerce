const initalState = {
  iconcart: 0,
  products: [],
  categories: [],
  cart: [],
  sugestions : [],
  user:{
    id:1,
    name: 'Nicolas',
    lastname: 'Valencia',
    mail: 'nico@nico.com'
  },
  reviews: []
}

const Reducer = (state = initalState, action)=>{
  
  switch( action.type ){

    case 'ADD_ITEM_CART':
      console.log(action.payload)
      return { ...state, iconcart: action.payload }

    case 'GET_PRODUCTS':
      return { ...state, products: action.payload }

    case 'POST_PRODUCTS':
      return { ...state, products: state.products.concat(action.payload)}

      case 'POST_SUGESTIONS':
        return { ...state, sugestions: action.payload}

    case 'POST_REVIEWS':
      return { ...state, reviews: state.reviews.concat(action.payload)}    

    default:
      return state
  }
};

export default Reducer;
