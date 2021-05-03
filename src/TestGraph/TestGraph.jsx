import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import FetchRecipee from "./FetchRecipee";
import { firebaseLooper } from "../utils/tools";
import { Card, Grid, InputLabel, Select } from "@material-ui/core";
import GraphSelect from "./GraphSelect";


const TestGraph = () => {
    const [recipes, setRecipes] = useState([])
    const [rid, setRid] = useState('')
    const [machines, setMachines] = useState([])
    const [rData, setRdata] = useState([])
     const [realData, setRealData] = useState([])
    const [batch, setBatch] = useState([])
     const [batchId, setBatchId] = useState([])

    const [mid, setMid] = useState('')
    
    useEffect(() => {
        db.collection('machineData').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setMachines(data)
        })
    }, [])

    function handleChange(e){
        setRid(e.target.value)
        const recipe_id = e.target.value
        db.collection('realtimeData').where('recipe_id', '==',`${recipe_id}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setBatch(data)
        })
       
    }
   
    function handleBatchChange(e){
        setBatchId(e.target.value)
        let batch_id = e.target.value

        db.collection('realtimeData').where('recipe_id','==', `${rid}`).where('time', '==', `${batch_id}`).onSnapshot(doc => {
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
    function handleSetChange(e){
        let mid = e.target.value
       db.collection('recipes').where('mid', '==',`${mid}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setRecipes(data)
        })
    }

  return (
      <Card >
          <Grid container spacing={3} style={{display: 'flex', justifyContent: 'space-evenly'}} >
             
                  <Grid item  lg={3}
            sm={6}
            xl={3}
            xs={12} >
                      <select style={{ border: '2px solid whitesmoke'}} variant='outlined' fullWidth onChange={handleSetChange} name="" id="">
                           <option value="" disabled selected hidden>Select Machine</option>
                    {
                        machines.map(data => (
                            <option value={data.id}>{data.title}</option>
                        ))
                    } 
                    </select>
                  </Grid>
                    
     
             
              <Grid item lg={3}
            sm={6}
            xl={3}
            xs={12} >
                  
                   <select style={{ border: '2px solid whitesmoke'}} variant='outlined'  fullWidth onChange={handleChange} name="" id="">
                        <option value="" disabled selected hidden>Select Recipe</option>
                    {
                        recipes.map(data => (
                            <option value={data.id}>{data.title}</option>
                        ))
                    } 
                    </select>
              </Grid>
              <Grid item lg={3}
            sm={6}
            xl={3}
            xs={12}>
                  
                   <select style={{ border: '2px solid whitesmoke'}} variant='outlined'  fullWidth onChange={handleBatchChange} name="" id="">
                        <option value="" disabled selected hidden>Select Batch</option>
                    {
                        batch.map(data => (
                            <option value={data.time}>{data.time}</option>
                        ))
                    } 
                    </select>
              </Grid>
          </Grid>
                    <GraphSelect rData={rData} realData={realData} />
    {/* <FetchRecipee batchId={batchId} recipes={recipes} rid={rid}/> */}
   <br/>
    </Card>
  );
}

export default TestGraph;