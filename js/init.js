// Helper function to assign values to characterData object


function findIntersectionCell(data, rowLabel, columnLabel) {
  const rowIndex = data.findIndex((row) => row[0] === rowLabel);
  if (rowIndex === -1) return null;

  const headers = data[0];
  const columnIndex = headers.indexOf(columnLabel);
  if (columnIndex === -1) return null;

  return data[rowIndex][columnIndex];
};







function htmlData() {
  const DIVbasicInfo = document.getElementById('DIVbasicInfo');
  const DIVClassInfo = document.getElementById('DIVClassInfo');
  const DIVFeatures = document.getElementById('DIVFeatures');

  DIVbasicInfo.innerHTML = `═════════<br><h2>${characterData.name || ''}</h2>═════════
    <t id="output_player">Player:${characterData.player || ''}</t>
    <br>
    
    <t id="output_race_name"><b>Race:</b>${characterData.race || ''}</t>
    <br>
    
    <t id="output_lineage">${characterData.lineage ? `<b>Lineage:</b> ${characterData.lineage}<br>` : ''}</t>
    <t id="output_mutant">${characterData.mutant ? `<b>Mutant:</b> ${characterData.mutant}<br>` : ''}</t>
    <t id="output_subrace">${characterData.subrace ? `<b>Subrace:</b> ${characterData.subrace}<br>` : ''}</t>
    
    <b>Languages:</b>
    <t id="background_languages">${characterData.languages || ''}</t>
    <br>
    <b>Alignment:</b>
    <t id="output_alignment">${characterData.alignment || ''}</t>
    <br>
    <b>Speed:</b>
    <t id="output_speed">${characterData.speed || ''}</t>
    <t id="lineage_speed">${characterData.speed_lineage || ''}</t>
    <t id="subrace_speed">${characterData.speed_subrace || ''}</t>
    <t id="mutant_speed">${characterData.speed_mutant || ''}</t>
  `;

  DIVClassInfo.innerHTML = `
  <b>Class:</b>${characterData.class || ''}
                <t id="output_class_name"></t><br>
                <b>Background:</b>${characterData.background || ''}</t><br>
                <b>Level:</b>
                <t id="output_level"></t><br>
                <b>HP:</b></t>${characterData.hitDice || ''}<br>
                <b>AC:</b>
                <t id="output_AC"></t><br>
                <b>Initiative:</b>
                <t id="output_Initiative"></t><br>
  `


  DIVFeatures.innerHTML = `
  <div id="output_race_features" style="white-space: pre-line;">   <b>${characterData.race || ''}</b>  <br>  ${characterData.features || ''}</div>
  <br>
  <div id="output_lineage_features" style="white-space: pre-line;">  <b>${characterData.lineage || ''}</b>  <br> ${characterData.features_lineage || ''}</div><br>
  <div id="output_mutant_features" style="white-space: pre-line;">  <b>${characterData.mutant || ''}</b>  <br> ${characterData.features_mutant || ''}</div><br>
  <div id="output_subrace_features" style="white-space: pre-line;"> <b>${characterData.subrace || ''}</b> <br>  ${characterData.features_subrace || ''}</div><br>
  <div id="output_class_features" style="white-space: pre-line;"> <b>${characterData.class || ''}</b> <br>  ${characterData.features_class || ''}</div><br>
  <div id="output_background_features" style="white-space: pre-line;"> <b>${characterData.background || ''}</b> <br>  ${characterData.features_background || ''}</div><br>
`;


  const outputSubrace = document.getElementById('output_subrace');
  if (!characterData.subrace) {
    outputSubrace.style.display = 'none';
  } else {
    outputSubrace.style.display = 'block';
  }

  const outputMutant = document.getElementById('output_mutant');
  if (!characterData.mutant) {
    outputMutant.style.display = 'none';
  } else {
    outputMutant.style.display = 'block';
  }

  const outputLineage = document.getElementById('output_lineage');
  if (!characterData.lineage) {
    outputLineage.style.display = 'none';
  } else {
    outputLineage.style.display = 'block';
  }

  const outputPlayer = document.getElementById('output_player');
  if (!characterData.player) {
    outputPlayer.style.display = 'none';
  } else {
    outputPlayer.style.display = 'block';
  }

  console.log("Sheet updated successfully");
};




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