
import './Load.css'
import {read, utils} from 'xlsx';;

function processHeader(workbook){
    
    const headerName = 'Header';
    const sheet = workbook.Sheets[headerName];
    const jsonData = utils.sheet_to_json(sheet, {header:"A", UTC:false, raw:false});
    const newJson =  {};
    jsonData.forEach((row)=>{newJson[row.A] = row.B})
    
    return newJson

}

function LoadMenu(){
    
    
    async function handleDrop(event){
        console.log('File Dropped')
        event.preventDefault() // prevent file from being dropped
        
        const files = [...event.dataTransfer.files]

        for(let f of files){

            const data = await f.arrayBuffer();
            const workbook = read(data);
            processHeader(workbook)
            console.log(`...file[${0}].name = ${f.name}`)
        }


    
    }
    function handleDragEnter(){
        console.log('Etner drop zone')
    }
    function handleDragLeave(){
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
        >
            <p>This is a drop zone.</p>
        </div>
    )
}


const Load = () =>{

    return(
        <div className="container">
            <h1>Hi im a LOAD</h1>
            <LoadMenu></LoadMenu>
        </div>
    )
};

export default Load;