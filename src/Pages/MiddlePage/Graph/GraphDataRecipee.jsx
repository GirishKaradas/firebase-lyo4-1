import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import { firebaseLooper } from '../../../utils/tools'
import TestData from '../../Tests/TestData'
import TestHome from '../../Tests/TestHome'

const GraphDataRecipee = ({data}) => {
  console.log(data)
    const [graphData, setGraphData] = useState([])
  

   
    return (
        <div>
           
           <TestHome data={data} />
        </div>
    )
}

export default GraphDataRecipee
