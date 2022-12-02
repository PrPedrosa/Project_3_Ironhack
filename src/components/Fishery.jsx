import {useState} from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


function Fishery({fishery}) {
    const [showDetails, setShowDetails] = useState(false)
    const toggleDetails = () => setShowDetails(!showDetails)
    
  return (
    <Card>
      <Card.Img variant="top" src={fishery.image} />
      <Card.Body>
        <Card.Title>Data: {fishery.date}</Card.Title>
            <hr />
            <Card.Text><b>Localização: </b><br />{fishery.location}</Card.Text>
        {showDetails && <div>
            <Card.Text><b>Modalidade: </b><br />{fishery.fishingType}</Card.Text>
            <Card.Text><b>Peso Total: </b> {fishery.fishes.length !== 1? fishery.fishes.reduce((acc, val) => acc.weight + val.weight): fishery.fishes[0].weight} kg</Card.Text>
            <hr />
            {fishery.fishes.map(fish => {
                return(
                    <div className='fishery-card-fishes' key={fish._id}>
                        <h5>{fish.species}</h5>
                        <p>{fish.length} cm</p>
                        <p>{fish.weight} kg</p>
                    </div>
                )
            })}
        </div>
        }
        <div className='fishery-card-fishes'>
          <button className={showDetails? 'small-buttons switch': "small-buttons"} onClick={toggleDetails}>{showDetails? "Esconder detalhes" : "Ver detalhes"}</button>
          <button className='small-buttons edit-btn'><Link to={`/edit/fishery/${fishery._id}`} className="link-text">Editar</Link></button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Fishery