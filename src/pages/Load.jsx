
import './Load.css'
import {read, utils} from 'xlsx';;
import { addFile } from '../utils/storage';
import { useState } from 'react';

import UploadIcon from '../assets/icons/UploadIcon';
import XlsxIcon from '../assets/icons/XlsxIcon';
function processHeader(workbook){
    
    const headerName = 'Header';
    const sheet = workbook.Sheets[headerName];
    const jsonData = utils.sheet_to_json(sheet, {header:"A", UTC:false, raw:false});
    const newJson =  {};
    jsonData.forEach((row)=>{newJson[row.A] = row.B})
    
    return newJson

}

function LoadMenu(){

    
    const [filesNumber, setFilesNumber] = useState(0);  
    const [canDrop, setCanDrop]  = useState(false);
    
    
    async function handleDrop(event){
        console.log('File Dropped')
        event.preventDefault() // prevent file from being dropped
        let count = 0;
    
        const files = [...event.dataTransfer.files]

        for(let f of files){
        
            if(!f.name.endsWith('.xls'))
            {
                console.log(`${f.name} is not of type xlsx`)
                continue
            }
            ++count;
            const data = await f.arrayBuffer();
            const workbook = read(data);
            const meta = processHeader(workbook);
    
            addFile(meta);
            console.log(`...file[${0}].name = ${f.name}`)
        }
        setFilesNumber(count);
    }
    function handleDragEnter(){
        // setCanDrop(!canDrop)
        console.log('Etner drop zone')
    }
    function handleDragLeave(){
        // setCanDrop(!canDrop)
        console.log('Leaving drop zone')
    }
    function handleDragOver(event){
        event.preventDefault();
    }
    return(
        <div 
        id = 'drop_zone'
        onDrop = {handleDrop}
        onDragOver={handleDragOver}
        onDragEnter = {handleDragEnter}
        onDragLeave = {handleDragLeave}
        // className = {canDrop? 'drop' : ''}
        >
            <p>Drop your files <b>here.</b></p>
            <UploadIcon className="drop-container"></UploadIcon>
            {filesNumber > 0 ? <p>{filesNumber} x <XlsxIcon></XlsxIcon> have been uploaded.</p>: null}
            
        </div>
    )
}


const Load = () =>{
    return(
        <div className="container">
            {/* <h1></h1> */}
            <LoadMenu></LoadMenu>
        </div>
    )
};

export default Load;