registerComponent(
  "91952fa55f7d42fc8f565f071b583d7d",
  async function notes(doc, load) {
    return function (components) {
      return async function (activeConnection, prefix, name, element) {
        const newNoteButton = doc.createElement("button");
        newNoteButton.textContent = "+";
        element.appendChild(newNoteButton);
        const existingNotes = JSON.parse(
          (await activeConnection.getItem(`${prefix}:${name}`)) || "[]"
        );
        function openNote(text) {
          const noteElement = doc.createElement("textarea");
          noteElement.value = text;
          element.appendChild(noteElement);
        }
        for (const text of existingNotes) {
          openNote(text);
        }
        function newNote() {
          existingNotes.push("");
          openNote("");
        }
        return {
          get notes() {
            return existingNotes;
          },
          newNote,
        };
      };
    };
  }
);
