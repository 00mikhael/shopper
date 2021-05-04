import PropTypes from 'prop-types'

const AddToCardButton = ({onAction, isInCart}) => {

  return (
    <div onClick={onAction} className={`text-xs border-2 border-orange-400 max-w-max rounded ${isInCart ? `bg-orange-400 text-gray-100 hover:bg-orange-500` : `hover:bg-orange-400 hover:text-gray-100 text-gray-800`} cursor-pointer`}>
      <span className={`p-1 select-none flex justify-center items-center pointer-events-none`}>{isInCart ? `Remove` : `Add to Cart`}</span>
    </div>
  );
};

AddToCardButton.propTypes = {
  onAction: PropTypes.func,
  isInCart: PropTypes.bool
}

export default AddToCardButton;
