
import { Button, Grid } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import TestData from '../Pages/Tests/TestData'
import { firebaseLooper } from '../utils/tools'
import GraphSelect from './GraphSelect'
import UpdateIcon from '@material-ui/icons/Update';

const FetchRecipee = ({batchId, recipes, rid}) => {
    const [rData, setRdata] = useState([])
     const [realData, setRealData] = useState([])
    const updateData = () => {

        db.collection('realtimeData').where('recipe_id','==', `${rid}`).where('time', '==', `${batchId}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
      setRealData(data[0].temp_points)
    })
        db.collection('recipeeData').where('rid', '==', `${rid}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
             data.sort(function(a,b) {
                return(a.index-b.index)
            })
            setRdata(data)
          
        })
    }

    function showData (){

        return(
            <>

            <GraphSelect realData={realData} rData={rData}/>
            
            </>
        )
    }
    console.log(rData)
    return (
        <div>
           <div style={{display: 'flex', jstifyContent: 'space-evenly'}}>
              <Button startIcon={<UpdateIcon/>} style={{color: 'orangered'}} onClick={updateData}>Update</Button>
                <Alert style={{marginLeft: '40%'}} severity='info'>Click <b>'Update'</b> and <b>'Set Graph'</b> after selecting </Alert>
           </div>
            {showData()}

            </div>
    )
}

export default FetchRecipee
