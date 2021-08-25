import { Button, Dialog, DialogActions,Toolbar, DialogContent, DialogContentText, DialogTitle, TableBody, TableCell, TableRow, TextField, Typography, FormHelperText } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useState } from "react"
import { db } from "../../../firebase"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function AttachView({module, match}) {
	const [title, setTitle] = useState(module.title)
		const [dno, setDno] = useState(module.dno)
	const [rev, setRev] = useState(module.rev)
	const [desc, setDesc] = useState(module.desc)
	const [open, setOpen] = useState(false)
	const [error, setError] = useState("")
	const [openDel, setOpenDel] = useState(false)
	const [openC, setOpenC] = useState(false)
	function handleOpenDel(){
		setOpenDel(true)
	}
	function handleCloseDel(){
		setOpenDel(false)
		
	}
	function openComponent(){
		setOpenC(true)
	}
	function closeComponent(){
		setOpenC(false)
		
	}
	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	function handleUpdate(e){
		e.preventDefault()
		if(desc?.trim().length === 0 || rev?.trim().length === 0){
			return setError("Empty spaces are not valid inputs ! please try again with a valid input")
		}
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('attachments')
		.collection('details')
		.doc(module.id)
		.update({ desc,rev,dno})
		.then(() =>{setOpen(false)})
	}
	function handleDelete(id){
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('attachments')
		.collection('details')
		.doc(id)
		.delete()
	}
	return (
		<>
		<TableBody>
			
			<TableRow key={module.id}>
				
			<TableCell className='text-3xl'  scope="row">
				⚫
			</TableCell>
			<TableCell align="left">{module.desc}</TableCell>
			<TableCell align="left">{module.dno}</TableCell>
			<TableCell align="left">{module.rev}</TableCell>
			<TableCell align="right">
				<div>
					<Button  onClick={handleOpen}><EditIcon/></Button>
					<Button onClick={handleOpenDel}><DeleteIcon/></Button>
		
				</div>
			</TableCell>
			</TableRow>
		
			</TableBody>
			 <Dialog style={{alignItems: 'center'}} fullWidth open={open} onClose={handleClose}>
				<form onSubmit={handleUpdate} >
					<DialogContent>
					<Typography variant='h4' align='center' gutterBottom><b>Edit Details</b></Typography>
					{error && <Alert severity="error" >{error}</Alert>}
						<TextField label="Description" required multiline rows={5} value={desc} variant='outlined' error={desc.length > 150} fullWidth onChange={(e) => setDesc(e.target.value)}/>
						<FormHelperText style={{marginBottom: '3%'}}>Description should be max {desc.length}/150</FormHelperText>
					<TextField label="Drawing Number" style={{marginBottom: '3%'}} value={dno} variant='outlined' fullWidth onChange={(e) => setDno(e.target.value)}/>
					<TextField label="Revision" required style={{marginBottom: '3%'}} value={rev} variant='outlined' fullWidth onChange={(e) => setRev(e.target.value)}/>
				
				
				</DialogContent>
				
				
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button type="submit" disabled={desc.length > 150} style={{backgroundColor: 'orange', color: 'whitesmoke'}}>Update</Button>
			</DialogActions>
			</form>
			</Dialog>
			{/* Open delete dialog */}
			 <Dialog
			 
                    open={openDel}
                    onClose={handleCloseDel}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                  <Alert severity="error" variant="filled">
                    <AlertTitle><strong>Delete</strong></AlertTitle>
                    <DialogTitle id="alert-dialog-title">{"Are You Sure You Want To Delete?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText color="white" id="alert-dialog-description">
                        Deleting will be a permanent action and data pervailing will be permanently deleted and can not be retrieved back.                    </DialogContentText>
                    </DialogContent>
                    </Alert>
                    <DialogActions>
                    <Button onClick={handleCloseDel} color="primary" variant="outlined">
                        Disagree
                    </Button>
                    <Button   onClick={(e) => handleDelete(module.id)} color="secondary" variant="outlined" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
		
		</>
	)
}

export default AttachView