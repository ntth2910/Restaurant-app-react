import React from 'react'
import {
  List,
  Paper,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  ButtonGroup,
  Button,
} from '@material-ui/core'
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone'

const OrderedFoodItems = (props) => {
  const { removeFoodItem, values, setValues } = props
  let orderedFoodItems = values.orderDetails

  //tang giam quantity
  const updateQuantity = (index, value) => {
    let x = { ...values }
    let foodItem = x.orderDetails[index]
    if (foodItem.quantity + value > 0) {
      foodItem.quantity += value
      setValues({ ...x })
      console.log('values', values)
    }
  }

  return (
    <List>
      {orderedFoodItems.map((item, index) => (
        <Paper key={index}>
          <ListItem>
            <ListItemText
              primary={item.foodItemName}
              primaryTypographyProps={{
                component: 'h1',
                styles: {
                  fontWeight: '500',
                  fontSize: '1.2em',
                },
              }}
              secondary={
                <>
                  <ButtonGroup size="small">
                    <Button onClick={(e) => updateQuantity(index, -1)}>
                      -
                    </Button>
                    <Button disabled>{item.quantity}</Button>
                    <Button onClick={(e) => updateQuantity(index, +1)}>
                      +
                    </Button>
                  </ButtonGroup>
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                disableRipple
                onClick={(e) => removeFoodItem(index, item.orderDetailsId)}
              >
                <DeleteTwoToneIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      ))}
    </List>
  )
}

export default OrderedFoodItems
