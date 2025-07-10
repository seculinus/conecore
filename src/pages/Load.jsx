
import './Load.css'

function LoadMenu(){
    
    
    function handleDrop(event){
        console.log('File Dropped')
        event.preventDefault() // prevent file from being dropped
        if(event.dataTransfer.items){
            [...event.dataTransfer.items].forEach((item, i) =>{
                //if drooped items arent files reject them
                if (item.kind === "file"){
                    const file = item.getAsFile();  
                    console.log(`...file[${i}].name = ${file.name}`)
                }
            })
        }
        else{
            //Use data Tranfer interface to access the file(s)
            
            [...event.dataTransger.files].forEach((file, i) => {
                console.log(`...file[${i}].name = ${file.name}`);})
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