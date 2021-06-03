

import { Button, Typography } from '@material-ui/core';
import React from 'react'
import { useState } from 'react';
import {SketchField, Tools} from 'react-sketch2';
import { useVideoStorage } from '../../utils/useVideoStorage';
import Page from '../Page';

const Whiteboard = () => {
    const [selectedTool, setSelectedTool] = useState(Tools.Pencil)
    const [lineColor, setLineColor] = useState('black')
    const [file, setFile] = useState(null)
    const [lineWidth, setLineWidth] = useState(3)
    const [imageUrl, setImageUrl] = useState(``)
    const [steps, setSteps] = useState(15)
    const [disabled, setDisabled] = useState(true)
     const types = ["image/png", "image/jpeg", "image/jpg"];
     const [error, setError] = useState('')

    const handleErase = () => {
        setLineColor('white')
        setLineWidth(10)
    }
  
    const handleChange = (e) => {
        let selectedFile = e.target.files[0];
          
           if (selectedFile) {
         
             if (types.includes(selectedFile.type)) {
                setError(null);
                setFile(selectedFile);
                setDisabled(false)
            } else {
                setFile(null);
                setError("Please select an image file (png or jpg)");
                
            }
          }
           
        
    }
    let { progress, url } = useVideoStorage(file);
    

    
    return (
        <Page title='Whiteboard App | LyoIms'>
               <div style={{display: 'flex', width:'100%', height: '100%'}}>
            <Typography variant='h4' align='center'>Whiteboard</Typography>
            {
                url?
                <div style={{width: '100%',height: '100vh', backgroundImage: `url("${url}")`, backgroundSize: 'cover',  resize: 'both', overflow: 'scroll'}}>
               <SketchField width='100%' 
                         height='100%' 
                         tool={selectedTool} 
                         lineColor={lineColor}
                         lineWidth={3}
                        undoSteps={steps}
                         /> 
            </div> : 
            <div style={{width: '100%', height: '100vh'}}>
                <SketchField width='100%' 
                         height='100vh' 
                         tool={selectedTool} 
                         lineColor={lineColor}
                         lineWidth={3}
                        undoSteps={steps}
                         /> 
            </div>
            }
                         <div>
                                <select onChange={(e) => {setSelectedTool(e.target.value); setLineColor('black'); setLineWidth(3)}}>
                                    <option value={Tools.Pencil}>Pen</option>
                                    <option value={Tools.Pan}>Pan</option>
                                    <option value={Tools.Line}>Line</option>
                                    <option value={Tools.Rectangle}>Rectangle</option>
                                </select>
                               <br />
                               <br />
                               <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-black rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-black hover:text-black">
                                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                    </svg>
                                    <span className="mt-2 text-base leading-normal">Select a file</span>
                                    <input onChange={handleChange} type='file' class="hidden" />
                                    
                                </label>
                                {
                                        url? <b>photo exists</b> : <b>No image selected</b>
                                    }
                         </div>
        </div>
        </Page>
     
    )

}

export default Whiteboard
