import { Dialog, Paper, TableCell, TableContainer, TableHead, TableRow, Typography,Toolbar, DialogContent, DialogActions, Button, TextField, Select } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { db } from "../../firebase";
import { firebaseLooper } from "../../utils/tools";
import ServiceView from "./ServiceComp/ServiceView";




function Services({match}) {
	const [contents, setContents] = useState([])
	const [contents1, setContents1] = useState([])
	const [open, setOpen] = useState(false)
	const [req, setReq] = useState('')
	const [inst, setInst] = useState('')
	const [connection, setConnection] = useState('')
	const [desc, setDesc] = useState('')
	const [type, setType] = useState(0)

	useEffect(() => {
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('configuration')
		.collection('services')
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
		.collection('services').add({connection,desc,index,req,inst})
	}
	return (
		<>
		<div style={{color: '#43425D'}}>
			
			<br />
			<Typography align='center' variant='h1' gutterBottom><b>LIST OF SERVICES REQUIRED FROM CUSTOMER END</b></Typography>
			<Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
				<Button onClick={handleOpen} style={{background: 'orange', color: 'white'}}>Add Items</Button>
			</Toolbar>

			<TableContainer component={Paper}>
		<Table  aria-label="simple table">
			<TableHead style={{background: '#EDF6E5'}}>
			<TableRow>
			<TableCell><b className='text-lg font-bold italic'></b></TableCell>
			<TableCell align="right"><b className='text-lg font-bold italic'>Specifications</b></TableCell>
			<TableCell><b className='text-lg font-bold italic'></b></TableCell>
			<TableCell align="right"><b className='text-lg font-bold italic'>To be provided by Customer</b></TableCell>
			<TableCell><b className='text-lg font-bold italic'></b></TableCell>
			<TableCell><b className='text-lg font-bold italic'></b></TableCell>
			</TableRow>
			</TableHead>
			<TableHead>
			<TableRow>
				<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}><b className='text-lg font-bold italic'>Description</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-lg font-bold italic'>Required Parameters</b></TableCell>
			
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-lg font-bold italic'>Instrument/Gauges</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-lg font-bold italic'>Preferred Pipe & Connection</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right"><b className='text-lg font-bold italic'>Options</b></TableCell>
			</TableRow>
			</TableHead>
					{
						contents.map(module => (
				
							<>
							<ServiceView module={module} match={match} key={module.id}/>	
			
					</>
						))
					}
					
		</Table>
		</TableContainer>
		<Dialog open={open} onClose={handleClose} fullWidth>
	<Typography variant='h3' align='center' gutterBottom><b>Add new items</b></Typography>
	<DialogContent>
	
		{/* <Select style={{marginBottom: '3%'}} variant='outlined'  fullWidth onChange={(e) => setType(e.target.value)}>
			<option className='capitalize' value={0}>Documentation</option>
			<option value={1}>ACCESSORIES</option>
		</Select> */}
		<TextField style={{marginBottom: '30px'}} multiLine rows={5} variant='outlined' label='Description' fullWidth onChange={(e) => setDesc(e.target.value)}/>
		<TextField style={{marginBottom: '30px'}} multiLine rows={5} variant='outlined' label='Requirement' fullWidth onChange={(e) => setReq(e.target.value)}/>
		<TextField style={{marginBottom: '30px'}} multiLine rows={5} variant='outlined' label='Instrument / gauges' fullWidth onChange={(e) => setInst(e.target.value)}/>
			
		<TextField style={{marginBottom: '30px'}} multiLine rows={5} variant='outlined' label='Preferred Pipe & Connection' fullWidth onChange={(e) => setConnection(e.target.value)}/>		
	
	</DialogContent>
	<DialogActions>
		<Button color='secondary' onClick={handleClose} variant='contained'>Cancel</Button>
		<Button disabled={inst === '' || desc==='' || connection === ''|| req ===''} onClick={handleSubmit} style={{background: 'orange', color: 'white'}}>Add New</Button>
	</DialogActions>
</Dialog>
		</div>
		
		</>
	)
}

export default Services
