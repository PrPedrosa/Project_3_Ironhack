import {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


function Fishery({fishery}) {
    const [showDetails, setShowDetails] = useState(false)
    const toggleDetails = () => setShowDetails(!showDetails)

    

  return (
    <Card style={{ width: '80vw' }}>
      <Card.Img variant="top" src={fishery.image} />
      <Card.Body>
        <Card.Title>Pesca nº {fishery.number}</Card.Title>
            <Card.Text>Data: {fishery.date}</Card.Text>
            <Card.Text>Localização: {fishery.location}</Card.Text>
        {showDetails && <div>
            <Card.Text>Peso Total: {fishery.overallWeight} Kg</Card.Text>
            {fishery.fishes.map(fish => {
                return(
                    <Card.Text>
                        <h4>{fish.species}</h4>
                        <p>Quantidade: {fish.amount}</p>
                        <p>Peso: {fish.weight} Kg</p>
                    </Card.Text>
                )
            })}
        </div>
        }
        <Button variant="primary" onClick={toggleDetails}>{showDetails? "Esconder detalhes" : "Ver detalhes"}</Button>
        <Link to={`/edit/fishery/${fishery._id}`}>edit</Link>
      </Card.Body>
    </Card>
  )
}

export default Fishery