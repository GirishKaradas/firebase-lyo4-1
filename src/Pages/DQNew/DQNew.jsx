import { Button, Card, Toolbar, Dialog, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react"
import ContentDashboardLayout from "../../components/ContentSidebar/ContentDashboardLayout";
import {db} from '../../firebase'
import {firebaseLooper} from '../../utils/tools'
import AddMaterial from "./DQComponents/AddMaterial";
import DQNewView from "./DQComponents/DQNewView";

const useStyles = makeStyles((theme) => ({
  layoutRoot: {
    backgroundColor: 'white',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
     background:'linear-gradient(#f3f3f3, #e7e7e7)' 
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#141256',
  },
 wrapper: {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256
  },
  
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {
      padding: '20px',
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
    table: {
    minWidth: 500,
  },
}));

function DQNew({match}) {
	const [reports, setReports] = useState([])
	const [open, setOpen] = useState(false)
	const classes = useStyles()

	useEffect(() => {
		db.collection('DQNew').where('mid', '==', `${match.params.id}`).onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			setReports(data)
		})
	}, [])

	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}
	return (
		<>
		<ContentDashboardLayout match={match}/>
		  <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
            <div style={{paddingLeft: '16%', paddingTop: '3%', display: 'flex', justifyContent: 'space-between', paddingRight: '15%'}}>
              <div>
                <Typography variant='h2' align='left'>DQ Master Copy </Typography>
               <Typography variant='body1' align='left'>Master Copy of all the DQ reports</Typography>
              </div>
               
               <Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
			<Button onClick={handleOpen} style={{backgroundColor:'orange', color: 'white', width: '150px' }}>Add New</Button>
		  </Toolbar>
            </div>
           
		 
           
    <div>
            <div className="container mx-auto  py-10">
                <div className="shadow bg-white dark:bg-gray-800  rounded">
                
                {
				reports.map(data => (
					<>
					<DQNewView key={data.id} report={data}/>
					
					</>
				))
			}
                   
                      
                    </div>
                </div>
    </div>
		<Dialog onClose={handleClose} open={open} fullWidth>
			 <Toolbar style={{display: 'flex', justifyContent: 'flex-start'}}>
			<Button onClick={handleClose} style={{backgroundColor:'orange', color: 'white', width: '10%' }}>close</Button>
		  </Toolbar>
			<AddMaterial match={match}/>
		</Dialog>
          </Card>
        </div>
      </div>
      </>
		
	)
}

export default DQNew

