import { Button, Dialog, TableCell, TableRow, Toolbar } from "@material-ui/core"
import { useGridState } from "@material-ui/data-grid"
import { useState } from "react"
import DQRComponents from "./DQRComponents"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
function DQRConfigView({row, match}) {
	const [open, setOpen] = useState(false)
	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	return (
		<>
			 <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.desc}</TableCell>
             
              
              <TableCell align="right"><Button onClick={handleOpen}><ArrowForwardIcon/></Button></TableCell>
	      <Dialog fullScreen onClose={handleClose} open={open}>
		<Toolbar>
			<Button onClick={handleClose}>Exit</Button>
			
		</Toolbar>
		<DQRComponents key={row.id} moduleId={row.id} match={match}/>
	      </Dialog>
            </TableRow>
		</>
	)
}

export default DQRConfigView
