import { Button, FormHelperText, Switch} from "@material-ui/core";
import { useState } from "react";
import { db } from "../../firebase";
import { useStorage } from "../../utils/useStorage";

function AddApk() {
    const [apk, setApk] = useState(false)
    const [file,setFile] = useState(null)
    const [version, setVersion] = useState("")

    const handleChange = (e) => {
        let selectedFile = e.target.files[0];
        setFile(selectedFile)
    }

    const {url, progress} = useStorage(file)

    function updateMobile(){

        db.collection("apks").doc('mobile').update({url,version})
    }

    function updateGlass(){

        db.collection("apks").doc('glass').update({url,version})
    }

    return (
        <>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px', marginTop: '20px'}}>
            <input style={{ border: '2px solid'}}  placeholder="Enter version" type="Text" onChange={(e) => setVersion(e.target.value)} />
        </div>
         
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
            <Switch onChange={(e) => {setApk(!apk); setFile(null)}}/>
           
            {
                !apk &&
                <div>
                    <input onChange={handleChange} type="file"/>
                 <FormHelperText>Mobile Apk Here</FormHelperText>
                </div>
                 
            }
           {
               apk && 
               <div>
                   <input onChange={handleChange} type="file"/>
                   <FormHelperText>Glass Apk Here</FormHelperText>
               </div>
                
           }
            <br />
           
            <br />
          {!apk?  <Button onClick={updateMobile} disabled={progress < 100 || file === null} >Update Mobile Apk</Button> : <Button onClick={updateGlass} disabled={progress < 100 || file=== null }>Update Glass Apk</Button>}
          
        </div>
        </>
    )
}

export default AddApk
