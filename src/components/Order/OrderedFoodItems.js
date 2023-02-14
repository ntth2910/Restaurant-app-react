import React from 'react'
import {
  List,
  Paper,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
} from '@material-ui/core'
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone'

const OrderedFoodItems = (props) => {
  const { orderedFoodItems, removeFoodItem } = props

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
