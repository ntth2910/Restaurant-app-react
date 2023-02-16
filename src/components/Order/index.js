import React from 'react'
import OrderForm from './OrderForm'
import useForm from '../../hooks/useForm'
import { Grid } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import SearchFoodItem from './SearchFoodItem'
import OrderedFoodItems from './OrderedFoodItems'

const generateOrderNumber = () => {
  Math.floor(100000 + Math.random() * 900000).toString()
}

const getFreshModelObject = () => ({
  orderMasterId: 0,
  orderNumber: generateOrderNumber(),
  customerId: 0,
  pMethod: 'none',
  gTotal: 0,
  deleteOrderItemIds: '',
  orderDetails: [],
})

const Order = () => {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = useForm(getFreshModelObject)

  //add food to order
  const addFoodItem = (foodItem) => {
    let x = {
      orderMasterId: values.orderMasterId,
      orderDetailId: 0,
      foodItemId: foodItem.foodItemId,
      quantity: 1,
      foodItemPrice: foodItem.foodItemPrice,
      foodItemName: foodItem.foodItemName,
    }
    setValues({
      ...values,
      orderDetails: [...values.orderDetails, x],
    })
  }

  //remove foodItem in order list
  const removeFoodItem = (index, id) => {
    let x = { ...values }
    x.orderDetails = x.orderDetails.filter((item, i) => i !== index)
    setValues({ ...x })
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <OrderForm {...{ values, errors, handleInputChange }} />
      </Grid>
      <Grid item xs={6}>
        <SearchFoodItem
          {...{ addFoodItem, orderedFoodItems: values.orderDetails }}
        />
      </Grid>
      <Grid item xs={6}>
        <OrderedFoodItems {...{ removeFoodItem, values, setValues }} />
      </Grid>
    </Grid>
  )
}

export default Order
