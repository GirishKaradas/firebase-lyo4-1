import { Typography, Toolbar, TextField, Dialog, DialogContent, DialogActions, Button } from "@material-ui/core";
import { setGridPageSizeActionCreator } from "@material-ui/data-grid";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../../firebase";
import { firebaseLooper } from "../../../utils/tools";
import IQHeader from "../IQComponents/IQHeader";
import ScopeView from "../IQComponents/ScopeView";

function IQScope({match}) {
	const [scope, setScope] = useState([])
	const [open, setOpen] = useState(false)
	const [desc, setDesc] = useState('')
	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	function handleSubmit(){
		var index = scope.length
		db.collection('IQ').doc(match.params.id)
		.collection('content').doc('scope')
		.collection('details')
		.add({index, desc})
	}
	useEffect(() => {
		
		db.collection('IQ').doc(match.params.id)
		.collection('content').doc('scope')
		.collection('details')
		.onSnapshot(snap => {
				const data =	firebaseLooper(snap)
				data.sort(function(a,b){
					return(a.index-b.index)
				})
				setScope(data)
		})
	}, [])
	return (
		<div>
			<IQHeader match={match}/>
			<Toolbar>
				<Button onClick={handleOpen}>Add New</Button>
			</Toolbar>
			<Typography variant='h1' align='center' gutterBottom ><b>SCOPE</b></Typography>
			<hr />
			{
				scope.map(data => (
					<ScopeView key={data.id} data={data}/>
				))
			}
			<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogContent>
				<TextField variant='outlined' fullWidth label='Description' onChange={(e) => setDesc(e.target.value)} />
			</DialogContent>
			<DialogActions>
				<Button color='secondary' onClick={handleClose} variant='contained'>Cancel</Button>
		<Button disabled={ desc===''} onClick={handleSubmit} style={{background: 'orange', color: 'white'}}>Add New</Button>
	
			</DialogActions>
		</Dialog>
		</div>
		
	)
}

export default IQScope
