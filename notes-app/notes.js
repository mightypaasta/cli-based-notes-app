// ADD efficient approach for searching duplicates in the readNotes function(can use array.some )
// Can introduce recycle bin function to store the recent deleted notes which can later be restored!!

const fs = require('fs');
const chalk = require('chalk');

const  loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
        return [];
    }
}

const notes = loadNotes();

const readNotes = function (title){
    if(notes.length !=0){
        const result = notes.find(note => note.title === title);
        if(result)  console.log(result);
        else    console.log(chalk.red.inverse('Note not found!!!'))
    }
    else{
        console.error('NoteBook is empty!!');
    }
}

const listNotes = function (){
    notes.forEach(note => console.log(chalk.magenta(note.title)+': '+chalk.blue(note.body)));
}

const addNotes = function(body,title){
    
    let flagDuplicate = 0;

    if(notes.length!=0){
        notes.forEach(note => {
            if(note.title === title){
                flagDuplicate = 1;
                console.error(chalk.red('Warning Error Detected this title is already added'));
                console.log(note);
                
            }
            else{
                flagDuplicate=0;
            }
        })
    }

    if(flagDuplicate != 1){
        const newNote ={
            title: title,
            body: body,
            index: notes.length + 1
        }
        notes.push(newNote);
        saveNotes(notes);
    }

}

const removeNotes = function(title){
    if(notes.length !=0){
        const newNote = notes.filter(note => note.title != title);
        if(newNote.length != notes.length)  console.log(chalk.green(title)+' is removed from the notebook!!');
        else    console.log(chalk.red(title + ' note is not found in the notebook'))
       saveNotes(newNote);
    }else{
        console.error(chalk.red('Notebook is empty :('));
    }
}

const saveNotes = function(notes){
    notes =JSON.stringify(notes);
    fs.writeFileSync('notes.json',notes)
}


module.exports = {readNotes: readNotes, addNotes: addNotes, removeNotes: removeNotes, listNotes:listNotes};