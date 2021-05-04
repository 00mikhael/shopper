import {useEffect, useRef} from "react";
import PropTypes from 'prop-types'

const useEffectOnlyOnce = (func) => useEffect(func, [func])

const ItemQuantityButton = ({quantity, onAction}) => {
  const inputRef = useRef();

  useEffectOnlyOnce(() => inputRef.current.value = quantity);

  const handleClick = (event) => {
    event.preventDefault()
    switch (event.target.textContent) {
      case '+':
        onAction(quantity + 1)
        break;
      case '-':
        if (quantity - 1 === -1) {
          return;
        }
        onAction(quantity - 1)
        break;
      default:
        break;
    }
  }

  const handleChange = (event) => {
    const input = event.target.value;
    if (input === '') {
      return;
    }
    if (!isNaN(Number.parseInt(input))) {
      onAction(Number.parseInt(input));
      return;
    }
  }

  return (
  <div className={`flex max-w-min h-6`}>
    <span onClick={handleClick} className={`w-6 h-6 flex justify-center items-center border-l border-t border-b border-gray-400 cursor-pointer hover:border-gray-500 select-none`}>-</span>
    <input onChange={handleChange} ref={inputRef} style={{marginTop: `-4px`}} className={`w-8 h-8 flex text-center text-base justify-center items-center border border-gray-400  cursor-pointer outline-none focus:outline-none shadow-inner`}/>
    <span onClick={handleClick} className={`w-6 h-6 flex justify-center items-center border-r border-t border-b border-gray-400 cursor-pointer hover:border-gray-500 select-none`}>+</span>
  </div>
  );
};

ItemQuantityButton.propTypes = {
  quantity: PropTypes.number,
  onAction: PropTypes.func
}

export default ItemQuantityButton;
