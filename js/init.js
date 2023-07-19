function htmlData() {
  const DIVbasicInfo = document.getElementById('DIVbasicInfo');

  DIVbasicInfo.innerHTML = `═════════<br><h2>${characterData.name|| ''}</h2>═════════
  <br>
  Player:${characterData.player|| ''}
    <br>
    <b>Race:</b>
    <t id="output_race_name">${characterData.race || ''}</t>
    <br>
    <t id="output_lineage">${characterData.lineage || ''}</t>
    
    <t id="output_mutant">${characterData.mutation || ''}</t>
    
    <t id="output_subrace"><b>Subrace:</b>${characterData.subrace ? `<t id="output_subrace">${characterData.subrace}</t><br>` : ''}
    
    <b>Languages:</b>
    <t id="background_languages">${characterData.languages || ''}</t>
    <br>
    <b>Alignment:</b>
    <t id="output_alignment">${characterData.alignment || ''}</t>
    <br>
    <b>Speed:</b>
    <t id="output_speed">${characterData.speed || ''}</t>
    <t id="race_speed">${characterData.raceSpeed || ''}</t>
    <t id="lineage_speed">${characterData.lineageSpeed || ''}</t>
    <t id="subrace_speed">${characterData.subraceSpeed || ''}</t>
    <t id="mutation_speed">${characterData.mutationSpeed || ''}</t>
  `;

  const outputSubrace = document.getElementById('output_subrace');
  if (!characterData.subrace) {
    outputSubrace.style.display = 'none';
  } else {
    outputSubrace.style.display = 'block';
  }

  console.log("Sheet updated successfully");
};

// Helper function to assign values to characterData object
function assignValueToCharacterData(property, rowData, columnIndex) {
  if (rowData && rowData.c[columnIndex]) {
    characterData[property] = rowData.c[columnIndex].v;
  } else {
    characterData[property] = '';
  }
}

function updateInnerHTML(element, rowData, columnIndex, title) {
  if (rowData && rowData.c[columnIndex] && rowData.c[columnIndex].v) {
    let html = '';
    if (title) {
      html += title;
    }
    html += rowData.c[columnIndex].v.replace(/\n/g, '<br>');
    element.innerHTML = html;
  } else {
    element.innerHTML = "";
  }
};

function copySheet() {
  const sheetContainer = document.getElementById('result');
  const body = document.body;
  
  // Store the original background colors
  const originalSheetBackgroundColor = sheetContainer.style.backgroundColor;
  const originalBodyBackgroundColor = body.style.backgroundColor;
  
  // Set the background colors to transparent
  sheetContainer.style.backgroundColor = 'transparent';
  body.style.backgroundColor = 'transparent';
  
  // Create a range and select the sheet container
  const range = document.createRange();
  range.selectNode(sheetContainer);
  
  // Copy the selected range
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
  
  // Restore the original background colors
  sheetContainer.style.backgroundColor = originalSheetBackgroundColor;
  body.style.backgroundColor = originalBodyBackgroundColor;
  
   // Show the copy message
   const copyMessage = document.getElementById('copy-message');
   copyMessage.style.display = 'block';
 
   // Hide the copy message after 5 seconds
   setTimeout(() => {
     copyMessage.style.display = 'none';
   }, 2000);
};