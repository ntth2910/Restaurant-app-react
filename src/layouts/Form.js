import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '90%',
      margin: theme.spacing(1),
    },
  },
}))

const Form = (props) => {
  const classes = useStyles()
  const { children, ...other } = props
  console.log(props)
  /*
giải thích ...other
let obj ={
    name: 'abc,
    age: 12,
    address: 'danang',
    hobby: 'swimming'
}
const {name, age, ...other}=obj
other ={
    address: 'danang',
    hobby: 'swimming'
}
*/

  return (
    <form className={classes.root} noValidate autoComplete="off" {...other}>
      {children}
    </form>
  )
}

export default Form
