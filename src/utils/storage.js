export function hasLocalStorage(){
    return Object.keys(localStorage).length!=0;
}

export function addFile(obj){
    localStorage.setItem(obj['Sounding Number'], JSON.stringify(obj))
}

export function addFiles(objects){
    for (let obj of objects)
        addFile(obj);
}