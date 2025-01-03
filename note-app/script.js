const $btnEl = $("#btn");
const $appEl = $("#app");

// Load notes from localStorage and render them
getNotes().forEach((note) => {
  const $noteEl = createNoteEl(note.id, note.content);
  $noteEl.insertBefore($btnEl);
});

// Function to create a note element
function createNoteEl(id, content) {
  const $element = $("<textarea>")
    .addClass("note form-control")
    .attr("placeholder", "Empty Note")
    .val(content);

  // Double-click to delete the note
  $element.on("dblclick", () => {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(id, $element);
    }
  });

  // Update note content on input
  $element.on("input", () => {
    updateNote(id, $element.val());
  });

  return $element;
}

// Function to delete a note
function deleteNote(id, $element) {
  const notes = getNotes().filter((note) => note.id !== id);
  saveNotes(notes);
  $element.remove();
}

// Function to update a note
function updateNote(id, content) {
  const notes = getNotes();
  const target = notes.find((note) => note.id === id);
  if (target) {
    target.content = content;
    saveNotes(notes);
  }
}

// Function to add a new note
function addNote() {
  const notes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const $noteEl = createNoteEl(noteObj.id, noteObj.content);
  $noteEl.insertBefore($btnEl);

  notes.push(noteObj);
  saveNotes(notes);
}

// Function to save notes to localStorage
function saveNotes(notes) {
  localStorage.setItem("note-app", JSON.stringify(notes));
}

// Function to get notes from localStorage
function getNotes() {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}

// Event listener for the add note button
$btnEl.on("click", addNote);
