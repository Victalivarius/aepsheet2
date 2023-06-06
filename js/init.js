

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