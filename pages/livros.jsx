import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { Row, Col, FormGroup, Input, Button } from 'reactstrap';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Highlight from '../components/Highlight';


function Livros() {
    const { user, isLoading } = useUser();

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
                    <FormGroup className='d-flex gap-2'>
                        <Input type="text" name="search" id="search" placeholder="Type for title, authors..." />
                        <Button>Search</Button>
                    </FormGroup>
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