import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import loadingGif from "../images/loading-gif.gif"

function AddTrashForm() {
    const [location, setLocation] = useState("")
    const [trashType, setTrashType] = useState("")
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false);

    const handleLocation = (e) => setLocation(e.target.value)
    const handleTrashType = (e) => setTrashType(e.target.value)
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
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/trash`, {location, trashType, image})

            setImage("")
            setLocation("")
            setTrashType("")

            navigate("/")
        } catch (error) {
            console.log(error)
        }

    }
  return (
    <div className='form-box form-div' style={{height: "100vh"}}>
      <h1>Reportar Lixo</h1>
      <form onSubmit={handleSubmit} className='form-box form-form'>
        <label htmlFor="location">Localização*</label>
        <input type="text" name='location' id='location' onChange={handleLocation}/>

        <label htmlFor="trashType">Tipo de lixo*</label>
        <input type="text" name='trashType' id='trashType' onChange={handleTrashType}/>

        <label htmlFor="image" className='form-box'>
        <p>Imagem</p>
        {image ? 
        <>
          <img src={image} alt="current"/>
          <p className='small-buttons'>Alterar foto</p>
        </>
        : <i className="fa fa-3x fa-camera"><p>Adicionar Imagem</p></i>}
        <input type="file" name='image' id='image' onChange={handleUpload} className="image-input"/>
        </label>
        

        {!loading ? <button type="submit" className='buttons'>Reportar</button> : <img src={loadingGif} alt="loading" className='loading-gif'/>}{/*spinner instead of p? */}
      </form>
      <p>Campos marcados com * são obrigatórios</p>
    </div>
  )
}

export default AddTrashForm