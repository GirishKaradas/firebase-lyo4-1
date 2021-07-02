import { Button, Dialog, DialogActions,Toolbar, DialogContent, DialogContentText, DialogTitle, TableBody, TableCell, TableRow, TextField, Typography } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useState } from "react"
import { db } from "../../../firebase"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function SoftDetailView({module, match}) {
	const [title, setTitle] = useState(module.title)
	const [desc, setDesc] = useState(module.desc)
	const [make, setMake] = useState(module.make)
	const [tag_no, setTag] = useState(module.tag_no)
	const [type, setType] = useState(module.type)
	const [serial_no, setSerial] = useState(module.serial_no)
	const [open, setOpen] = useState(false)
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
	function handleUpdate(){
		db.collection('IQ').doc(match.params.id)
		.collection('content').doc('software')
		.collection('softwareDetails')
		.doc(module.id)
		.update({title, desc, make,type,serial_no})
	}
	function handleDelete(id){
		db.collection('IQ').doc(match.params.id)
		.collection('content').doc('software')
		.collection('softwareDetails')
		.doc(id)
		.delete()
	}
	return (
		<>
		<TableBody>
			
			<TableRow key={module.id}>
			<TableCell component="th" scope="row">
				{module.title}
			</TableCell>
			
			<TableCell align="left">{module.desc}</TableCell>
			<TableCell align="left">{module.serial_no}</TableCell>
			<TableCell align="left">{module.make}</TableCell>
			<TableCell align="left">{module.type}</TableCell>
			<TableCell align="center"><img width='300' height='200' src={module.url} alt='image'/></TableCell>
			<TableCell align="right">
				<div>
					<Button  onClick={handleOpen}><EditIcon/></Button>
					<Button onClick={handleOpenDel}><DeleteIcon/></Button>
					
				</div>
			</TableCell>
			</TableRow>
		
			</TableBody>
			 <Dialog style={{alignItems: 'center'}} fullWidth open={open} onClose={handleClose}>
				<DialogContent>
					<Typography variant='h4' align='center' gutterBottom><b>Edit Details</b></Typography>
					<form  >
					<TextField style={{marginBottom: '3%'}} value={title} variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>
					<TextField style={{marginBottom: '3%'}} value={make} variant='outlined' fullWidth onChange={(e) => setMake(e.target.value)}/>
					<TextField style={{marginBottom: '3%'}} value={type} variant='outlined' fullWidth onChange={(e) => setType(e.target.value)}/>
					<TextField style={{marginBottom: '3%'}} value={serial_no} variant='outlined' fullWidth onChange={(e) => setSerial(e.target.value)}/>
					
					
				<TextField multiline rows={7} value={desc} variant='outlined' fullWidth onChange={(e) => setDesc(e.target.value)}/>
				<div style={{marginTop: '25px', display: 'flex', justifyContent: 'center'}}>
						<img src={module.url}/>
					</div>
				</form>
				</DialogContent>
				
				
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleUpdate} style={{backgroundColor: 'orange', color: 'whitesmoke'}}>Update</Button>
			</DialogActions>
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
		<Dialog fullScreen open={openC}>
		<Toolbar>
			<Button onClick={closeComponent}>Close</Button>
		</Toolbar>
		
		</Dialog>
		</>
	)
}

export default SoftDetailView
