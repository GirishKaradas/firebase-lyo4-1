import { Button, TableCell, TableRow, TextField, Dialog, DialogContent, DialogActions } from "@material-ui/core"
import { SettingsInputAntenna } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import { useState } from "react";
import { db } from "../../firebase";
function DQRSpecView({row, match}) {
	const [open, setOpen] = useState(false)
	const [input, setInput] = useState(row.input)

	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	function handleUpdate(){
		db.collection('DQNewReport')
		.doc(match.params.id)
		.collection('content')
		.doc('specifications')
		.collection('specDetails')
		.doc(row.id)
		.update({input})
	}
	return (
		<>
			 <TableRow key={row.name}>
              <TableCell style={{background: '#E8F6EF'}}  component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.input}</TableCell>
             
              
              <TableCell align="right"><Button className='animate-bounce' onClick={handleOpen}><EditIcon/></Button></TableCell>
            </TableRow>
	    <Dialog open={open} onClose={handleClose}>
		    <DialogContent>
			    <TextField fullWidth variant='outlined' value={input} onChange={(e) => setInput(e.target.value)}/>
		    </DialogContent>
		    <DialogActions>
			    <Button variant='contained' color='secondary' onClick={handleClose}>Cancel</Button>
			    <Button onClick={handleUpdate} style={{background: 'orange', color: 'white'}}>Update</Button>
		    </DialogActions>
	    </Dialog>
		</>
	)
}

export default DQRSpecView
