import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import FetchRecipee from "./FetchRecipee";
import { firebaseLooper } from "../utils/tools";
import { Card, InputLabel, Select } from "@material-ui/core";


const TestGraph = () => {
    const [recipes, setRecipes] = useState([])
    const [rid, setRid] = useState('')
    const [machines, setMachines] = useState([])
    const [mid, setMid] = useState('')
    
    useEffect(() => {
        db.collection('machineData').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setMachines(data)
        })
    }, [])

    function handleChange(e){
        setRid(e.target.value)
       
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
          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
              <div style={{width: '45%'}}>
                  <InputLabel variant='outlined'>Select Machine</InputLabel>
                    <Select variant='outlined' fullWidth onChange={handleSetChange} name="" id="">
                    {
                        machines.map(data => (
                            <option value={data.id}>{data.title}</option>
                        ))
                    } 
                    </Select>
     
              </div>
              <div style={{width: '45%'}}>
                  <InputLabel variant='outlined'>Select Recipe</InputLabel>
                   <Select variant='outlined'  fullWidth onChange={handleChange} name="" id="">
                    {
                        recipes.map(data => (
                            <option value={data.id}>{data.title}</option>
                        ))
                    } 
                    </Select>
              </div>
          </div>
     
     
    
    <FetchRecipee recipes={recipes} rid={rid}/>
   <br/>
    </Card>
  );
}

export default TestGraph;