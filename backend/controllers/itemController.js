import { log } from "console";
import itemModel from "../models/itemModel.js";
import fs from "fs";


// add item item
const addItem = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const item = new itemModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await item.save();
        res.json({success: true,message:"Food Added"})
    }catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

// all item list
const listItem = async (req, res) => {  // to check
    try {
        let items = await itemModel.find({});
        res.json({success: true, data: items});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error fetching items"});
    }
}

// remove itemitem
const removeItem =async (req,res)=>{
    try {
        const item = await itemModel.findById(req.body.id);
        fs.unlink(`uploads/${item.image}`,()=>{})

        await itemModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Item removed successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error removing item"});
    }
}

export { addItem,listItem,removeItem};