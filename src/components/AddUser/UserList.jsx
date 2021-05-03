
import React, {useEffect, useState} from 'react'

import { Button, Card, Container, makeStyles, TableCell, TableFooter, TablePagination, TableRow, TextField, Typography, useTheme } from '@material-ui/core';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import UserItem from './UserItem';



const useStyles = makeStyles((theme) => ({
  layoutRoot: {
    backgroundColor: 'white',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
     background:'linear-gradient(#f3f3f3, #e7e7e7)' 
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
    paddingLeft: 256
  },
   background:'white' 
  },
  container: {
     
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {
    background:'white',
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
     table: {
    minWidth: 500,
  },
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}


const UserList = ({users}) => {
    
    const [searchTerm, setSearchTerm] = useState('')
        const [userData, setUserData] = useState([{}])
    const history = useHistory()
   const classes = useStyles()

    useEffect (() => {
        db.collection('users')
        .onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setUserData(data)
        })
    }, [])
        
     const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


    return (
        <>
        
         
            <Container >
        <div >
          <Card className={classes.content}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
               <TextField
                    onChange={(e) => setSearchTerm(e.target.value)}
                        label="Search User"
                        margin="normal"
                        variant="outlined"
                        />
                        <br/>
            </div>
         
              {(rowsPerPage > 0
            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : users
          ).
           filter((data) => {
                                if(searchTerm === ""){
                                    return data
                                } else if (data.email.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return data
                               }else if (data.firstName.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return data
                               }
                               else if (data.lastName.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return data
                               }else if (data.phone.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return data
                                }
                                      
                            })
          .map((data) => (
            <UserItem key={data.id} users={data}  />
          ))}
           
           
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
            <TableFooter style={{display: 'flex', justifyContent: 'flex-end'}}>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
              
        </TableFooter>
          </Card>
        </div>
        
      </Container>
          
         
      </>
     
    )
}

export default UserList