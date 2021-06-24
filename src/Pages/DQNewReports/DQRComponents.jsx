import { Button, Card, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow , Typography} from "@material-ui/core"
import { useEffect, useState } from "react"
import { db } from "../../firebase"
import { firebaseLooper } from "../../utils/tools"

function DQRComponents({match, moduleId}) {
	const [reports, setReports] = useState([])
	
	useEffect(() => {
		db.collection('DQNewReport')
		.doc(match.params.id)
		.collection('content')
		.doc('configuration')
		.collection('components')
		.where('module_id', '==', `${moduleId}`)
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			setReports(data)
		})
	}, [])

	function getResponse(res) {
		if(res === 1){
			return(

				<b style={{background: '#BBE5B3 0% 0% no-repeat padding-box', borderRadius: '100px', border: '2px solid var(--unnamed-color-ffffff)'}}>Accepted</b>
			)
		}else if(res === 2){
			return(
				<b style={{background: '#FF616D 0% 0% no-repeat padding-box', borderRadius: '100px', border: '2px solid var(--unnamed-color-ffffff)'}}>Rejected</b>
			)
		}else if (res === 3){
			return(
				<b style={{background: '#FFEAC9 0% 0% no-repeat padding-box', borderRadius: '100px', border: '2px solid var(--unnamed-color-ffffff)'}}>Issued</b>
			)
		}
	}
	return (
		<>
		<Typography variant='h1' align='center' gutterBottom style={{marginTop: '20px', marginBottom: '20px'}}>Components</Typography>
		<hr />
		<div style={{paddingRight: '5%', paddingLeft: '5%'}}>
			 <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Expected Value</TableCell>
	    <TableCell align="right">Response</TableCell>
            <TableCell align="right">Issue </TableCell>
            <TableCell align="right">Actions</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
	      <TableCell align="right">{getResponse(row.response)}</TableCell>
              <TableCell align="right">{row.issue_id ? <b>{row.issue_id}</b> : <b>N/A</b>}</TableCell>
              
             <TableCell align="right"><Button style={{background: 'orange', color: 'white'}}>Check</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
		</div>
		
    </>
	)
}

export default DQRComponents
