import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import { firebaseLooper } from '../../../utils/tools'
import TestData from '../../Tests/TestData'

const GraphDataRecipee = ({data}) => {
  console.log(data)
    const [graphData, setGraphData] = useState([])
  

   
    return (
        <div>
           
           <TestData data={data} />
        </div>
    )
}

export default GraphDataRecipee
