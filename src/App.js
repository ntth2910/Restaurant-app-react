import { Container, Typography } from '@material-ui/core'
import './App.css'
import Order from './components/Order'

function App() {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" align="center" gutterBottom>
        Restaurant App
      </Typography>
      <Order />
    </Container>
  )
}

export default App
