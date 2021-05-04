import PriceTag from '../PriceTag';

const Nav = ({activeTab, onAction, cartItemQuantity, cartTotal}) => {
  return (
    <div className={`sticky top-0  bg-white z-10 flex w-full border-b border-blue-500 justify-between`}>
      <ul className={`p-4 flex text-xl text-gray-800`}>
        <span onClick={onAction} className={`cursor-pointer border-b-4 select-none border-transparent ${activeTab === 1 ? `border-orange-400` : `hover:border-orange-400`}`}>Items</span>
        <span className={`cursor-pointer border-b-4 ml-8 z-10 select-none focus:bg-transparent border-transparent ${activeTab === 2 ? `border-orange-400` : `hover:border-orange-400`}`}><span onClick={onAction}>Cart</span>{cartItemQuantity > 0 ? <sup className="px-2 py-1 ml-1 rounded-full bg-orange-400 select-none">{cartItemQuantity}</sup> : ``}</span>
      </ul>
      <PriceTag className={`px-2 py-4 flex items-center justify-center font-extrabold bg-orange-400`} basePrice={cartTotal} quantity={1} />
    </div>
  );
};

export default Nav;
