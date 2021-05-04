import PropTypes from 'prop-types'

const Item = ({item, children, onItemDelete, isCartPage, onAction}) => {

  return (
    <div className={`h-auto w-full p-4 flex flex-col justify-end border-b border-gray-300`}>
      <div className={`text-right`}><span onClick={isCartPage ? onAction : onItemDelete} className={`px-2 py-1 border border-red-300 hover:bg-red-300 cursor-pointer select-none`}>x</span></div>
      <div className={`flex mt-6`}>
        <div className={`flex items-start gap-3`}>
          <img src={item.image} alt={`item`} />

        </div>
        <span className={`flex flex-col flex-1 ml-4`}>
            <span className={`font-semibold text-sm text-gray-800`}>{item.name}</span>
            <span className={`text-xs text-gray-700`}>{item.description}</span>
          </span>
        <div className={`flex flex-col justify-between items-end`}>

          {children}
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  children: PropTypes.node
}

export default Item;
