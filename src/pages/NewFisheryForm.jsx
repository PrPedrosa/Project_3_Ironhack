import {useState, useEffect, useContext} from 'react'
import axios from "axios"
import {AuthContext} from '../contexts/auth.context';
import {useNavigate} from "react-router-dom"

function NewFisheryForm() {
    const {user} = useContext(AuthContext)
    const storedToken = localStorage.getItem("authToken")

    const [allFishes, setAllFishes] = useState(null)
    const [date, setDate] = useState("")
    const [location, setLocation] = useState("")
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [overallWeight, setOverallWeight] = useState(0)
    const [fishingType, setFishingType] = useState("")
    const [fishesCaught, setFishesCaught] = useState([])
    const [fishCaught, setFishCaught] = useState("")
    const [weight, setWeight] = useState(0)
    const [length, setLength] = useState(0)

    const handleDate = (e) => setDate(e.target.value);
    const handleLocation = (e) => setLocation(e.target.value);
    const handleOverallWeight = (e) => setOverallWeight(+(e.target.value));
    const handleFishingType = (e) => setFishingType(e.target.value);
    const handleFishCaught = (e) => setFishCaught(e.target.value)
    const handleWeight = (e) => setWeight(+(e.target.value))
    const handleLength = (e) => setLength(+(e.target.value))

    //handle image

    const handleUpload = async (e) => {
        try {
          setLoading(true);
    
          //formData === enctype=multipart/formdata
          const uploadData = new FormData();
    
          //add the file to the formData
          uploadData.append('image', e.target.files[0]);
    
          //send the file to our api
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, uploadData);
    
          console.log(response.data.fileUrl);
          setImage(response.data.fileUrl);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
    };

    //creates a fish object to accomodate fishery model in backend and pushes it to fishes caught state

    const handleFishesCaught = () => {
        const aCatch = {
            species: fishCaught,
            weight: weight,
            length: length
        }
        setFishesCaught((prev) => [...prev, aCatch])
        console.log(fishesCaught)
    }

    //delete a fish object

    const deleteFishCaught = (index) => {
        const filteredFishes = fishesCaught.filter(fish => fishesCaught.indexOf(fish) !== index)
        setFishesCaught(filteredFishes)
    }

    //get fishes from backend

    const getFishes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/fishes`)
            setAllFishes(response.data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {getFishes()}, [])

    //TODO handlesubmit to the backend
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const newFishery = await axios.post(`${process.env.REACT_APP_API_URL}/fisheries`, {date, location, overallWeight, fishingType, fishes: fishesCaught, image, userId: user._id}, {
                headers: { Authorization: `Bearer ${storedToken}` },
              })
            console.log(newFishery)
            
            setDate("")
            setLocation("")
            setOverallWeight(0)
            setFishingType("")
            setFishesCaught([])
            setFishCaught("")
            setWeight(0)
            setLength(0)
            
            navigate("/profile")
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <div>
        <h1>Nova Pesca</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="date">Data: </label>
            <input type="date" name="date" id="date" value={date} onChange={handleDate} required/>

            <label htmlFor="location">Localização: </label>
            <select name="location" id="location" onChange={handleLocation} value={location ? location : setLocation("Em frente a praia da Parede")}>
                <option value="Em frente a praia da Parede">Em frente à praia da Parede</option>
                <option value="Em frente a praia das Avencas">Em frente à praia das Avencas</option>
                <option value="Em frente a praia de Sao Pedro">Em frente à praia de São Pedro</option>
                <option value="Em frente a praia da Bafureira">Em frente à praia da Bafureira</option>
            </select>

            <label htmlFor="fishingType">Modalidade:</label>
            <select name="fishingType" id="fishingType" onChange={handleFishingType} value={fishingType? fishingType : setFishingType("Caça submarina")}>
                <option value="Caça submarina">Caça submarina</option>
                <option value="Pesca com linha">Pesca com linha</option>
            </select>

            <label htmlFor="image">Foto:</label>
            {image && <img src={image} alt="current"/>}
            <input type="file" name="image" onChange={handleUpload} />

            <label htmlFor="overallWeight">Peso Total (em Kg): </label>
            <input type="number" step="0.01" min="0" max="1000" placeholder='1.5' value={overallWeight} onChange={handleOverallWeight}/>

            <label htmlFor="fishes">Peixe:</label>
            <select name="fishes" id="fishes" onClick={handleFishCaught}>
                {allFishes && allFishes.map(fish =>{
                    return (
                        <option value={fish.commonName} key={fish._id}>{fish.commonName}</option>
                    )
                })}
            </select>
            <label htmlFor="length">Tamanho (em cm): </label>
            <input type="number" name="length" id="length" onChange={handleLength}/>

            <label htmlFor="weight">Peso (em kg): </label>
            <input type="number" name="weight" id="weight" step="0.01" min="0" max="1000" placeholder='1.5' onChange={handleWeight}/>
            <span onClick={handleFishesCaught}>adicionar</span>

            {/* loop over fishescaught array to show to user and let him delete */}
            <div>
            {fishesCaught.map(fish => {
                return (
                    <div key={fish._id}>
                        <p>{fish.species}</p>
                        <span>{fish.length} </span>
                        <span> {fish.weight}</span>
                        <button onClick={() => {deleteFishCaught(fishesCaught.indexOf(fish))}}>delete</button>
                    </div>
                )
            })}      
            </div>

            {!loading ? <button type="submit">Submeter</button> : <p>A carregar imagem...</p>}
        </form>
    </div>
  )
}

export default NewFisheryForm