import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container
} from '@material-ui/core';
import getInitials from './getInitials';
import { database } from '../../../firebase';
import { firebaseLooperTwo } from '../../../utils/tools';
import { Alert, AlertTitle } from '@material-ui/lab';
import TestHome from '../../Tests/TestHome';
import TestData from '../../Tests/TestData';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({values, className, customers, ...rest }) => {


  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false)
  const [openGraph, setOpenGraph] = useState(false)
  const [batch, setBatch] = useState([]);
   
    useEffect(() => {
        database.ref('recipes/').get().then((snapshot) => {
            const data = firebaseLooperTwo(snapshot)
            console.log(data)
            setBatch(data)
           
        })
      }, [])

    const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
    setOpen(false);
  };

  const handleGraphOpen = () => {
      setOpenGraph(true)
    }
  const handleGraphClose = () => {
      setOpenGraph(false)
    }
  
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Table >
        
           
         <TableRow
                  hover
                  key={values.key}
                  
                >
                   <TableCell padding="checkbox">
                    <Checkbox
                    defaultChecked
                    color="primary"
                    disabled
                    />
                    </TableCell>
                  <TableCell align="left">
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Typography
                        color="textPrimary"
                        variant="h4"
                        
                      >
                       {values.title} 
                      </Typography>
                    </Box>
                  </TableCell>
                 
                  <TableCell align="right">
                    <Button onClick={handleClickOpen} style={{color: "white", backgroundColor: "blue", borderRadius: "15px", marginRight: "20px"}}>Show Data</Button>
                    <Button onClick={handleGraphOpen}  style={{color: "white", backgroundColor: "rebeccapurple", borderRadius: "15px"}}>Show Graph</Button>
                    </TableCell>
                  
                  
                  
                  {/* Dialog box data */}
                  
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`Details for ${values.title}`}</DialogTitle>
                    <DialogContent>
                   <Alert severity="info" variant="standard">
                      <AlertTitle>
                        Batch Details
                      </AlertTitle>
      
                   </Alert>
                    <form  >
                        <Table>
                          <TableHead>
                        <TableRow>
                          <TableCell align="center">
                              <strong>CB </strong>
                          </TableCell>
                          <TableCell align="center">
                              <strong>Step </strong>
                          </TableCell>
                          <TableCell align="center">
                          <strong>Temp</strong> 
                          </TableCell>
                          
                          <TableCell align="center">
                            <strong>Time</strong> 
                          </TableCell>
                          <TableCell align="center">
                            <strong>Keep Time</strong> 
                          </TableCell>
                          <TableCell align="center">
                            <strong>Pressure</strong> 
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
              {values.arrayList.map((data) => (
                <TableRow
                  hover
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                    defaultChecked
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                       {data.step}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>

                  <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                       {data.temp1}
                      </Typography>
                  </TableCell>
                  <TableCell>
                   {data.time1}
                  </TableCell>
                  <TableCell>
                    {data.time2}
                  </TableCell>
                  <TableCell>
                    {data.pressure}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
                        </Table>
                    </form>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="outlined">
                        Close
                    </Button>
                    </DialogActions>
                    </DialogContent>
                    
                </Dialog>

                {/* Dialog for Graph */}
                 <Dialog
                 style={{
                  
                 }}
                    open={openGraph}
                    onClose={handleGraphClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`Details for ${values.title}`}</DialogTitle>
                    <DialogContent>
                   <Alert severity="info" variant="standard">
                      <AlertTitle>
                        Graph for {values.title}
                      </AlertTitle>
      
                   </Alert>
                   <Box mt={3} minWidth={550}>
                     <TestData data={values.arrayList}/>
                   </Box>
                      
                   
                    <DialogActions>
                    <Button onClick={handleGraphClose} color="primary" variant="outlined">
                        Close
                    </Button>
                    </DialogActions>
                    </DialogContent>
                    
                </Dialog>
                </TableRow>
            
            </Table>
      </PerfectScrollbar>
      
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
};

export default Results