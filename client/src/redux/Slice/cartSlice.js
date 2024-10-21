import { createSlice } from "@reduxjs/toolkit"


const initialState = [];
// const initialState = localStorage.getItem("persist:root") ? JSON.parse(localStorage.getItem("persist:root")) : [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },
        remove(state, action) {
            return state.filter((item) => item.id !== action.payload.id);
        },

        // increseQuantity(state, action) {
        //     const mycartdatacheck = JSON.parse(initialState.cart)
        //     const itemIndex = mycartdatacheck.findIndex(
        //         (item) => item.id === action.payload.id
        //     );
        //     if (mycartdatacheck[itemIndex].quantity >= 1) {
        //         action.payload.quantity += 1;
        //     }
            
        //     localStorage.setItem("persist:root", JSON.stringify(state.cartItems));

        // },
        // decreaseQuantity(state, action) {

        // }
    }
})

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";


// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     products: {},
//     quantity: 0,
//     total: 0,
//   },
//   reducers: {
//     addProduct: (state, action) => {
//       state.quantity += 1;
//       state.products.push(action.payload);
//       state.total += action.payload.price * action.payload.quantity;
//     },
//   },
// });

// export const { addProduct } = cartSlice.actions;
// export default cartSlice.reducer;