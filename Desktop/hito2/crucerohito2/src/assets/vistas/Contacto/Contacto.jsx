import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './contacto.css'

export const Contacto = () => {
  return (
    <div>
      
    <h1 className='titulo'>Contactanos!!</h1>
    
    <Form className='formulariocontacto' >     
     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Ingresa tu nombre"/>
      </Form.Group>
      <Form.Group className="mb-3"  controlId="exampleForm.ControlInput2">
        <Form.Label>Apellido</Form.Label>
        <Form.Control type="text" placeholder="Ingresa tu apellido" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com"/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Dejanos tus comentarios y dudas</Form.Label>
        <Form.Control as="textarea" rows={5} placeholder="Dejanos tus comentarios y dudas"/>
      </Form.Group>
    <Button style={{ backgroundColor: '#0DBCAD', border: '2px solid #0DBCAD' }} type="submit">
      Enviar
    </Button>
  </Form>
  </div>
  )
}

export default Contacto
