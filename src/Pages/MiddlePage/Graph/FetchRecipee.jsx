import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import { firebaseLooper } from '../../../utils/tools'
import TestData from '../../Tests/TestData'
import GraphData from './GraphData'
import GraphDataRecipee from './GraphDataRecipee'

const FetchRecipee = ({title}) => {
    
    const [rData, setRData] = useState([])
    useEffect(() => {
        db.collection('recipeeData').where('rid', '==', `${title}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
           setRData(data)
           
        })
    },[])
    console.log(rData)
  
    return (
        <div>
          
           <TestData data={rData}/>
        </div>
    )
}

export default FetchRecipee
