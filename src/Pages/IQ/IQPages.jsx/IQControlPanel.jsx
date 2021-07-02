import { Dialog, Paper, TableCell, TableContainer, TableHead, TableRow, Typography,Toolbar, DialogContent, DialogActions, Button, TextField } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { db } from "../../../firebase";
import { firebaseLooper } from "../../../utils/tools";
import ControlView from "../IQComponents/ControlView";
import DrawView from "../IQComponents/DrawView";
import IQConfigView from "../IQComponents/IQConfigView";
import IQHeader from "../IQComponents/IQHeader";

function IQControlPanel({match}) {
	const [contents, setContents] = useState([])
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [dno, setDno] = useState('')

	useEffect(() => {
		db.collection('IQ').doc(match.params.id)
		.collection('content').doc('control')
		.collection('tables')
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			data.sort(function(a,b){
				return (a.index - b.index)
			})
			setContents(data)
		})
	}, [])
	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	
	function handleSubmit(){
		const index = contents.length
		db.collection('IQ').doc(match.params.id)
		.collection('content').doc('control')
		.collection('tables').add({title,desc,index})
	}
	return (
		<div>
			<IQHeader match={match}/>
			<Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
				<Button onClick={handleOpen} style={{background: 'orange', color: 'white'}}>Add Items</Button>
			</Toolbar>

			<TableContainer component={Paper}>
		<Table  aria-label="simple table">
			<TableHead>
			<TableRow>
			<TableCell><b className='text-lg font-bold italic'>Title</b></TableCell>
			<TableCell align="left"><b className='text-lg font-bold italic'>Description</b></TableCell>
			
			<TableCell align="right"><b className='text-lg font-bold italic'>Actions</b></TableCell>
			</TableRow>
			</TableHead>
					{
						contents.map(module => (
				
							<>
							<ControlView module={module} match={match} key={module.id}/>	
			
					</>
						))
					}
					
		</Table>
		</TableContainer>
		<Dialog open={open} onClose={handleClose} fullWidth>
	<Typography variant='h3' align='center' gutterBottom><b>Add new items</b></Typography>
	<DialogContent>
		<TextField style={{marginBottom: '3%'}} variant='outlined' label='Title' fullWidth onChange={(e) => setTitle(e.target.value)}/>
		
		<TextField multiLine rows={7} variant='outlined' label='Description' fullWidth onChange={(e) => setDesc(e.target.value)}/>	
	</DialogContent>
	<DialogActions>
		<Button color='secondary' onClick={handleClose} variant='contained'>Cancel</Button>
		<Button disabled={title === '' || desc===''} onClick={handleSubmit} style={{background: 'orange', color: 'white'}}>Add to Index</Button>
	</DialogActions>
</Dialog>
		</div>
	)
}

export default IQControlPanel
