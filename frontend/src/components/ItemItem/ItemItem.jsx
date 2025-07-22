import React from 'react'
import './ItemItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const ItemItem = ({ id, name, price, description, image }) => {
 
  const {cartItems,addToCart,removeFromCart,url} = React.useContext(StoreContext);

  return (
    <div className='item-item'>
      <div className="item-item-img-container">
        <img className='item-item-image' src={url+"/images/"+image} alt="" />
        {!cartItems[id]
          ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
          : <div className='item-item-counter'>
            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        }
      </div>
      <div className="item-item-info">
        <div className="item-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_stars} alt="" />
        </div>
        <p className="item-item-desc">{description}</p>
        <p className='item-item-price'>₹{price}</p>
      </div>
    </div>
  )
}

export default ItemItem
