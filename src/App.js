import logo from './logo.svg';
import './App.css'

import {useState, useEffect} from 'react'

import Nav from './components/Nav'
import ItemPage from './components/ItemPage'
import CartPage from './components/CartPage'
import Item from './components/Item'
import AddToCardButton from './components/AddToCardButton'
import PriceTag from './components/PriceTag'
import ItemQuantityButton from './components/ItemQuantityButton'

import data from './static-data'

function App() {

  const [activeTab, setActiveTab] = useState(1)
  const [items, setItems] = useState([])
  const [cart, setCart] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const [cartQuantity, setCartQuantity] = useState(10)

  useEffect(() => {
    setItems(data)
  }, [])

  useEffect(() => {
    const cartCopy = [...cart];
    const cartTotal = cartCopy.reduce((total, item) => {
      const itemTotal = item.price * item.quantityInCart;
      return total + itemTotal;
    },0)
    setCartQuantity(cart.length)
    setCartTotal(cartTotal);
  }, [cart])

  const handleTabClick = (event) => {
    event.preventDefault()
    if (event.target.textContent === "Cart") {
      setActiveTab(2)
    } else if (event.target.textContent === "Items") {
      setActiveTab(1)
    }
  }

  const handleAddToCart = (item) => {
    if (item.isInCart) {
      let index = items.findIndex(i => i.id === item.id);
      if (index >= 0) {
        item.isInCart = false;
        item.quantityInCart = 0;
        setItems(prevItems => {
          const copy = [...prevItems];
          copy.splice(index, 1, item)
          return copy;
        });
        setCart(prevCart => prevCart.filter(cartItem => (
          cartItem.id !== item.id
        )))
      }
    } else {
      let index = items.findIndex(i => i.id === item.id);
      if (index >= 0) {
        item.isInCart = true;
        item.quantityInCart = item.defaultQuantity;
        setItems(prevItems => {
          const copy = [...prevItems];
          copy.splice(index, 1, item)
          return copy;
        })
        setCart(prevCart => [...prevCart, item]);
      }
    }
  }

  const handleClearCart = () => {
    setCart([])
    setItems(prevItems => {
      const copy = prevItems.map(item => {
        item.isInCart = false;
        item.quantityInCart = item.defaultQuantity;
        return item;
      })
      return copy;
    })
  }

  const handleItemDelete = (item) => {
    let indexInCart = cart.findIndex(i => i.id === item.id);
    let indexInItems = items.findIndex(i => i.id === item.id);
    if (indexInItems >= 0) {
      setItems(prevItems => {
        const copy = [...prevItems];
        copy.splice(indexInItems, 1)
        return copy;
      })
    }
    if (indexInCart >= 0) {
      setCart(prevCart => {
        const copy = [...prevCart];
        copy.splice(indexInCart, 1)
        return copy;
      })
    }
  }

  const handleQuantityChange = (item, newQuantity) => {
    let indexInCart = cart.findIndex(i => i.id === item.id);
    let indexInItems = items.findIndex(i => i.id === item.id);
    item.quantityInCart = newQuantity;
    if (indexInItems >= 0) {
      setItems(prevItems => {
        const copy = [...prevItems];
        copy.splice(indexInItems, 1, item)
        return copy;
      })
    }
    if (indexInCart >= 0) {
      setCart(prevCart => {
        const copy = [...prevCart];
        copy.splice(indexInCart, 1, item)
        return copy;
      })
    }
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col">
      <span className="p-4 bg-white text-3xl font-extrabold border-t-4 border-blue-500 flex items-center z-10">
        Shopper<img className={`App-logo`} width={60} src={logo} alt={`logo`}/></span>
      <Nav activeTab={activeTab} onAction={handleTabClick} cartItemQuantity={cartQuantity} cartTotal={cartTotal} />
      <main>
          {activeTab === 1 ?
          <ItemPage>
            {items.map(item => (
              <Item key={item.id} item={item} isCartPage={false} onItemDelete={() => handleItemDelete(item)} onAction={() => handleAddToCart(item)}>
                <>
                  <PriceTag basePrice={item.price} quantity={item.defaultQuantity} />
                  <AddToCardButton onAction={() => handleAddToCart(item)} isInCart={item.isInCart} />
                </>
              </Item>))}
              {items.length < 1 && <div className="text-xl font-bold text-gray-500 text-center p-8">We no get anything 🤲</div>}
            </ItemPage>
            :
            <CartPage>
              {cart.map(cartItem => (
                <Item key={cartItem.id} item={cartItem} isCartPage={true} onItemDelete={() => handleItemDelete(cartItem)} onAction={() => handleAddToCart(cartItem)}>
                  <PriceTag basePrice={cartItem.price} quantity={cartItem.quantityInCart} />
                  <ItemQuantityButton quantity={cartItem.quantityInCart} onAction={(newQuantity) => handleQuantityChange(cartItem, newQuantity)} />
                </Item>
              ))}
              {cart.length < 1 && <div className="text-xl font-bold text-gray-500 text-center p-8">Your cart is empty 😴</div>}
              {cart.length > 0 && <div className="text-base text-gray-500 text-center p-8 "><span role="button" onClick={handleClearCart} className={`border-2 border-orange-400 px-4 py-2 hover:bg-orange-400 select-none cursor-pointer`}>Clear Cart</span></div>}
            </CartPage>
          }
      </main>
    </div>
  );
}

export default App;
