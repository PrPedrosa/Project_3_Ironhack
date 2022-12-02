import {useState, useContext} from 'react'
import axios from "axios"
import {AuthContext} from '../contexts/auth.context';
import {useNavigate} from "react-router-dom";
import loadingGif from "../images/loading-gif.gif"

function AddFishForm() {
    const {user} = useContext(AuthContext)
    const storedToken = localStorage.getItem("authToken")

    const [commonName, setCommonName] = useState("")
    const [image, setImage] = useState("")
    const [areaFound, setAreaFound] = useState("")
    const [weight, setWeight] = useState(0)
    const [length, setLength] = useState(0)
    const [loading, setLoading] = useState(false);

    const handleCommonName = (e) => setCommonName(e.target.value)
    const handleAreaFound = (e) => setAreaFound(e.target.value)
    const handleWeight = (e) => setWeight(+(e.target.value))
    const handleLength = (e) => setLength(+(e.target.value))
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
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const newFish = await axios.post(`${process.env.REACT_APP_API_URL}/userfishes`,
            {
              commonName, image, areaFound, weight, length, userId: user._id
            },
            {
              headers: { Authorization: `Bearer ${storedToken}` },
            })
            
            setCommonName("")
            setImage("")
            setWeight(0)
            setAreaFound("")
            setLength(0)
            
            navigate("/profile")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='form-box form-div'>
      <h1>Adicionar Troféu</h1>
      <form onSubmit={handleSubmit} className='form-box form-form'>
        <label htmlFor="commonName">Espécie*</label>
        <input type="text" name='commonName' id='commonName' value={commonName} onChange={handleCommonName} required/>

        <label htmlFor="areaFound">Localização*</label>
        <input type="text" name='areaFound' id='areaFound' value={areaFound} onChange={handleAreaFound} required/>

        <label htmlFor="weight">Peso (em kg)*</label>
        <input type="number" name='weight' id='weight' value={weight} step="0.01" min="0" max="1000" placeholder='1.5' onChange={handleWeight} required/>

        <label htmlFor="length">Tamanho (em cm)*</label>
        <input type="number" name='length' id='length' value={length} onChange={handleLength} required/>

        <label htmlFor="image" className='form-box'>
        <p>Imagem*</p>
        {image ? 
        <>
          <img src={image} alt="current"/>
          <p className='small-buttons'>Alterar Imagem</p>
        </>
        : <i className="fa fa-3x fa-camera"><p>Adicionar Imagem</p></i>}
        <input type="file" name='image' id='image' onChange={handleUpload} className="image-input" required/>
        </label>
  
        {!loading ? <button type="submit" className='buttons'>Criar Troféu</button> : <img src={loadingGif} alt="loading" className='loading-gif'/>}
      </form>
      <em>Campos marcados com * são obrigatórios</em>
    </div>
  )
}

export default AddFishForm