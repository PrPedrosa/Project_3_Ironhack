import {useState} from 'react'
import Card from 'react-bootstrap/Card';

function Fish(props) {
    const [showDetails, setShowDetails] = useState(false)
    const {fish} = props

    const toggleDetails = () => setShowDetails(!showDetails)

    /* <div>
    <p>{fish.commonName}</p>
    <img src={fish.image} alt={fish.commonName} style={{height: "7vh"}}/>
    {showDetails && <p>{fish.scientificName}</p>}
    <button onClick={toggleDetails}>{showDetails? "Esconder detalhes" : "Ver detalhes"}</button>
    </div> */
  return (
    <Card style={{ width: '80vw' }}>
      <Card.Img variant="top" src={fish.image} />
      <Card.Body>
        <Card.Title>{fish.commonName}</Card.Title>
        {showDetails && <div>
            <Card.Text><em style={{fontWeight: "700"}}>{fish.scientificName}</em></Card.Text>
            {fish.minCatchSize && <Card.Text><b>Tamanho mínimo de captura: </b><br />{fish.minCatchSize}cm</Card.Text>}
            {fish.minCatchWeight && <Card.Text><b>Peso mínimo de captura: </b><br />{fish.minCatchWeight}Kg</Card.Text>}
            <Card.Text>Existem <b>{fish.totalAmountCatched}</b> registos de capturas desta espécie</Card.Text>
            <Card.Text><b>Categoria de Ameaça: </b><br />{fish.threatCategory}</Card.Text>
            <Card.Text><b>Habitat: </b><br />{fish.habitat}</Card.Text>
            <Card.Text><b>Distribuição:</b><br /> {fish.areaFound}</Card.Text>
            <Card.Text><b>Descrição:</b> <br />{fish.description}</Card.Text>
            <Card.Text><b>Tamanho Máximo:</b><br /> {fish.maxLength}cm</Card.Text>
        </div>
        }
        <button  onClick={toggleDetails} className={showDetails? "small-buttons switch" : "small-buttons"}>{showDetails? "Esconder detalhes" : "Ver detalhes"}</button>
      </Card.Body>
    </Card>
  )
}

export default Fish