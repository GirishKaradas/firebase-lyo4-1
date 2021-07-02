import { Card, DialogContent, makeStyles, Typography } from "@material-ui/core"
import { Dialog } from "@material-ui/core"
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, Toolbar } from "@material-ui/core"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import DQLayout from "../../components/DQNewSidebar/DQLayout"
import DQRLayout from "../../components/DQRLayout/DQRLayout"
import { db } from "../../firebase"
import { firebaseLooper } from "../../utils/tools"

import AddApproval from "./AddApproval"
import ApprovalCView from "./ApprovalCView"
import ApprovalView from "./ApprovalView"
const useStyles = makeStyles((theme) => ({
  layoutRoot: {
   backgroundColor: 'whitesmoke',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#141256',
  },
 wrapper: {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 250
  },
  
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {
   padding: '20px',
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}));

function Approval({match}) {
	const [checked, setChecked] = useState(false)
	const [approvalC, setApprovalC] = useState([])
	const [approvalV, setApprovalV] = useState([])
	const [open, setOpen] = useState(false)
	const classes = useStyles()
	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	useEffect(() => {
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('approval')
		.collection('customer')
		.onSnapshot(snap => {
			const data = firebaseLooper(snap)
			setApprovalC(data)
		})
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('approval')
		.collection('vendor')
		.onSnapshot(snap => {
			const data = firebaseLooper(snap)
			setApprovalV(data)
		})
	},[])

	return (<>
	<DQLayout match={match}/>
	 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
           <div>
			<Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
			<Button onClick={handleOpen} style={{background: 'orange', color: 'white', marginBottom: '25px'}}>Add New Data</Button>
			</Toolbar>
			<Typography variant='h2' align='center' gutterBottom>PROTOCOL PREPARED AND REVIEWED BY</Typography>
			<TableContainer component={Paper}>
		<Table  aria-label="simple table">
			<TableHead>
			<TableRow>
			<TableCell><b className='text-lg font-bold italic'>Name</b></TableCell>
			<TableCell align="left"><b className='text-lg font-bold italic'>Sign</b></TableCell>
			<TableCell align="left"><b className='text-lg font-bold italic'>Date / Time</b></TableCell>
			<TableCell align="right"><b className='text-lg font-bold italic'>Actions</b></TableCell>
			</TableRow>
			</TableHead>
					{
						approvalV.map(data => (
				
							<>
							<ApprovalView data={data} match={match} key={data.id}/>	
			
					</>
						))
					}
					
		</Table>
		</TableContainer>
		<br />
		<hr />
		<Typography variant='h2' align='center' gutterBottom>CUSTOMER DETAILS</Typography>
			<TableContainer component={Paper}>
		<Table  aria-label="simple table">
			<TableHead>
			<TableRow>
			<TableCell><b className='text-lg font-bold italic'>Name</b></TableCell>
			<TableCell align="left"><b className='text-lg font-bold italic'>Sign</b></TableCell>
			<TableCell align="left"><b className='text-lg font-bold italic'>Date / Time</b></TableCell>
			<TableCell align="right"><b className='text-lg font-bold italic'>Actions</b></TableCell>
			</TableRow>
			</TableHead>
					{
						approvalC.map(data => (
				
							<>
							<ApprovalCView data={data} match={match} key={data.id}/>	
			
					</>
						))
					}
					
		</Table>
		</TableContainer>

		<Dialog open={open} onClose={handleClose} fullWidth >
			<DialogContent>
				<AddApproval match={match}/>
			</DialogContent>
		</Dialog>
		</div>
          </Card>
        </div>
      </div>
		
		</>
	)
}

export default Approval
