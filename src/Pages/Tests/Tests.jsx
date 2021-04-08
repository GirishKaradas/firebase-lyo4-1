import React, { useEffect, useState } from 'react'
import DemoChart from '../../components/DemoChart';
import { database, db } from '../../firebase';
import { firebaseLooper, firebaseLooperTwo } from '../../utils/tools';
import TestData from './TestData';
import TestHome from './TestHome'

const Tests = () => {

     const [batch, setBatch] = useState([]);

  useEffect(() => {
        db.collection('recipeeData').onSnapshot(data => {
            const dataSet = firebaseLooper(data)
            console.log(dataSet)
            setBatch(dataSet)
            
        })
      })

    return (
        <div>
         
                  <div>
                        <TestHome/>
                  </div>
              
        </div>
    )
}

export default Tests
