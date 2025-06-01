const notesContainer = document.querySelector('.notes-container');
const createNoteButton = document.getElementById('create-note');

function showNotes() {
  const notesData = JSON.parse(localStorage.getItem("notes")) || [];
  notesContainer.innerHTML = "";

  notesData.forEach(note => {
    const textBox = document.createElement('p');
    const img = document.createElement('img');

    textBox.className = "input-box";
    textBox.setAttribute("contenteditable", "true");
    textBox.dataset.id = note.id;
    textBox.innerText = note.content;

    img.src = "notes-app-img/delete.png"; // Make sure this image exists
    textBox.appendChild(img);
    notesContainer.appendChild(textBox);
  });
}

function updateStorage() {
  const notes = document.querySelectorAll('.input-box');
  const notesArray = [];

  notes.forEach(note => {
    notesArray.push({
      id: Number(note.dataset.id),
      content: note.innerText.replace("delete", "").trim(),
      createdAt: new Date().toISOString()
    });
  });

  localStorage.setItem("notes", JSON.stringify(notesArray));
}

createNoteButton.addEventListener('click', () => {
  const noteId = Date.now(); // Unique ID
  const note = {
    id: noteId,
    content: "",
    createdAt: new Date().toISOString()
  };

  const notesData = JSON.parse(localStorage.getItem("notes")) || [];
  notesData.push(note);
  localStorage.setItem("notes", JSON.stringify(notesData));
  showNotes();
});

notesContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    const parent = e.target.parentElement;
    const noteId = Number(parent.dataset.id);

    let notesData = JSON.parse(localStorage.getItem("notes")) || [];
    notesData = notesData.filter(note => note.id !== noteId);
    localStorage.setItem("notes", JSON.stringify(notesData));
    showNotes();
  } else if (e.target.tagName === 'P') {
    e.target.onkeyup = () => {
      updateStorage();
    };
  }
});

showNotes(); // Load notes on startup
