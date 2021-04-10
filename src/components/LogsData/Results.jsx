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
  Grid
} from '@material-ui/core';
import getInitials from './getInitials';
import { database } from '../../firebase';
import { firebaseLooperTwo } from '../../utils/tools';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, customers, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0)

   const [calls, setCalls] = useState([]);

  useEffect(() => {
        database.ref('calls/').get().then((snapshot) => {
            const data = firebaseLooperTwo(snapshot)
            console.log(data)
            setCalls(data)
           
        })
      }, [])

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
     
    >
      <PerfectScrollbar>
        <Box
         lg={3}
       sm={6}
       xl={3}
       xs={12}
         >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell align="center">
                  <strong>Manual</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Step</strong> 
                </TableCell>
                <TableCell align="center">
                   <strong>Time</strong>
                </TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              {calls.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.key) !== -1}
                >
                  <TableCell  padding="checkbox" align="center">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.key) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.key)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell align="center"> 
                      <Typography
                      align="center"
                        color="textPrimary"
                        variant="button"
                      >
                        {customer.manual}
                      </Typography>
                   
                  </TableCell>
                  <TableCell align="center">

                  <Typography
                        color="textPrimary"
                        variant="button"
                      >
                        {customer.step}
                      </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {customer.time}
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results