import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { TextField } from "@material-ui/core";
import { useState } from "react";
import { db } from "../../../firebase";
import { AlertTitle } from "@material-ui/lab";
import { Alert } from "react-bootstrap";
import { NavLink } from "react-router-dom";
function IQView({match, data}) {
	const [openEdit, setOpenEdit] = useState(false)
	const [openDel, setOpenDel] = useState(false)
	const [name, setName] = useState(data.name)
	const [desc,setDesc] = useState(data.desc)
	function handleOpenEdit(){
		setOpenEdit(true)
	}
	function handleCloseEdit(){
		setOpenEdit(false)
	}
	function handleDeleteOpen(){
		setOpenDel(true)
	}
	function handleDeleteClose(){
		setOpenDel(false)
	}
	function handleSubmit(){
		db.collection('IQ').doc(data.id).update({name,desc})
	}

	function handleDelete(id){
		db.collection('IQ').doc(data.id).delete()
	}
	return (
		<>
			<div class="p-4 lg:w-1/3">
        <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">IQ</h2>
          <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{data.name}</h1>
          <p class="leading-relaxed mb-3">{data.desc}</p>
          <Button component={NavLink} to={`/IQ/${data.id}/index`} class="text-indigo-500 inline-flex items-center">Open IQ
            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </Button>
          <Button onClick={handleOpenEdit} style={{opacity: 0.68}}><EditIcon/> </Button>
	  <Button onClick={handleDeleteOpen} style={{opacity: 0.68}}><DeleteIcon/>  </Button>
        </div>
	<Dialog open={openEdit} onClose={handleCloseEdit} fullWidth>
	<Typography variant='h3' align='center'><b>Add new IQ</b></Typography>
	<DialogContent>
		<TextField value={name} variant='outlined' fullWidth onChange={(e) => setName(e.target.value)}/>
		<TextField value={desc} multiLine rows={7} variant='outlined'  fullWidth onChange={(e) => setDesc(e.target.value)}/>
		
		
	</DialogContent>
	<DialogActions>
		<Button color='secondary' onClick={handleCloseEdit} variant='contained'>Cancel</Button>
		<Button disabled={name === '' || desc===''} onClick={handleSubmit} style={{background: 'orange', color: 'white'}}>Update</Button>
	</DialogActions>
</Dialog>
 <Dialog
                    open={openDel}
                    onClose={handleDeleteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                  <Alert severity="error" variant="filled">
                    <AlertTitle ><strong>Delete</strong></AlertTitle>
                    <DialogTitle id="alert-dialog-title">{"Are You Sure You Want To Delete?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText color="white" id="alert-dialog-description">
                        Deleting will be a permanent action and data pervailing will be permanently deleted and can not be retrieved back.                    </DialogContentText>
                    </DialogContent>
                    </Alert>
                    <DialogActions>
                    <Button onClick={handleDeleteClose} color="primary" variant="outlined">
                        Disagree
                    </Button>
                    <Button   onClick={(e)=>{
                        handleDelete(data.id);
                         handleDeleteClose()}} color="secondary" variant="outlined" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
      </div>
		</>
	)
}

export default IQView
