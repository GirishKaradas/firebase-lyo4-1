import { DialogActions, DialogTitle, FormHelperText } from "@material-ui/core"
import { DialogContent } from "@material-ui/core"
import { DialogContentText } from "@material-ui/core"
import { Button, Dialog, Typography,TextField } from "@material-ui/core"
import { useState } from "react"
import { db } from "../../../firebase"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { NavLink } from "react-router-dom"
import { Alert, AlertTitle } from "@material-ui/lab"
function DQNewView({report}) {
  const [name, setName] = useState(report.name)
  const [desc, setDesc] = useState(report.desc)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [openDelete, setOpenDelete] = useState(false)
  function handleOpen(){
    setOpen(true)
  }

  function handleClose(){
    setOpen(false)
  }
  function handleOpenDelete
  (){
    setOpenDelete(true)
  }

  function handleCloseDelete(){
    setOpenDelete(false)
  }
 function handleDelete(id){
   db.collection('DQNew').doc(id).delete()
 }
  function handleSubmit(e){
    e.preventDefault()
    if(name?.trim().length === 0 || desc?.trim().length === 0){
      return setError("Empty Strings are not valid input! Please try again with a valid input")
    }
    db.collection('DQNew').doc(report.id).update({name, desc}).then(() => {setOpen(false)})
  }
	console.log(report)
	return (
		<div>
			    <div>
            {/* <div className="p-6 mx-auto bg-white border rounded-lg shadow-xl lg:w-1/2">
              <div className="flex flex-col items-start py-2 rounded-lg lg:flex-row">
                
                <div className="flex flex-col w-full text-blueGray-500 lg:ml-4">
                   <div style={{display: 'flex' , justifyContent: 'space-evenly'}}>
                     <h2 className="mt-4 mb-8 text-lg font-semibold tracking-widest text-black uppercase lg:mt-0 title-font"> {report.name}</h2>
                <Button onClick={handleOpen}><EditIcon/></Button>
                <Button onClick={handleOpenDelete}><DeleteIcon/></Button>
              </div>
                  
                  <p className="mb-3 text-base leading-relaxed text-blueGray-500"> {report.desc}</p>
		  <Button component={NavLink}  to={`/DQ/${report.id}/Approval`} fullWidth style={{backgroundColor: 'orange', color: 'white', margintop:'3%'}}>Content</Button>
     
                </div>
              </div>
            </div> */}
            <Dialog fullWidth open={open} onClose={handleClose}>
              <form action="" onSubmit={handleSubmit}>
                {error && <Alert severity='error'>{error}</Alert>}
                 <div>
           
          < >
              <Typography style={{marginTop: '15px'}} variant='h3' align='center' gutterBottom><b>Update {name}</b></Typography> 
            <DialogContent  >

                <TextField label="Name" required error={name.length > 40}  variant='outlined' fullWidth value={name} onChange={(e) => setName(e.target.value)} type="text"  placeholder="Enter Name" />
                <FormHelperText style={{marginBottom: '20px'}}>Name should be max {name.length}/40</FormHelperText>
          
                  <TextField label="Description" required error={desc.length> 300} fullWidth multiline rows={5} variant='outlined' value={desc} onChange={(e) => setDesc(e.target.value)} required/>
               <FormHelperText>Desc should be max {desc.length}/300</FormHelperText>
             
            </DialogContent>
          </>
       <DialogActions >
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" disabled={ desc>300 || name > 35} style={{background: 'orange', color: 'white'}}  > Update </Button>
              </DialogActions>
        </div>
              </form>
              
            </Dialog>
          </div>
         
          <Dialog
			 
                    open={openDelete}
                    onClose={handleCloseDelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                  <Alert severity="error" variant="filled">
                    <AlertTitle><strong>Delete</strong></AlertTitle>
                    <DialogTitle id="alert-dialog-title">{"Are You Sure You Want To Delete?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText color="white" id="alert-dialog-description">
                        Deleting will be a permanent action and data pervailing will be permanently deleted and can not be retrieved back.                    </DialogContentText>
                    </DialogContent>
                    </Alert>
                    <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary" variant="outlined">
                        Disagree
                    </Button>
                    <Button   onClick={(e)=>{
                        handleDelete(report.id);
                         handleCloseDelete()}}   color="secondary" variant="outlined" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
        
          <div className="xl:w-full w-11/12 mx-auto flex flex-wrap items-center justify-between xl:px-8 md:px-8 lg:px-8 mb-2 xl:mb-0 lg:mb-0 border-b border-gray-300 dark:border-gray-700">
                        <div className="xl:w-3/5 lg:w-2/4 w-full pt-6 xl:pb-6 lg:pb-8 md:pb-8 sm:pb-8">
                            <p className="text-lg font-bold text-gray-800 dark:text-gray-100 pb-1">{report.name}</p>
                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{report.desc}</p>
                        </div>
                        <div className="xl:w-1/5 lg:w-1/4 w-full pt-6 pb-8">
                            <div className="flex items-center w-full justify-between">
                                
                                <Button component={NavLink} to={`/DQ/${report.id}/Approval`} className="text-gray-400 hover:text-gray-500 cursor-pointer">
                                  Open
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width={20} height={20} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <polyline points="9 6 15 12 9 18" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                        <div className="xl:w-1/5 lg:w-1/4 w-full pt-6 xl:pb-8 lg:pb-8 md:pb-8 sm:pb-8">
                            <div className="flex items-center xl:-ml-10">
                            <Button onClick={handleOpen}><EditIcon/></Button>
                            <Button onClick={handleOpenDelete}><DeleteIcon/></Button>
                            </div>
                        </div>
                        
                    </div>
		</div>
	)
}

export default DQNewView
