import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import ContentDashboardLayout from '../../components/ContentSidebar/ContentDashboardLayout';
import { Card, Typography } from '@material-ui/core';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
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

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const useStyles = makeStyles((theme) => ({
  layoutRoot: {
    backgroundColor: 'white',
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
    paddingLeft: 256
  },
  
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {
     
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
    table: {
    minWidth: 500,
  },
}));


const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles2 = makeStyles({
  
});

export default function BatchReport({match}) {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [dq, setDq] = useState([])
    const [manual, setManual] = useState('')
    useEffect(() => {
        db.collection('batchReport').where('machine_id', '==', `${match.params.id}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setDq(data)
           
        })
    },[])
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, dq.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const showRecipee = (id) => {
    const manual_id = id
    const title =''
    db.collection('manualData').doc(manual_id).onSnapshot(doc => {
     title = doc.data().title
     
    })
    return(
      <b>{title}</b>
    )
  }

  return (
      <>
      <ContentDashboardLayout match={match}/>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
            <div>
              <Typography align='center' variant='h1'><b>Batch Report</b></Typography>
               <Typography align='center' variant='body2' >These are all your Batch Reports</Typography>
              </div>
              <br/>
                    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? dq.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : dq
          ).map((row) => (
            <TableRow key={row.manual_id}>
              <TableCell component="th" scope="row">
                <h3>Time :</h3>
                <b style={{color: 'orangered'}}>{row.time}</b>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                <h3>User :</h3><p style={{color: 'darkblue'}}>{row.user_id}</p>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
               <h3>Manual :</h3> 
               <b style={{color: 'grey'}}>{row.manual_name}</b>
               {/* {showRecipee(row.manual_id)} */}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                <img src={row.url} height={300} width={400}/>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={dq.length}
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
      </Table>
    </TableContainer>
          </Card>
        </div>
      </div>
    
    </>
  );
}