import { Dialog, Paper, TableCell, TableContainer, TableHead, TableRow, Typography,Toolbar, DialogContent, DialogActions, Button, TextField, Select } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { db } from "../../firebase";
import { firebaseLooper } from "../../utils/tools";
import BrandView from "./brandsComp/BrandView";



function DQBrands({match}) {
	const [contents, setContents] = useState([])
	const [contents1, setContents1] = useState([])
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [type, setType] = useState(0)

	useEffect(() => {
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('config')
		.collection('module')
		.where('type', '==', 2)
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
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('config')
		.collection('module').add({title,desc,index})
	}
	return (
		<>

					{
						contents.map(module => (
				
							<>
							<BrandView module={module} match={match} key={module.id}/>	
			
					</>
				
						))}
	
		
		</>
	)
}

export default DQBrands
