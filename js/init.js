
//Function that finds the cell data in the google spread based on the row and colum labels.
function findIntersectionCell(data, rowLabel, columnLabel) {
  const rowIndex = data.findIndex((row) => row[0] === rowLabel);
  if (rowIndex === -1) return null;

  const headers = data[0];
  const columnIndex = headers.indexOf(columnLabel);
  if (columnIndex === -1) return null;

  return data[rowIndex][columnIndex];
};

function setElementVisibility(elementId, dataKey) {
  const element = document.getElementById(elementId);
  if (!characterData[dataKey]) {
    element.style.display = 'none';
  } else {
    element.style.display = 'block';
  }
};

// I believe this function isn't being used anywhere. But still here just in case.
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

// Function that copies the sheet keeping the original format.
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


function openTab(tabName) {
  // Hide all tab content elements
  const tabContents = document.getElementsByClassName('tab-content');
  for (const tabContent of tabContents) {
    tabContent.classList.remove('active');
  }

  // Deactivate all tab buttons
  const tabButtons = document.getElementsByClassName('tab-button');
  for (const tabButton of tabButtons) {
    tabButton.classList.remove('active');
  }

  // Show the selected tab content and activate the corresponding tab button
  const selectedTab = document.getElementById(tabName);
  const selectedTabButton = document.querySelector(`[onclick="openTab('${tabName}')"]`);
  selectedTab.classList.add('active');
  selectedTabButton.classList.add('active');
}

// Set the default tab when the page loads
openTab('tab1');
