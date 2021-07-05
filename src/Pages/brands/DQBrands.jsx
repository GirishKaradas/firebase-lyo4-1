import { Dialog, Paper, TableCell, TableContainer, TableHead, TableRow, Typography,Toolbar, DialogContent, DialogActions, Button, TextField, Select } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { db } from "../../firebase";
import { firebaseLooper } from "../../utils/tools";
import BrandView from "./brandsComp/BrandView";



function DQBrands({match}) {
	const [contents, setContents] = useState([])
	const [contents1, setContents1] = useState([])
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [type, setType] = useState(0)

	useEffect(() => {
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('configuration')
		.collection('brands')
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
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('configuration')
		.collection('brands').add({title,desc,index})
	}
	return (
		<>
		<div style={{color: '#43425D'}}>
			
			<br />
			<Typography align='center' variant='h1' gutterBottom><b>STANDARD BRANDS USED IN THE SYSTEM</b></Typography>
			<Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
				<Button onClick={handleOpen} style={{background: 'orange', color: 'white'}}>Add Items</Button>
			</Toolbar>

			<TableContainer component={Paper}>
		<Table  aria-label="simple table">
			<TableHead>
			<TableRow>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}><b className='text-lg font-bold italic'>Product</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-lg font-bold italic'>Make</b></TableCell>
			
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right"><b className='text-lg font-bold italic'>Actions</b></TableCell>
			</TableRow>
			</TableHead>
					{
						contents.map(module => (
				
							<>
							<BrandView module={module} match={match} key={module.id}/>	
			
					</>
						))
					}
					
		</Table>
		</TableContainer>
		<Dialog open={open} onClose={handleClose} fullWidth>
	<Typography variant='h3' align='center' gutterBottom><b>Add new items</b></Typography>
	<DialogContent>
		<TextField style={{marginBottom: '3%'}} variant='outlined' label='Title' fullWidth onChange={(e) => setTitle(e.target.value)}/>
		{/* <Select style={{marginBottom: '3%'}} variant='outlined'  fullWidth onChange={(e) => setType(e.target.value)}>
			<option className='capitalize' value={0}>Documentation</option>
			<option value={1}>ACCESSORIES</option>
		</Select> */}
		<TextField multiLine rows={7} variant='outlined' label='Make' fullWidth onChange={(e) => setDesc(e.target.value)}/>	
	</DialogContent>
	<DialogActions>
		<Button color='secondary' onClick={handleClose} variant='contained'>Cancel</Button>
		<Button disabled={title === '' || desc===''} onClick={handleSubmit} style={{background: 'orange', color: 'white'}}>Add New</Button>
	</DialogActions>
</Dialog>
		</div>
		
		</>
	)
}

export default DQBrands
