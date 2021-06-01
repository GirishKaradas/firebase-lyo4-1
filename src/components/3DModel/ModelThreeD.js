import { Card, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import {GLTFModel,AmbientLight,DirectionLight} from 'react-3d-viewer'
import ManualDashboardLayout from '../ManualSidebar/ManualDashboardLayout'

const useStyles = makeStyles((theme) =>( {
    add: {
     
    backgroundImage: 'linear-gradient(to left bottom, #fa630f, #fc8218, #fd9d29, #feb63f, #ffce59)',
    borderRadius: '20px',
    margin: theme.spacing(3, 0, 2),
 
    },
    backButton: {
        backgroundColor: "black",
        color: "white",
        borderRadius: "20px",
        marginRight: "30px",
        marginLeft: "20px",
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
     padding: '20px',
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}))

const ModelThreeD = ({match}) => {
  const classes = useStyles()
    return (
        <div>
          <ManualDashboardLayout match={match}/> 
          <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
          <Typography variant='h3' align='center'>3D Model</Typography>
          <br/>
      <div className='mx-auto p-15'>
            <GLTFModel
              src="https://raw.githubusercontent.com/GirishKaradas/GlassTest/master/CesiumMilkTruck.gltf"
            >
              <AmbientLight color={0xffffff}/>
              <DirectionLight color={0xffffff} position={{x:100,y:200,z:100}}/>
              <DirectionLight color={0xff00ff} position={{x:-100,y:200,z:-100}}/>
            </GLTFModel>
          </div>
          </Card>
          </div>
          </div>
             
        </div>
    )
}

export default ModelThreeD
