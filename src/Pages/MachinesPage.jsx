import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  TablePagination
} from '@material-ui/core';
import Machines from '../components/Machines/Machines';

const MachinesPage = () => (
  <>
    <Helmet>
      <title>Machines | LyoIMS</title>
    </Helmet>
    <Box
    py={3}
      style={{
        backgroundColor: 'background.default',
        minHeight: '100%',
       
      }}
    >
      <Container maxWidth={false}>
        <Box pt={3} >
          <Grid
            container
            spacing={3}
          >
            
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
              >
                <Machines/>
              </Grid>
           
          </Grid>
        </Box>
        
      </Container>
    </Box>
  </>
);

export default MachinesPage;