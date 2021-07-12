import { useEffect, useState } from "react"
import { db } from "../../../firebase"
import { firebaseLooper } from "../../../utils/tools"

import { DialogContent, makeStyles,  Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from "@material-ui/core";
import { Button, Dialog, Typography, TextField, DialogActions, Card } from "@material-ui/core"
import DQComponentsView from "./DQComponentsView";

function DQComponents({match, module_id,type,index}) {
	const [components, setComponents] = useState([])
	const [title, setTitle] = useState('')
	const [value, setValue] = useState('')
	const [req, setReq] = useState('')
	const [inst, setInst] = useState('')
	const [connection, setConnection] = useState('')
	const [desc, setDesc] = useState('')
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')
	
	
	

	function handleSubmit(){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('config')
		.collection('components')
		.add({title,value,module_id,index})
		.then(() => {
			setTitle("")
			setValue("")
		})
		.then(() => setMessage('added success'))
	}

	function handleSubmit2(){
		
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('config')
		.collection('components')
		.add({desc,req,module_id,index,inst,connection})
		.then(() => {
		
			setDesc('')
			setReq("")
			setInst("")
			setConnection("")

		}
		)
		.then(() => setMessage('added success'))
	}

	function handleOpen (){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	return (
		<>
			
			{type===0&&
			<>
				<div style={{marginTop: '20px', paddingRight: '3%', display: 'flex',justifyContent: 'flex-start'}}>
				<Button onClick={handleOpen} style={{background: 'black', color: 'whitesmoke'}}>Add New </Button>
			</div>
			{message && <b>{message}</b>}
			<br />
		
			<Dialog fullWidth onClose={handleClose} open={open}>
				<Typography variant='h4' align='center' gutterBottom><b>Add New Components</b></Typography>
				<DialogContent>
					<TextField value={title}  variant='outlined' style={{marginBottom: '20px'}} fullWidth required onChange={(e) => setTitle(e.target.value)} label='Title'/>
					<TextField value={value}  variant='outlined' fullWidth required onChange={(e) => setValue(e.target.value)} label='Expected Value'/>
				</DialogContent>
				<DialogActions>
					<Button variant='contained' color='secondary' onClick={handleClose} >Cancel</Button>
					<Button onClick={handleSubmit} style={{background: 'orange', color: 'white'}}>Add Components</Button>
				</DialogActions>
			</Dialog>
			</>
			}
			{type===1&&
			<>
				<div style={{marginTop: '20px', paddingRight: '3%', display: 'flex',justifyContent: 'flex-start'}}>
				<Button onClick={handleOpen} style={{background: 'black', color: 'whitesmoke'}}>Add New </Button>
			</div>
			{message && <b>{message}</b>}
			<br />
		
			<Dialog fullWidth onClose={handleClose} open={open}>
				<Typography variant='h4' align='center' gutterBottom><b>Add New Components</b></Typography>
				<DialogContent>
					<TextField value={desc} style={{marginBottom: '30px'}} multiLine rows={5} variant='outlined' label='Description' fullWidth onChange={(e) => setDesc(e.target.value)}/>
		<TextField value={req} style={{marginBottom: '30px'}} multiLine rows={5} variant='outlined' label='Requirement' fullWidth onChange={(e) => setReq(e.target.value)}/>
		<TextField value={inst} style={{marginBottom: '30px'}} multiLine rows={5} variant='outlined' label='Instrument / gauges' fullWidth onChange={(e) => setInst(e.target.value)}/>
			
		<TextField value={connection} style={{marginBottom: '30px'}} multiLine rows={5} variant='outlined' label='Preferred Pipe & Connection' fullWidth onChange={(e) => setConnection(e.target.value)}/>		
					
				</DialogContent>
				<DialogActions>
					<Button variant='contained' color='secondary' onClick={handleClose} >Cancel</Button>
					<Button disabled={desc === '' || req==='' || inst === '' || connection === ''} onClick={handleSubmit2} style={{background: 'orange', color: 'white'}}>Add Components</Button>
				</DialogActions>
			</Dialog>
			</>
			}
		</>
	)
}

export default DQComponents
