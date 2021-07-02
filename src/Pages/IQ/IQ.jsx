import { Dialog, Toolbar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button, DialogContent, DialogActions, TextField } from "@material-ui/core";
import { makeStyles, Card } from "@material-ui/core";
import { SettingsOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import ContentDashboardLayout from "../../components/ContentSidebar/ContentDashboardLayout";
import { db } from "../../firebase";
import { firebaseLooper } from "../../utils/tools";
import IQHeader from "./IQComponents/IQHeader";
import IQView from "./IQComponents/IQView";
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {
   backgroundColor: 'whitesmoke',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',

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
    paddingLeft: 250
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
}));


function IQ({match}) {
	const classes = useStyles()
	const [iq, setIq] = useState([])
	const [open, setOpen] = useState(false)
	const [name, setName] = useState('')
	const [ desc, setDesc] = useState('')
	const uid = uuidv4()
	const [mid, setMid] = useState(match.params.id)
	useEffect(() => {
		db.collection('IQ')
		.where('mid', '==', `${match.params.id}`)
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			setIq(data)
		})
	}, [])

	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	function handleSubmit(){
		db.collection('IQ').add({name,desc,mid}).then((data) => {
			const key = data.id
			db.collection('IQ').doc(data.id).update({key})
		})
	}

	return (
		<div>
			<ContentDashboardLayout match={match}/>
			 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
		  <Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
			  <Button onClick={handleOpen} style={{background: 'orange', color: 'whitesmoke'}}>Add IQ</Button>
		  </Toolbar>
           <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap -m-4">
      {
	      iq.map(data => (
		       <IQView match={match} data={data} key={data.id}/>
	      ))
      }
    
<Dialog open={open} onClose={handleClose} fullWidth>
	<Typography variant='h3' align='center'><b>Add new IQ</b></Typography>
	<DialogContent>
		<TextField variant='outlined' label='Title' fullWidth onChange={(e) => setName(e.target.value)}/>
		<TextField multiLine rows={7} variant='outlined' label='Description' fullWidth onChange={(e) => setDesc(e.target.value)}/>	
	</DialogContent>
	<DialogActions>
		<Button color='secondary' onClick={handleClose} variant='contained'>Cancel</Button>
		<Button disabled={name === '' || desc===''} onClick={handleSubmit} style={{background: 'orange', color: 'white'}}>Add IQ</Button>
	</DialogActions>
</Dialog>
     </div>
  </div>
</section>
          </Card>
        </div>
      </div>
			
		</div>
	)
}

export default IQ
