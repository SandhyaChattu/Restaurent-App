import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

import DishItem from '../DishItem'

const Home = () => {
  const [tabsList, setTabsList] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [tabId, setActiveTabId] = useState(0)
  const [restaurent, setRestaurentDetails] = useState([])
  const [cartItems, setCartItems] = useState([])
  const getUpdatedData = responseList =>
    // console.log(responseList)
    responseList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  const addItemtoCart = dish => {
    const isAlreadyExits = cartItems.find(item => item.dishId === dish.dishId)
    if (isAlreadyExits) {
      setCartItems(prev => {
        prev.map(each =>
          each.disId === dish.disId
            ? {...each,quantity:each.quantity + 1}
            : each,
        )
      })
    } else {
      const newDish = {...dish, quantity: 1}
      setCartItems(prev => [...prev, newDish])
    }
  }

  const removeCart = dish => {
    console.log(dish)

    setCartItems(prev => {
      prev.map(each =>
        each.disId === dish.disId
          ? {...each, quantity: each.quantity - 1}
          : each,
      )
    })
  }

  console.log(cartItems)
  const onUpdateActiveId = menuId => {
    setActiveTabId(menuId)
    // console.log(menuId)
  }

  const renderTabMenuList = () => (
    // console.log(tabsList)

    <div>
      <ul>
        <h1>{restaurent.restaurant_name}</h1>
        <p>My Orders</p>
        <p>{cartItems.length}</p>
        {tabsList.map(each => {
          const onClickHandler = () => {
            onUpdateActiveId(each.menuCategory)
          }
          return (
            <li onClick={onClickHandler}>
              <button>{each.menuCategory}</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
  const renderDishes = () => {
    const dish = tabsList.find(each => each.menuCategory === tabId)
    if (dish !== undefined) {
      const {categoryDishes} = dish
      console.log(categoryDishes)
      return (
        <ul>
          {categoryDishes.map(each => (
            <DishItem
              key={each.dishId}
              dish={each}
              addCart={addItemtoCart}
              removeCart={removeCart}
              cartItems={cartItems}
            />
          ))}
        </ul>
      )
    }
  }

  const fetchResults = async () => {
    setLoading(false)
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    if (response.ok === true) {
      const dbResponse = await response.json()
      setRestaurentDetails(dbResponse[0])
      const updatedData = getUpdatedData(dbResponse[0].table_menu_list)

      setTabsList(updatedData)

      setActiveTabId(dbResponse[0].table_menu_list[0].menu_category)
    }
  }
  useEffect(() => {
    fetchResults()
  }, [])

  return (
    <div>
      
      {renderTabMenuList()}
      {renderDishes()}
    </div>
  )
}
export default Home
