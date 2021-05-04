import PropTypes from "prop-types";

const ItemPage = ({children}) => {

  return (
    <ul>
        {children}
    </ul>
  );
};

ItemPage.propTypes = {
  children: PropTypes.node
}

export default ItemPage;
