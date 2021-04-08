import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Container,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import Page from '../../../components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { database } from '../../../firebase';
import { firebaseLooperTwo } from '../../../utils/tools';
import Head from './Head';
import ContentDashboardLayout from '../../../components/ContentSidebar/ContentDashboardLayout';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  wrapper: {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256
  },
   background:'linear-gradient(#f3f3f3, #e7e7e7)' 
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {
     background:'linear-gradient(#f3f3f3, #e7e7e7)' ,
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}));

const BatchListView = ({match}) => {
  console.log(match)
  const classes = useStyles();
  const [customers] = useState(data);
  const [batch, setBatch] = useState([]);

  useEffect(() => {
        database.ref('recipes/').get().then((snapshot) => {
            const data = firebaseLooperTwo(snapshot)
            console.log(data)
            setBatch(data)
          
        })
      })

  return (
    <>
    <ContentDashboardLayout match={match}/>
    <Page
      className={classes.root}
      title="Batch Logs"
    >
      <Container maxWidth={false}>
        
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
            <Toolbar />
            <Box mt={3}>
              <Table align="center">
                  <TableBody>
                    {batch.map((batch) => (
                <Results match={match} customers={customers} values={batch}/>
              ))
            }
                  </TableBody>
              
              </Table>
            </Box>
          </Card>
        </div>
      </div>
        
      </Container>
    </Page>
    </>
  );
};

export default BatchListView;