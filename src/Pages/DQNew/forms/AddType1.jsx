import { TextField } from "@material-ui/core"

function AddType1({match}) {
	return (
		<div>
		  	<TextField variant='outlined' fullWidth lablel='Title' style={{marginBottom: '25px'}} />
			  <TextField variant='outlined' fullWidth lablel='Description' style={{marginBottom: '25px'}} />
			 
		</div>
	)
}

export default AddType1



