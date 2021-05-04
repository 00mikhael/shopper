import PropTypes from "prop-types";

const CartPage = ({children}) => {
  return (
    <ul>
        {children}
    </ul>
  );
};

CartPage.propTypes = {
  children: PropTypes.node
}

export default CartPage;
