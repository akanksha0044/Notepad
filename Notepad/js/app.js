 
console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  const date = new Date(); 

const options = { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
}; 

const formattedDate = date.toLocaleDateString('en-US', options); 

  
  //const formattedDate = date.toLocaleDateString('en-US', options); 
  let addTxt = document.getElementById("addTxt");
  // console.log(addTxt.value.length);
 let size= addTxt.value.length;
 
  let notes = localStorage.getItem("notes");
  if (addTxt.textLength == 0) {
    alert("Please write something in text box first!")
}else{
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let notesElement={
    note:addTxt.value,
    date:formattedDate,
    important:false,
    edit:false,
    size:size
  }
  notesObj.push(notesElement);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
   console.log(notesObj);
  showNotes();
}
})
;

// Function to show elements from localStorage
function showNotes(id=0) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  console.log(notesObj);
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        
                        
                      
                        <p class="card-text h6 "> ${element.note}</p>
                        <div class="row">
                             <div class="col">
                                   <p><small>${element.size}</small> characters</p>
                             </div>
                           <div class="col">
                              <p class="card-text "> <small>${element.date}</small></p>
                            </div>
                           </div>
                        
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                        <button id="${index}"  onclick="MarkNote(this.id)" class="btn btn-primary">Mark Note</button>
                        
                    </div>
                </div>`;
  });
  setTimeout(function(){
    Array.from(notesObj).forEach(function (obj, index1) {
      
      if(obj.important){
        let impbtn = document.getElementsByClassName('noteCard');
        Array.from(impbtn).forEach(function (element, index) {
          console.log(element);
         
           if(index==index1){
            
            element.style.backgroundColor = "yellow";
            
           }
          
          })
      
       
      }
      
     
     })
  },10)
  

  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}
function EditNote(index){
console.log("update");

 
}


//hightlight
function MarkNote(id){
  let list=localStorage.getItem("notes");
  list=JSON.parse(list);
  Array.from(list).forEach(function (element, index) {
    if(index==id){
    
    element.important=!element.important;
     
    }
   
   })
   localStorage.setItem("notes", JSON.stringify(list));
   showNotes(id);
 
    }
    
// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

