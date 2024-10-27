// import { combineReducers, applyMiddleware,createStore } from '@reduxjs/toolkit'
// import { thunk }  from 'redux-thunk';
// import { composeWithDevTools } from "@redux-devtools/extension";


// const reducer = combineReducers({
    
// })


// const store = createStore(
//     reducer,{},
//     composeWithDevTools(applyMiddleware(thunk))
// )

// export default store



import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { thunk }  from 'redux-thunk';
import productsReducer from './slices/productsSlice';
import singleProductReducer from './slices/singleProductSlice'
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer  from './slices/orderSlice';
import userReducer from './slices/userSlice';

const reducer = combineReducers({
  productsState: productsReducer,
  singleProductState: singleProductReducer,
  authState: authReducer,
  cartState: cartReducer,
  orderState: orderReducer,
  userState: userReducer,
})


const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store



