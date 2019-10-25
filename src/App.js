import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, CardColumns, Card, Navbar, Nav } from 'react-bootstrap'
import styled from 'styled-components'

function App() {
  return (
    <React.Fragment>
      <Navigator />
      <StyledMovies>
        <Movies />
      </StyledMovies>
    </React.Fragment>
  )
}

class Navigator extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
        <Container className="px-3">
          <Navbar.Brand href="#home">Pelis</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link href="#home">Populares</Nav.Link>
            <Nav.Link href="#features">Proximos estrenos</Nav.Link>
            <Nav.Link href="#pricing">Favoritos</Nav.Link>
          </Nav>
        </Container>
      </Navbar >
    )
  }
}

class Movies extends Component {

  constructor() {
    super()
    this.state = {
      data: [],
      loading: false
    }
  }

  async componentDidMount() {
    this.setState({
      loading: true
    })
    try {
      const { data } = await axios.get("https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=3d7fd0461ae8d0f2e808c37fb41950d7")
      this.setState({ data: data.results })
      console.log(data);

    } catch (error) {
      console.log(error);
      this.setState({ error })
    } finally {
      this.setState({
        loading: false
      })
      console.log("La petición termino");
    }
  }

  render() {
    const { data, loading } = this.state
    if (loading) return <p>Loading...</p>
    return (
      <Container className="pt-3">
        <CardColumns>
          {data.length ? data.map(movie =>
            (<Card key={movie.id} bg="dark" text="white">
              <Card.Img variant="top" src={"https://image.tmdb.org/t/p/w200" + movie.poster_path} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.overview}</Card.Text>
              </Card.Body>
            </Card>
            )
          ) : null}
        </CardColumns>
      </Container>
    )
  }
}


const StyledMovies = styled.body`
  background: darkgray;
`;

export default App;
