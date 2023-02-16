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

  return (
    <Grid container>
      <Grid item xs={12}>
        <OrderForm {...{ values, errors, handleInputChange }} />
      </Grid>
      <Grid item xs={6}>
        <SearchFoodItem {...{ values, setValues }} />
      </Grid>
      <Grid item xs={6}>
        <OrderedFoodItems {...{ values, setValues }} />
      </Grid>
    </Grid>
  )
}

export default Order
