import React from 'react';
import {  Card,
          CardBody,
          CardFooter,
          CardHeader,
          Modal, 
          ModalHeader, 
          ModalBody, 
          ModalFooter,
          Button
         } from 'reactstrap';

const BookItems = ({ bookData }) => {

  const [modal, setModal] = React.useState(false);
  let toggle = () => setModal(!modal);

  function openModal(e) {
    console.log(e.target.id)
    bookData.map((book, index) => {
      if (book.id === e.target.id) {
        toggle()
        console.log(modal)
      }
    })
  }

  if (bookData.length > 0) {
    console.log(bookData[0].volumeInfo)
  }

  return (
    <>
    {
    bookData.length > 0 &&
      bookData.map((book, index) => {
        if (!book.volumeInfo.imageLinks) {
          book.volumeInfo.imageLinks = { thumbnail: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0IDQ0IBwgIEA0HBwcHCA8ICQcKFREWFhURHx8YHSggGBolGxMfITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0OFQ8PFSsZFRkrLSstLTcrKystKzctKystKysrNy0tNzcrKystNysrKysrKysrKysrKysrKysrKysrK//AABEIARgAtAMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAAAQIGAwf/xAAjEAEBAAICAwACAwEBAAAAAAAAAQIRAzEycrEiYQRxoUEh/8QAGAEBAQEBAQAAAAAAAAAAAAAAAQAEBQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwD5tVoPSSvTh88PaMN8Pnj7T6Z0V0mPUVMeo1HQjMgCQAkio2UmkaZgQLUS0ASKQpiUaGkoSIo84nLUpSsLUV6cPnh7T68q9OHzw9p9U7BXSzqNbZx6i6dCM1AEoAJGmom1NAkVkJagJACISLFKKlUAZCq80uUpkpWBqSt8Pnh7Rmt8Hnh7QwV0uPUajOPUajoRmppGmUgBJNtvPT0hFGY0kCKjSVJAETZjUpiU2lWpQIgALltFilc9qSxvh88PaMV6cPnj/c+mCukx6jW2ceobdCMrW0BKACI1GdrshWYu0CXZazKpQACECUppKbSgAALlStUrntTL04PPD2n1ivTh88PaGCukx6hox6jWnQjMgCQAkio1opCqgSSKukSAEgKQoF0UJAHlY5cSlYWpW+Hzx9p9edb4fPD2inYK6XHqNRnHqNbdCM1QBCACKNxNLDRRmNMhLUXaJACJTE0shSpVSwBAo8lytXIpWBqSvThv54e0edenD54e0MFdLj1GtM49RqOhGaoLpEgBJdq89vSEUZaSBFiNJYkgCIsZtXGlNJaqUBAHkuWKaWxgakrfB54e0Y09OHzx/ufTBXSY9RqM49RduhGVpldoVAAFNNxlogZjTITSU2hQAClXEWFLUqpQEABctstTX7/ws/f+Oe1La3w388PaPPX7/wAb4J+eHtP+fswV02PUS1ceoadCMqgIgCSNbQKNpVAklU0JACQSgUu0AIAeU5cKVhahvh88fafWK3w+eHtPqnRXSY9RrTOPUajoRmqAJQASRrTLcNVRI0kCLEWogAIlIUxKUq1KAgDyXLUqUyYGpa3weeHtHnW+Hzw9oZ0V02PUXaY9RrToRmqAJACS6VNqQMtMhAtRIARJF0iwpQSgJVQeS5alCsDUlenD54e0YrfB54e0MFdLj1Gozj1Go6EZRGmSYABM7ekY03DRRIrMCaSqlOJAAUq41KuJTVSrUoEQAFy5U2Wue1K3w+eP9z689t8F/PD2hgrpceoqY9RK6EZWgglABEaYUrGmRKAozGkgBEWIQppKgAAA65MIOe1D0/j+eHtj9ecen8fzx9sfqgrp51FTHqK6MZQBEASrWmWtsoACVAEgBFZCwlLUEARAHipyWJ/1KZMLUsb/AI3nj7R51vh88PbEwV1WHUSnH1FdCMqxFEYIrJSgqqQqgTMaoIJFomSIJGoUiwHmoBHlOTpkzVrC1FenD54e0+vK9PTh88PbH6YK6nj6jSYdRqOhGWoNMlQABGmG4QMtMwIGkpxIACLEIU0lWpRQgDzhcjmZdFKwNRl03xeeHtPrFb4fPH2x+mB1PH1G4xh1GtuhGVdoIrTFASa0JuGyFZi7QJdlTZTqBFBWKzKuyFSmyhM0KAuStLVHPakt/wDHpw388PafUFBXU4dQqDoxma2bBRGwEWWtglgUBAkXYFGwCUpASUB5FLQHi04//9k=' }
        }
        return (
          <Card key={index} className='mb-3' data-bs-theme="dark">
            <CardHeader>
              <h5 id={book.id} onClick={openModal} >{book.volumeInfo.title}</h5>
            </CardHeader>
            <CardBody className='d-flex '>
              <img className='align-self-start' src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
              <p className='ml-4 align-self-start'>{book.volumeInfo.description}</p>
            </CardBody>
            <CardFooter>
              <p>{book.volumeInfo.authors}</p>
            </CardFooter>
          </Card>
        )
      })  
    }
    <Modal isOpen={modal} className='modal-dialog modal-dialog-centered'>
      <ModalHeader>Modal title</ModalHeader>
      <ModalBody>
        <p>Modal body text goes here.</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Do Something</Button>
        <Button color="danger" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>

  </>
  );
};

export default BookItems;
