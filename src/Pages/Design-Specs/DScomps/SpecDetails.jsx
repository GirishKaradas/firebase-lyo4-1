import { TextField, Button, IconButton } from "@material-ui/core"
import { useState } from "react"
import { useEffect } from "react"
import { db } from "../../../firebase"
import { firebaseLooper } from "../../../utils/tools"
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

function SpecDetails({match, tid}) {
	const [descs, setDescs] = useState([])
	const [desc, setDesc] = useState('')
	useEffect(() => {
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('designSpecs').collection('points')
		.where('tid', '==', `${tid}`).onSnapshot(snap => {
			const data = firebaseLooper(snap)
			setDescs(data)
		})
	}, [])
	function handleChange(id, data){
		const desc = data
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('designSpecs').collection('points')
		.doc(id).update({desc})
	}
	function handleDelete (id){
		
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('designSpecs').collection('points')
		.doc(id).delete()
	}

	function handleSubmit(){
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('designSpecs').collection('points')
		.add({desc,tid})
	}

	return (
		<div>
			{
				descs.map(data => (
					<div style={{display: 'flex', justifyContent: 'space-between'}}>
						<p className='text-2xl mr-3'>⦿</p>
						<TextField className='mb-5' variant='outlined' fullWidth key={data.id} defaultValue={data.desc} onChange={handleChange(data.id,data.desc)}/>
						<IconButton onClick={(e) =>handleDelete(data.id)}><DeleteSweepIcon className='hover:text-red-600' /></IconButton>
					</div>
					
				))
				
			} 
			<div className='p-10' style={{display: 'flex', justifyContent: 'space-evenly'}}>
				<TextField className='mr-5 mb-10'  variant='outlined' fullWidth  label='Add new Data' onChange={(e) => setDesc(e.target.value)}/>
				<Button onClick={handleSubmit} disabled={desc===''} style={{color: 'orange'}} >Add </Button>
			</div>
			
		</div>
	)
}

export default SpecDetails
