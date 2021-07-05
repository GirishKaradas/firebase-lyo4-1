import { Typography, Toolbar, TextField, Button,Card,makeStyles } from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import DQLayout from "../../components/DQNewSidebar/DQLayout"
import { db } from "../../firebase"
import { firebaseLooper } from "../../utils/tools"
import SpecDetails from "./DScomps/SpecDetails"

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


function DesignSpecs({match}) {
	const [titles, setTitles] = useState([])
	const [title, setTitle] = useState('')
	const classes = useStyles()
	useEffect(() => {
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('designSpecs')
		.collection('title').onSnapshot(snap => {
			const data = firebaseLooper(snap)
			setTitles(data)
		})
	}, [])

	function handleSubmit(){
		// /DQ/HeceUekdaKAgLQvwFKc5/Design-Specs
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('designSpecs')
		.collection('title').add({title})
	}


	return (
		<>
		<DQLayout match={match}/>
		 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
		<div>
			<Typography variant='h1' align='center' gutterBottom >Design Specifications</Typography>
			<Toolbar style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}>
				<TextField className='mr-5' label='Add new Specification' variant='outlined' fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
				<Button onClick={handleSubmit} disabled={title===''}>Submit</Button>
			</Toolbar>
			{
				titles.map(data => (
					<div key={data.id}>
						<Typography variant='h4' align='left' style={{paddingLeft: '30px'}} ><b>{data.title}</b> </Typography>
						<br />
						<div className='px-10'>
							<SpecDetails key={data.id} match={match} tid={data.id}/>
						</div>
						
					</div>
				))
			}
			  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
		<Button component={NavLink} to={`/DQ/${match.params.id}/Specifications`} style={{background: 'blue', color: 'white', marginLeft: '25px',  marginRight: '4%'}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
</svg>
					</Button>  
					<Button component={NavLink} to={`/DQ/${match.params.id}/Safety`} style={{background: 'blue', color: 'white', marginLeft: '25px'}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"/>
</svg>
				</Button>
	  </div>
		</div>
          </Card>
	
        </div>
      </div>
      </>
		
	)
}

export default DesignSpecs