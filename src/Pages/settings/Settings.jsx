import { Button, Typography } from "@material-ui/core"
import { useEffect,  useState } from "react"
import { database, db } from "../../firebase"
import { firebaseLooperTwo } from "../../utils/tools"
import GetAppIcon from '@material-ui/icons/GetApp';
import EditNavbar from "./EditNavbar";
import EditVideoCall from "./EditVideoCall";
import Page from "../../components/Page";

const Settings = () => {
    const [versions, setVersions] = useState([])
   
    useEffect(()=> {
        database.ref('app_versions').get().then(snapshot => {
            const data = firebaseLooperTwo(snapshot)
            setVersions(data)
            console.log(data)
        })
    } ,[])
 

    return (
      <Page title='Settings | LyoIms'>
        <section class="text-gray-600 body-font">
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
             <Typography variant='h3' gutterBottom align='left'><b>Settings</b></Typography>
             <Typography variant='body1' gutterBottom align='right'>Web app Version : 1.0.4</Typography>
          </div>
         
          <hr />
          <EditNavbar/>
          <br />
          <EditVideoCall/>
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap -mx-4 -mb-10 text-center">
        {
            versions.map(data => (
                 <div class="sm:w-1/2 mb-10 px-4">
        <div class="rounded-lg h-64 overflow-hidden">
          <img alt="content" class="object-cover object-center h-full w-full" src={data.image}/>
        </div>
        <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">{data.title}</h2>
        <p class="leading-relaxed text-base">The application is currently at it's Version {data.version_id} </p>
        <Button style={{color: 'orange'}}  startIcon={<GetAppIcon/>}  href={data.url} >Download Now</Button>
      </div>
            ))
        }
     
      
    </div>
  </div>
</section>
      </Page>
        
    
    )
}

export default Settings
