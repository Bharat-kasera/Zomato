import { combineReducers } from 'redux'
import userReducer from './reducers/userSlice'
import cartReducer from './reducers/cartSlice'

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})

export default rootReducer