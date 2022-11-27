import {useState} from 'react'
import Button from 'react-bootstrap/Button';
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
            <Card.Text>{fish.scientificName}</Card.Text>
            {fish.minCatchSize ? <Card.Text>Tamanho mínimo de captura: {fish.minCatchSize}cm</Card.Text> : <Card.Text>Peso mínimo de captura: {fish.minCatchWeight}Kg</Card.Text>}
            <Card.Text>Tamanho Máximo: {fish.maxLength}cm</Card.Text>
            <Card.Text>Pescado {fish.totalAmountCatched} vezes</Card.Text>
            <Card.Text>Categoria de Ameaça: {fish.threatCategory}</Card.Text>
            <Card.Text>Habitat: {fish.habitat}</Card.Text>
            <Card.Text>Distribuição: {fish.areaFound}</Card.Text>
            <Card.Text>Descrição: {fish.description}</Card.Text>
        </div>
        }
        <Button variant="primary" onClick={toggleDetails}>{showDetails? "Esconder detalhes" : "Ver detalhes"}</Button>
      </Card.Body>
    </Card>
  )
}

export default Fish