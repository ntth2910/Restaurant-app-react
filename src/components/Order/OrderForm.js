import React, { useState, useEffect } from 'react'
import Form from '../../layouts/Form'
import {
  Grid,
  InputAdornment,
  makeStyles,
  ButtonGroup,
  Button as MuiButton,
} from '@material-ui/core'
import ReplayIcon from '@material-ui/icons/Replay'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import ReorderIcon from '@material-ui/icons/Reorder'
import { Button, Select, Input } from '../../controls/index'
import useForm from '../../hooks/useForm'
import { createdAPIEndpoint, ENDPOINTS } from '../../api/index'
import { roundTo2DecimalPoint } from '../../utils/index'

const pMethods = [
  { id: 'none', title: 'Select' },
  { id: 'Cash', title: 'Cash' },
  { id: 'Card', title: 'Card' },
]

const useStyle = makeStyles((theme) => ({
  adornmentText: {
    '& .MuiTypography-root': {
      color: '#f3b33d',
      fontWeight: 'bolder',
      fontSize: '1.5em',
    },
  },
  submitButtonGroup: {
    backgroundColor: '#f3b33d',
    color: '#000',
    margin: theme.spacing(1),
    '& .MuiButton-label': {
      textTransform: 'none',
    },
    '&:hover': {
      backgroundColor: '#f3b33d',
    },
  },
}))

const OrderForm = (props) => {
  const { values, setValues, errors, setErrors, handleInputChange } = props
  const classes = useStyle()

  const [customerList, setCustomerList] = useState([])

  useEffect(() => {
    createdAPIEndpoint(ENDPOINTS.CUSTOMER)
      .fetchAll()
      .then((res) => {
        console.log('hihi')
        let customerList = res.data.map((item) => ({
          id: item.customerId,
          title: item.customerName,
        }))
        customerList = [{ id: 0, title: 'Select' }].concat(customerList)
        setCustomerList(customerList)
        console.log('customerList', customerList)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    let gTotal = values.orderDetails.reduce((tempTotal, item) => {
      return tempTotal + item.quantity * item.foodItemPrice
    }, 0)
    setValues({
      ...values,
      gTotal: roundTo2DecimalPoint(gTotal),
    })
  }, [JSON.stringify(values.orderDetails)])

  //validate Form
  const validateForm = () => {
    let temp = {}
    temp.customerId = values.customerId !== 0 ? '' : 'This field is required.'
    temp.pMethod = values.pMethod !== 0 ? 'none' : 'This field is required.'
    temp.orderDetails =
      values.orderDetails.length !== 0 ? '' : 'This field is required.'
    setErrors({ ...temp })
    return Object.values(temp).every((x) => x === '')
  }

  //submit order function
  const submitOrder = (e) => {
    e.preventDefault()
    if (validateForm()) {
    }
  }

  return (
    <Form onSubmit={submitOrder}>
      <Grid container>
        <Grid item xs={6}>
          <Input
            label="Order Number"
            name="orderNumber"
            disabled
            value={values.orderNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  className={classes.adornmentText}
                >
                  #
                </InputAdornment>
              ),
            }}
          />
          <Select
            value={values.customerId}
            label="Customer"
            name="customerId"
            onChange={handleInputChange}
            // options={[
            //   {
            //     id: 0,
            //     title: 'Select',
            //   },
            //   {
            //     id: 1,
            //     title: 'customer 1',
            //   },
            //   {
            //     id: 2,
            //     title: 'customer 2',
            //   },
            //   {
            //     id: 3,
            //     title: 'customer 3',
            //   },
            // ]}
            options={customerList}
            error={errors.customerId}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            value={values.pMethod}
            label="Payment Method"
            name="pMethod"
            options={pMethods}
            onChange={handleInputChange}
            error={errors.pMethod}
          />
          <Input
            label="Grand Total"
            name="grandTotal"
            disabled
            value={values.gTotal}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  className={classes.adornmentText}
                >
                  $
                </InputAdornment>
              ),
            }}
          />
          <ButtonGroup className={classes.submitButtonGroup}>
            <MuiButton
              size="large"
              type="submit"
              endIcon={<RestaurantMenuIcon />}
            >
              Submit
            </MuiButton>
            <MuiButton size="small" startIcon={<ReplayIcon />} />
          </ButtonGroup>
          <Button size="large" startIcon={<ReorderIcon />}>
            Orders
          </Button>
        </Grid>
      </Grid>
    </Form>
  )
}

export default OrderForm
