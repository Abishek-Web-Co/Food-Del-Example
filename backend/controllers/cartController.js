import userModel from '../models/userModel.js';

// Add an item to the user's cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId );
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding item to cart" });
    }
}


// remove an item from the user's cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        if(cartData[req.body.itemId]>1){       // chatgpt change
            cartData[req.body.itemId] -= 1;
        }
        else{                                  // chatgpt change
            delete cartData[req.body.itemId];  // chatgpt change
        }                                      // chatgpt change
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing item from cart" });
    }
}

// Get the user's cart
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching cart data" });
    }
}

export { addToCart, removeFromCart, getCart };