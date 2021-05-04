import PropTypes from "prop-types";

const PriceTag = ({className, basePrice, quantity}) => {

  const setPrice = (basePrice, quantity) => {
    return utils.formatter.format(basePrice * quantity)
  }

  return (
    <div className={`${className} max-w-min font-semibold text-gray-700 text-sm`}>
        <span className={`p-2`}>{setPrice(basePrice, quantity)}</span>
    </div>
  );
};

PriceTag.propTypes = {
  basePrice: PropTypes.number,
  quantity: PropTypes.number
}

const utils = {
  formatter: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export default PriceTag;
