import './index.css'

const DishItem = props => {
  const {dish, removeCart, addCart, cartItems} = props
  const addItem = () => {
    addCart(dish)
  }
  const removeItem = () => {
    removeCart(dish)
  }
  const {
    dishName,
    dishImage,
    dishDescription,
    dishAvailability,
    dishCalories,
    dishPrice,
    dishType,
    dishCurrency,
    addonCat,
  } = dish
  console.log()

  const renderButtons = () => (
    <div>
      <button onClick={addItem}>+</button>

      <button onClick={removeItem}>-</button>
    </div>
  )

  return (
    <li>
      <div className="card">
        <div>
          <h1>prabhuva</h1>
          <p className="dish-heading">{dishName}</p>
          <p>
            {dishCurrency} {dishPrice}
          </p>
        </div>
        <div className="d-flex flex-row">
          <p>{dishDescription}</p>
          <p>{`${dishCalories} calories`}</p>
        </div>
        <img src={dishImage} alt="dishImage" className="dish-image" />
      </div>
      {dishAvailability && renderButtons()}
      {!dishAvailability && <p>Not available</p>}
      {addonCat.length !== 0 && (
        <p className="addon-availability-text">Customizations available</p>
      )}
    </li>
  )
}
export default DishItem
