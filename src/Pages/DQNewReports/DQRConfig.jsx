import { Typography , Card, makeStyles, TableContainer,Toolbar, Paper, TableHead, TableRow, TableCell, TableBody, Button, Dialog} from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import { Table } from "react-bootstrap"
import DQRLayout from "../../components/DQRLayout/DQRLayout"
import { db } from "../../firebase"

import { firebaseLooper } from "../../utils/tools"
import DQRComponents from "./DQRComponents"
import DQRConfigView from "./DQRConfigView"
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


function DQRConfig({match}) {
	const [purpose, setPurpose] = useState({})
	const [configData, setConfigData] = useState([])
	
	const classes = useStyles()
	useEffect(() => {
		db.collection('DQNewReport')
		.doc(match.params.id)
		.collection('content')
		.doc('configuration')
		.onSnapshot(snapshot => {
			const data = snapshot.data()
			setPurpose(data)
		})
		db.collection('DQNewReport')
		.doc(match.params.id)
		.collection('content')
		.doc('configuration')
		.collection('modules')
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			setConfigData(data)
		})
	}, [])
	return (
		<div>
			<DQRLayout match={match}/>
			 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
           <div style={{height: '100vh'}}>
			{purpose && <Typography variant='h1' align='center' gutterBottom><b>{purpose.name}</b></Typography>
			}<hr />
			
			 <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Description</TableCell>

            <TableCell align="right">Actions</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {configData.map((row) => (
		  <DQRConfigView row={row} match={match} key={row.id}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
			
		</div>
          </Card>
        </div>
      </div>
		</div>
	)
}

export default DQRConfig
