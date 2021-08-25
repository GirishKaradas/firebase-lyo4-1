import { DialogContent, Fab, makeStyles } from "@material-ui/core";
import { Button, Dialog, Typography, TextField, DialogActions, Card } from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import DQLayout from "../../components/DQNewSidebar/DQLayout";
import { db } from "../../firebase"
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
  NavLink
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {
   backgroundColor: 'whitesmoke',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',

  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
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

function DQPurpose({match}) {
	const [purpose, setPurpose] = useState({})
	const [title, setTitle] = useState('')
	const [ desc, setDesc] = useState('')
	const [open, setOpen] = useState(false)
	const [opendelete, setOpenDelete] = useState(false)
	const classes = useStyles()

	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	function handleOpenDel(){
		setOpenDelete(true)
	}
	function handleCloseDel(){
		setOpenDelete(false)
	}

	function handleUpdate(e){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('purpose')
		.update({title, desc})
	}

	function handleSubmit(){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('purpose')
		.set({title, desc})
	}
	useEffect(() => {
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('purpose')
		.onSnapshot(snapshot => {
			const data = snapshot.data()
			setPurpose(data)
			if(data){
				setTitle(data.title)
			setDesc(data.desc)
			}
			
		})
	}, [])
	return (
		<>
		{purpose ?
			(<>
			<DQLayout match={match}/>
		 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
           <div >
			   <div >
				   
				      <Typography variant='h1' align='center' gutterBottom><b>{purpose.title}</b></Typography>
					    
				   	   </div>
		
			 
		
			

			<hr />
			<Typography variant='body1' align='left' gutterBottom><p className='italic'>{purpose.desc}</p></Typography>
			<hr />
			<div style={{display: 'flex', marginBottom: 'auto', paddingRight: '3%', justifyContent: 'flex-end'}}>
				<Button style={{color: 'white', background: 'orange'}} onClick={handleOpen}>Edit</Button>
			
				
			</div>
			<Dialog style={{alignItems: 'center'}} fullWidth open={open} onClose={handleClose}>
				<DialogContent>
					<Typography variant='h4' align='center' gutterBottom><b>Edit Details</b></Typography>
					<form  >
					<TextField style={{marginBottom: '3%'}} value={title} variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>
				<TextField multiline rows={7} value={desc} variant='outlined' fullWidth onChange={(e) => setDesc(e.target.value)}/>
				</form>
				</DialogContent>
				
			
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleUpdate} style={{backgroundColor: 'orange', color: 'whitesmoke'}}>Update</Button>
			</DialogActions>
			</Dialog>
			<div className={classes.fab}>
				<Fab component={NavLink} to={`/DQ/${match.params.id}/Approval`} style={{marginRight: '20px'}}  color="primary" aria-label="add">
  <KeyboardArrowLeftIcon/>
</Fab>

			<Fab component={NavLink} to={`/DQ/${match.params.id}/General-Information`}  color="primary" aria-label="add">
  <KeyboardArrowRightIcon/>
</Fab>
			</div>
			
		</div>
          </Card>
        </div>
      </div>
      </>)
		

		: 
		<>
		<DQLayout match={match}/>
		<div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
        
	  <div style={{padding: '10%', paddingTop: '0'}} >
		   <Typography variant='h1' align='center' gutterBottom><b>Add New Purpose</b></Typography>	
		<TextField style={{marginBottom: '20px'}} label='Title' variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>
		<TextField style={{marginBottom: '5%'}} label='Description' multiLine rows={7}  variant='outlined' fullWidth onChange={(e) => setDesc(e.target.value)}/>  
		<Button disabled={title === '' || desc === '' || desc>300 || title> 35} fullWidth style={{background: 'orange', color: 'white'}} onClick={handleSubmit}>Add New</Button>
	  </div>
          </Card>
        </div>
      </div>
	  
      </>
      }
		</>
	)
}

export default DQPurpose
