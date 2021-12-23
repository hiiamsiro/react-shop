import counterReducder from '../Features/Counter/counterSlice';
import userReducer from '../Features/Auth/userSlice'
const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
    count: counterReducder,
    user: userReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;