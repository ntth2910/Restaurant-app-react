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
  makeStyles,
} from '@material-ui/core'
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone'
import { roundTo2DecimalPoint } from '../../utils/index'

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    margin: '15px 0px',
    '&:hover': {
      cursor: 'pointer',
    },
    '&:hover $deleteButton': {
      display: 'block',
    },
  },
  buttonGroup: {
    backgroundColor: '#E3E3E3',
    borderRadius: 8,
    '& .MuiButtonBase-root': {
      border: 'none',
      minWidth: '25px',
      padding: '1px',
    },
    '& button:nth-child(2)': {
      fontSize: '1.2em',
      color: '#000',
    },
  },
  deleteButton: {
    display: 'none',
    '& .MuiButtonBase-root': {
      color: '#E81719',
    },
  },
  totalPerItem: {
    fontWeight: 'bolder',
    fontSize: '1.2em',
    margin: '0px 10px',
  },
}))

const OrderedFoodItems = (props) => {
  const classes = useStyles()
  const { values, setValues } = props
  let orderedFoodItems = values.orderDetails

  //remove foodItem in order list
  const removeFoodItem = (index, id) => {
    let x = { ...values }
    x.orderDetails = x.orderDetails.filter((item, i) => i !== index)
    setValues({ ...x })
  }

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
      {orderedFoodItems.length === 0 ? (
        <ListItem>
          <ListItemText
            primary="Please select food items"
            primaryTypographyProps={{
              style: {
                textAlign: 'center',
                fontStyle: 'italic',
              },
            }}
          />
        </ListItem>
      ) : (
        orderedFoodItems.map((item, index) => (
          <Paper key={index} className={classes.paperRoot}>
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
                    <ButtonGroup size="small" className={classes.buttonGroup}>
                      <Button onClick={(e) => updateQuantity(index, -1)}>
                        -
                      </Button>
                      <Button disabled>{item.quantity}</Button>
                      <Button onClick={(e) => updateQuantity(index, +1)}>
                        +
                      </Button>
                    </ButtonGroup>
                    <span className={classes.totalPerItem}>
                      {'$' +
                        roundTo2DecimalPoint(
                          item.quantity * item.foodItemPrice,
                        )}
                    </span>
                  </>
                }
                secondaryTypographyProps={{
                  component: 'div',
                }}
              />
              <ListItemSecondaryAction className={classes.deleteButton}>
                <IconButton
                  disableRipple
                  onClick={(e) => removeFoodItem(index, item.orderDetailsId)}
                >
                  <DeleteTwoToneIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        ))
      )}
    </List>
  )
}

export default OrderedFoodItems
