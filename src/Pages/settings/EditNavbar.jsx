import { Container, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { useSettingsStorage } from '../../utils/useSettingsStorage'

const EditNavbar = () => {

    const [navbar, setNavbar] = useState([])
    const [name, setName] = useState(navbar.name)
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    
    const [disabled, setDisabled] = useState(true)
      const types = ["image/png", "image/jpeg", "image/jpg"];
    const doc = "navbar"
    useEffect(() => {
       db.collection('company').doc('navbar').onSnapshot(snapshot => {
        const data = snapshot.data()
        setName(data.name)
        setNavbar(data)
       })
    }, [])
    const updateNavbar = (doc) => {
        if(url){
              db.collection("company").doc('navbar').update({name,url})
        }
             db.collection("company").doc('navbar').update({name})
        
      
    }

      const handleChange = (e) => {
        let selectedFile = e.target.files[0];
        setDisabled(false)
        if (selectedFile) {
            if (types.includes(selectedFile.type)) {
                setError(null);
                setFile(selectedFile);
            } else {
                setFile(null);
                setError("Please select an image file (png or jpg)");
            }
        }
       
        
    }
    const {progress, url} = useSettingsStorage(file)
    return (
        <Container>
            <div class="flex  bg-white-200 items-center justify-center  mt-7 mb-7">
  <div class="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
   

    <div class="flex justify-center">
      <div class="flex">
        <h1 class="text-gray-600 font-bold md:text-2xl text-xl">Change Navbar</h1>
        {error && <b style={{color: 'red'}}>{error}</b>}
      </div>
    </div>

   

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
     
      <div class="grid grid-cols-1">
        <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Company Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} class="py-2 px-3 rounded-lg border-2 border-yellow-800 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent" type="text" placeholder="Company Name" />
      </div>
      <div class="grid grid-cols-1">
        <label class="uppercase md:text-sm text-xs text-black-500 text-light font-semibold">Company Logo
        
        </label>
         <input onChange={handleChange}  type='file' />
      </div>
      
    </div>
        <Typography align='center'><b>{progress}% uploaded</b></Typography>

   
    <div class='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
      
      <button  onClick={(e) => updateNavbar(doc)} class='w-auto bg-yellow-800 hover:bg-yellow-900 rounded-lg shadow-xl font-medium text-white px-4 py-2'>Update</button>
    </div>

  </div>
</div>
        </Container>
    )
}

export default EditNavbar
