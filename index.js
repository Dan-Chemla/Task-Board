
function restoreData() {
    var notes = [];
    var keys = Object.keys(localStorage);
    for (var i = 0; i < keys.length; i++) {
        notes.push(localStorage.getItem(keys[i]));
    }
    var notesJS = [];
    for (var j = 0; j < notes.length; j++) {
        notesJS.push(JSON.parse(notes[j]));
    }
    for (var i = 0; i < notesJS.length; i++) {
        var note_ID = notesJS[i].id;
        var note_Text = notesJS[i].text;
        var note_Date = notesJS[i].date;
        var note_Time = notesJS[i].time;
        var Rnote = document.createElement("div");
        Rnote.id = note_ID;
        Rnote.setAttribute("class", "newNote col-2 mr-auto");
        var ROW = document.getElementById("ROW");
        var noteText = document.createElement("div");
        noteText.setAttribute("class", "noteText");
        var noteTime = document.createElement("div");
        noteTime.setAttribute("class", "noteTime");
        var xButton = document.createElement("div");
        xButton.setAttribute("class", "xButton");
        xButton.innerHTML = " <img class = 'xIMage' src = 'assets/images/xicon.png' onclick = 'clearNote(parentNode.parentNode.id)'> ";
        noteText.innerText = note_Text;
        noteTime.innerHTML = "Due Date: " + note_Date + "<br>Time: " + note_Time;
        Rnote.appendChild(xButton);
        Rnote.appendChild(noteText);
        Rnote.appendChild(noteTime);
        ROW.appendChild(Rnote);

    }
}

function validation() {
    var taskDescBox = document.getElementById("taskDescBox");
    var dueDateBox = document.getElementById("dueDateBox");
    var taskDescError = document.getElementById("taskDescError");
    var dueDateError = document.getElementById("dueDateError");
    var description = taskDescBox.value;
    var dueDate = dueDateBox.value;

    taskDescBox.style.backgroundColor = "";
    dueDateBox.style.backgroundColor = "";
    taskDescError.innerText = "";
    dueDateError.innerText = "";

    if (description == "") {
        alert("Error!\n Task Description is missing.");
        taskDescBox.style.backgroundColor = "rgb(255, 163, 179)";
        taskDescError.innerText = "**Please enter task description";
        taskDescError.style.color = "red";
        return false;
    }

    if (dueDate == "") {
        alert("Error!\n Due Date is missing.");
        dueDateBox.style.backgroundColor = "rgb(255, 163, 179)";
        dueDateError.innerText = "**Please enter task due date";
        dueDateError.style.color = "red";
        return false;
    }

    var dueDateArr = dueDate.split("-");
    var year = dueDateArr[0];
    var month = dueDateArr[1];
    var day = dueDateArr[2];

    var d = new Date();
    var m = new Date();
    var y = new Date();

    var DD = d.getDate();
    var MM = m.getMonth() + 1;
    var YYYY = y.getFullYear();

    if (year < YYYY || year == YYYY && month < MM || year == YYYY && month == MM && day < DD) {
        alert("Error!\n Invalid Due Date.");
        dueDateBox.style.backgroundColor = "rgb(255, 163, 179)";
        dueDateError.innerText = "**Please enter valid due date";
        dueDateError.style.color = "red";
        return false;
    }

    makeNewNote();
    document.getElementById("setYourNote").reset();
}

function makeNewNote() {
    var newNote = document.createElement("div");
    newNote.id = "div_" + new Date().getTime().toString();
    var noteID = "div_" + new Date().getTime().toString();
    newNote.setAttribute("class", "newNote col-2 mr-auto");

    var noteText = document.createElement("div");
    noteText.setAttribute("class", "noteText");

    var noteTime = document.createElement("div");
    noteTime.setAttribute("class", "noteTime");

    var xButton = document.createElement("div");
    xButton.setAttribute("class", "xButton");
    xButton.innerHTML = " <img class = 'xIMage' src = 'assets/images/xicon.png' onclick = 'clearNote(parentNode.parentNode.id)'> ";

    var taskDescBox = document.getElementById("taskDescBox");
    var dueDateBox = document.getElementById("dueDateBox");
    var dueTimeBox = document.getElementById("dueTimeBox");
    var ROW = document.getElementById("ROW");

    var description = taskDescBox.value;
    var dueDate = dueDateBox.value;
    var dueTime = dueTimeBox.value;

    var dueDateArr = dueDate.split("-");
    var year = dueDateArr[0];
    var month = dueDateArr[1];
    var day = dueDateArr[2];

    noteText.innerText = description;
    noteTime.innerHTML = "Due Date: " + day + "/" + month + "/" + year + "<br>Time: " + dueTime;

    newNote.appendChild(xButton);
    newNote.appendChild(noteText);
    newNote.appendChild(noteTime);
    ROW.appendChild(newNote);

    var id = "id";
    var text = "text";
    var date = "date";
    var time = "time";

    var note = new Object;
    note[id] = noteID;
    note[text] = description;
    note[date] = day + "/" + month + "/" + year;
    note[time] = dueTime;

    setJSON(note);
}

function clearNote(x) {
    var note = document.getElementById(x);
    note.remove();
    localStorage.removeItem(x);
}

function setJSON(note) {
    var noteID = note.id;
    noteID = note;

    var jasonThisNote = JSON.stringify(noteID);
    localStorage.setItem(note.id, jasonThisNote);
}


