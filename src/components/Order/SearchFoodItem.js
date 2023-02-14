import React, { useState, useEffect } from 'react'
import { createdAPIEndpoint, ENDPOINTS } from '../../api/index'
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  InputBase,
  IconButton,
  makeStyles,
  ListItemSecondaryAction,
} from '@material-ui/core'
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone'
import PlusOneIcon from '@material-ui/icons/PlusOne'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

//define style
const useStyles = makeStyles((theme) => ({
  searchPaper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    marginLeft: theme.spacing(1.5),
    flex: 1,
  },
  listRoot: {
    marginTop: theme.spacing(1),
    maxHeight: 450,
    overflow: 'auto',
    '& li:hover': {
      cursor: 'pointer',
      backgroundColor: '#E3E3E3',
    },
    '& li:hover .MuiButtonBase-root': {
      display: 'block',
      color: '#000',
    },
    '& .MuiButtonBase-root': {
      display: 'none',
    },
    '& .MuiButtonBase-root:hover': {
      backgroundColor: 'transparent',
    },
  },
}))

const SearchFoodItem = (props) => {
  const { addFoodItem } = props
  const [foodItems, setFoodItems] = useState([])

  //state for foodItems after search
  const [searchList, setSearchList] = useState([])

  //
  const [searchKey, setSearchKey] = useState('')

  const classes = useStyles()

  useEffect(() => {
    createdAPIEndpoint(ENDPOINTS.FOODITEM)
      .fetchAll()
      .then((res) => {
        console.log('foodItems', res.data)
        setFoodItems(res.data)
        setSearchList(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  //search fooditems
  useEffect(() => {
    let x = [...foodItems]
    x = x.filter((y) => {
      return y.foodItemName
        .toLowerCase()
        .includes(searchKey.toLocaleLowerCase())
    })
    setSearchList(x)
  }, [searchKey])

  return (
    <>
      <Paper className={classes.searchPaper}>
        <InputBase
          placeholder="Search food items"
          className={classes.searchInput}
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <IconButton>
          <SearchTwoToneIcon />
        </IconButton>
      </Paper>
      <List className={classes.listRoot}>
        {searchList.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={item.foodItemName}
              secondary={'$' + item.price}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={(e) => addFoodItem(item)}>
                <PlusOneIcon />
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  )
}
export default SearchFoodItem
