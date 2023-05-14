import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { Row, Col, FormGroup, Input, Button, Form } from 'reactstrap';
import { useState } from 'react';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import BookItems from '../components/BookItems';
import axios from 'axios';


function Livros() {
  const [books, setBooks] = useState([]);
  const { user, isLoading } = useUser();

  function search(e) {
    e.preventDefault()
    let req = `https://www.googleapis.com/books/v1/volumes?q=${document.getElementById('search').value}}`
    axios.get(req)
    .then(response => {
      // console.log(response.data)
      setBooks(response.data.items)
    })
  }
  
  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <>
          <Row className="align-items-center profile-header mb-5 text-center text-md-left">
            <Col md>
              <h2 data-testid="profile-name">Livros</h2>
            </Col>
          </Row>
          <Row className="align-items-center profile-header mb-5 text-center text-md-left">
            <Col>
            {/* Esse form vai fazer um requisição pra api do google */}
              <Form onSubmit={search} >
                <FormGroup className='d-flex'>
                  <Input type="text" name="search" id="search" placeholder="Type for title, authors..." />
                  <Button type='submit' className='ml-2' onClick={search} >Search</Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <div id='result'>
                <BookItems bookData={books} />
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default withPageAuthRequired(Livros, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});