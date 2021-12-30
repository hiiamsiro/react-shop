import counterReducder from '../Features/Counter/counterSlice';
import userReducer from '../Features/Auth/userSlice'
import cartReducer from '../Features/Cart/cartSlice'
const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
    count: counterReducder,
    user: userReducer,
    cart: cartReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;