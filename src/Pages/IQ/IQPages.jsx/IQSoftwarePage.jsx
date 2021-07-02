import { Dialog, Paper, TableCell, TableContainer, TableHead, TableRow, Typography,Toolbar, DialogContent, DialogActions, Button, TextField } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { db } from "../../../firebase";
import { firebaseLooper } from "../../../utils/tools";
import { useStorage } from "../../../utils/useStorage";
import ControlView from "../IQComponents/ControlView";
import DrawView from "../IQComponents/DrawView";
import IQConfigView from "../IQComponents/IQConfigView";
import IQHeader from "../IQComponents/IQHeader";
import PanelView from "../IQComponents/PanelView";
import SoftDetailView from "../IQComponents/SOftDetailsView";

function IQSoftwarePage({match, sid}) {
	const [contents, setContents] = useState([])
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [make, setMake] = useState('')
	const [tag_no, setTag] = useState('')
	const [type, setType] = useState('')
	const [serial_no, setSerial] = useState('')
	const [dno, setDno] = useState('')
	const [file, setFile] = useState(null)

	const handleChange = (loadedFiles) => {
        let selectedFile = loadedFiles[0]
        setFile(selectedFile)
       
    }

    const { progress, url } = useStorage(file);

	useEffect(() => {
		db.collection('IQ').doc(match.params.id)
		.collection('content').doc('software')
		.collection('softwareDetails')
		.where('sid', '==', `${sid}`)
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			data.sort(function(a,b){
				return (a.index - b.index)
			})
			setContents(data)
		})
	}, [])
	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	
	function handleSubmit(){
		const index = contents.length
		db.collection('IQ').doc(match.params.id)
		.collection('content').doc('software')
		.collection('softwareDetails').add({title,desc,index,make,type,serial_no,sid,url})
	}
	return (
		<div>
			
			<Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
				<Button onClick={handleOpen} style={{background: 'orange', color: 'white'}}>Add Items</Button>
			</Toolbar>

			<TableContainer component={Paper}>
		<Table  aria-label="simple table">
			<TableHead>
			<TableRow>
			<TableCell><b className='text-lg font-bold italic'>Title</b></TableCell>
			
			<TableCell align="left"><b className='text-lg font-bold italic'>Description</b></TableCell>
			<TableCell align="left"><b className='text-lg font-bold italic'>Model/Serial No.</b></TableCell>
			<TableCell align="left"><b className='text-lg font-bold italic'>Make</b></TableCell>
			<TableCell align="left"><b className='text-lg font-bold italic'>Type</b></TableCell>
			<TableCell align="center"><b className='text-lg font-bold italic'>Image</b></TableCell>
			<TableCell align="right"><b className='text-lg font-bold italic'>Actions</b></TableCell>
			</TableRow>
			</TableHead>
					{
						contents.map(module => (
				
							<>
							<SoftDetailView module={module} match={match} key={module.id}/>	
			
					</>
						))
					}
					
		</Table>
		</TableContainer>
		<Dialog open={open} onClose={handleClose} fullWidth>
	<Typography variant='h3' align='center' gutterBottom><b>Add new items</b></Typography>
	<DialogContent>
		<TextField style={{marginBottom: '3%'}} variant='outlined' label='Title' fullWidth onChange={(e) => setTitle(e.target.value)}/>
		
		<TextField style={{marginBottom: '3%'}} variant='outlined' label='Version/Serial No.' fullWidth onChange={(e) => setSerial(e.target.value)}/>
		<TextField style={{marginBottom: '3%'}} variant='outlined' label='Type/Rating' fullWidth onChange={(e) => setType(e.target.value)}/>
		<TextField style={{marginBottom: '3%'}} variant='outlined' label='Make/Vendor' fullWidth onChange={(e) => setMake(e.target.value)}/>
		<TextField multiLine rows={7} variant='outlined' label='Description' fullWidth onChange={(e) => setDesc(e.target.value)}/>	
		 <DropzoneArea
       showPreviews={true}
     
        showFileNames
        onChange={(loadedFiles) => handleChange(loadedFiles)}
        dropzoneText="Drag and Drop / Click to Add Files"
        showPreviewsInDropzone={false}
         useChipsForPreview
        showAlerts={false}
        filesLimit={1}
      />
    
					<h5>{progress}% Uploaded</h5>
				<div style={{display: 'flex', justifyContent: 'center'}}>
					{url &&	<img width='300' height='200' src={url} alt='image'/>}
				</div>
	</DialogContent>
	<DialogActions>
		<Button color='secondary' onClick={handleClose} variant='contained'>Cancel</Button>
		<Button disabled={title === '' || desc==='' || url === null} onClick={handleSubmit} style={{background: 'orange', color: 'white'}}>Add New</Button>
	</DialogActions>
</Dialog>
		</div>
	)
}

export default IQSoftwarePage
