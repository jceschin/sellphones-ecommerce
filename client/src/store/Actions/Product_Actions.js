import axios from 'axios';


export function getProduct(categories) {
  return (axios.get('http://localhost:4000/products/', {
    params: {
      categories
    }
  })
  )
}

export function itemCartAdd(userId) {
  return (dispatch) => {
    axios.get(`http://localhost:4000/orders/cart/${userId}` )
      .then((res) => {
        console.log(res)
        dispatch({
          type: 'ADD_ITEM_CART',
          payload: res.data.data.products.length + 1
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function postsugestions(sugestions) {
  return(dispatch) => {
  dispatch({
    type: 'POST_SUGESTIONS',
    payload: sugestions
  })}
}
