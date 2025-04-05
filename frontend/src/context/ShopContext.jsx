import { createContext, useEffect, useState } from "react";
// import { all_products } from "../assets/data";
import axios from 'axios'

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({})
    const url = "http://localhost:4000"
    const [token, setToken] = useState("")
    const [all_products, setAll_products] = useState([])

    const addToCart = async (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        if (token) {
            await axios.post(url + "/api/cart/add", { itemId },{headers:{token}})
        }
    }
    const removeFromCart = async(itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if(token){
            await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
        }
    }


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = all_products.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItem[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItem) {
            totalItems += cartItem[item]
        }
        return totalItems;
    }

    const fetchProductList = async () => {
        const response = await axios.get(url + "/api/product/list")
        setAll_products(response.data.product)
    }

    const loadCartData = async (token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItem(response.data.cartData);
    }

    useEffect(() => {

        async function loadData() {
            await fetchProductList()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    },[token])


    const contextValue = { all_products, cartItem, setCartItem, addToCart, removeFromCart, getTotalCartAmount, url, token, setToken, getTotalCartItems ,loadCartData};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;