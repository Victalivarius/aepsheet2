///////////////////////////////VARIABLES////////////////////////////////


let characterData = {
  race: "",
  subrace: "",
  lineage: "",
  mutant: "",
  class: "",
  background: [],

  stats: {
    str: { value: 0, modifier: 0 },
    dex: { value: 0, modifier: 0 },
    con: { value: 0, modifier: 0 },
    int: { value: 0, modifier: 0},
    wis: { value: 0, modifier: 0},
    charisma: { value: 0, modifier: 0},
    race: [],
    class: [],
    subclass: [],
    lineage: [],
    mutant: [],
    subrace: [],
    background: [],
  },

  features: {
    race: [],
    class: [],
    subclass: [],
    lineage: [],
    mutant: [],
    subrace: [],
    background: [],
  },
  languages: {
    race: [],
    class: [],
    subclass: [],
    lineage: [],
    subrace: [],
    background: [],
  },
  speed: {
    race: [],
    subrace: [],
  },
  hitDice: {
    class: [],
    subclass: [],
  },
  indications: "",
  description: "",
};


const API_KEY = 'AIzaSyBj_VysQML-QtRb4vugeohwvyJ-6IX9odw';
const SPREADSHEET_ID = '1_WR7ZR-NvvDnmdwbPQkz5tpzejk28eX8WA9NrmA2_64';

const SHEET_RACES = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/RACES?key=${API_KEY}`;
const SHEET_LINEAGES = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/LINEAGES?key=${API_KEY}`;
const SHEET_MUTATION = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/MUTATION?key=${API_KEY}`;
const SHEET_SUBRACES = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/SUBRACES?key=${API_KEY}`;
const SHEET_TRIBESCLANS = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/TRIBESCLANS?key=${API_KEY}`;
const SHEET_BACKGROUNDS = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/BACKGROUNDS?key=${API_KEY}`;
const SHEET_CLASSES = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/CLASSES?key=${API_KEY}`;

htmlData();

///////////////////////////////VARIABLES////////////////////////////////

//inputs
let race_select = document.getElementById('race_select');
let input_character_name = document.getElementById('input_character_name');
let input_player_name = document.getElementById('input_player_name');
let input_mutant_checkbox = document.getElementById('input_mutant_checkbox');
let input_lineage_checkbox = document.getElementById('input_lineage_checkbox');
let input_subrace_checkbox = document.getElementById('input_subrace_checkbox');
let input_level = document.getElementById('input_level');
const lineage_select_div = document.getElementById("lineage_select_div");
const lineage_select = document.getElementById("lineage_select");
const mutant_select_div = document.getElementById("mutant_select_div");
const mutant_select = document.getElementById("mutant_select");
const subrace_select_div = document.getElementById("subrace_select_div");
const subrace_select = document.getElementById("subrace_select");

////////////////////////////////////////////////////////////////////////////////////////                  

// CHARACTER NAME
input_character_name.addEventListener('change', (event) => {
  characterData.name = event.target.value;
  htmlData();
  console.log('Character name updated successfully');
});

// PLAYER NAME
input_player_name.addEventListener('change', (event) => {
  characterData.player = event.target.value;
  htmlData();
  console.log('Player name updated successfully');
});

// ALIGNMENT
alignment_select.addEventListener('change', (event) => {
  characterData.alignment = event.target.value;
  htmlData();
  console.log('Alignment updated successfully');
});

// LEVEL
input_level.addEventListener('change', (event) => {
  characterData.level = event.target.value;
  output_level.innerHTML = characterData.level;

  if (characterData.level >= 3) {
    class_indications.innerHTML = "Level 3: +5 HP";
  }

  if (characterData.level >= 5) {
    class_indications.innerHTML = "Level 3: +5 HP <br> Level 5: +5 HP and one extra Spell Slot if you are a caster or if you are a combat user you’d be gifted the Parry Reaction";
  }

  if (characterData.level >= 10) {
    class_indications.innerHTML += " <br>Level 10: You can now unlock the Multi-Attack! You can attack x2 in a row, the ability is open to all classes so long you attack with a weapon";
  }
});

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

//RACES
fetch(SHEET_RACES)
  .then(response => response.json())
  .then(data => {
    const rows = data.values;

    // Extract the race names from the first column (skip the header row)
    const races = rows.slice(1).map(row => row[0]);

    // race select dropdown.
    races.forEach(race => {
      const option = document.createElement('option');
      option.value = race;
      option.textContent = race;
      race_select.appendChild(option);

      function updateRace() {
        const selectedRace = race_select.value;
        characterData.race = selectedRace;
        characterData.features.race = findIntersectionCell(rows, selectedRace, 'features_race');
        characterData.languages.race = findIntersectionCell(rows, selectedRace, 'languages_race');
        characterData.speed.race = findIntersectionCell(rows, selectedRace, 'speed_race');
        characterData.stats.race = findIntersectionCell(rows, selectedRace, 'stats_race');
        console.log(characterData.features.race);
        htmlData();
      }

      race_select.addEventListener('change', () => {
        updateRace();
      });
    })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });

//LINEAGES
fetch(SHEET_LINEAGES)
  .then(response => response.json())
  .then(data => {
    const rows = data.values;
    // Event listener for the lineage checkbox
    input_lineage_checkbox.addEventListener('change', function () {
      if (input_lineage_checkbox.checked) {
        const lineages = rows.slice(1).map(row => row[0]);
        console.log(lineages);

        // Fill lineage select dropdown.
        lineages.forEach(lineage => {
          const option = document.createElement('option');
          option.value = lineage;
          option.textContent = lineage;
          lineage_select.appendChild(option);
        });

        lineage_select.addEventListener('change', (event) => {
          const selectedLineage = event.target.value;
          characterData.lineage = selectedLineage;

          // Assign lineage features to characterData.features_lineage
          characterData.features.lineage = findIntersectionCell(rows, selectedLineage, 'features_lineage');
          console.log(findIntersectionCell(rows, selectedLineage, 'features_lineage'));
          htmlData();
          console.log(characterData.features_lineage);
        });

        output_lineage_features.style.display = 'block';
        lineage_select_div.style.display = 'block';
        output_lineage.style.display = 'block';
      } else {
        output_lineage_features.style.display = 'none';
        lineage_select_div.style.display = 'none';
        output_lineage.style.display = 'none';
        characterData.lineage = '';
        characterData.features.lineage = '';
        htmlData();
      }
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

//MUTATION
fetch(SHEET_MUTATION)
  .then(response => response.json())
  .then(data => {
    const rows = data.values;
    // Event listener for the lineage checkbox
    input_mutant_checkbox.addEventListener('change', function () {
      if (input_mutant_checkbox.checked) {
        const mutant = rows.slice(1).map(row => row[0]);
        console.log(mutant);

        // Fill mutation select dropdown.
        mutant.forEach(mutant => {
          mutant
          const option = document.createElement('option');
          option.value = mutant;
          option.textContent = mutant;
          mutant_select.appendChild(option);
        });

        mutant_select.addEventListener('change', (event) => {
          const selectedMutant = event.target.value;
          characterData.mutant = selectedMutant;

          characterData.features.mutant = findIntersectionCell(rows, selectedMutant, 'features_mutant');
          console.log(findIntersectionCell(rows, selectedMutant, 'features_mutant'));
          htmlData();
          console.log(characterData.features_mutant);
        });

        output_mutant_features.style.display = 'block';
        mutant_select_div.style.display = 'block';
        output_mutant.style.display = 'block';
      } else {
        output_mutant_features.style.display = 'none';
        mutant_select_div.style.display = 'none';
        output_mutant.style.display = 'none';
        characterData.mutant = '';
        characterData.features.mutant = '';
        htmlData();
      }
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

//SUBRACES
fetch(SHEET_SUBRACES)
  .then(response => response.json())
  .then(data => {
    const rows = data.values;

    // Event listener for the subrace checkbox
    input_subrace_checkbox.addEventListener('change', function () {
      if (input_subrace_checkbox.checked) {
        const subraces = rows.slice(1).map(row => row[0]);
        console.log(subraces);

        // Fill subrace select dropdown.
        subraces.forEach(subrace => {
          const option = document.createElement('option');
          option.value = subrace;
          option.textContent = subrace;
          subrace_select.appendChild(option);
        });

        subrace_select.addEventListener('change', (event) => {
          const selectedSubrace = event.target.value;
          characterData.subrace = selectedSubrace;

          characterData.features.subrace = findIntersectionCell(rows, selectedSubrace, 'features_subrace');
          console.log(findIntersectionCell(rows, selectedSubrace, 'features_subrace'));
          characterData.stats_subrace = findIntersectionCell(rows, selectedSubrace, 'stats_subrace');
          console.log(characterData.stats_subrace);
          htmlData();
          console.log(characterData.features.subrace);
        });

        subrace_select_div.style.display = 'block';
      } else {
        subrace_select_div.style.display = 'none';
        characterData.subrace = '';
        characterData.features.subrace = '';
        htmlData();
      }
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


/////////////////////////////////
//  CLASSESS /////////////////
/////////////////////////////////

fetch(SHEET_CLASSES)
  .then(response => response.json())
  .then(data => {
    const rows = data.values;

    // Extract the class names from the first column (skip the header row)
    const classes = rows.slice(1).map(row => row[0]);

    // Populate the class select dropdown
    classes.forEach(className => {
      const option = document.createElement('option');
      option.value = className;
      option.textContent = className;
      class_select.appendChild(option);
    });

    // Updates class data to the sheet
    function updateClass(selectedClass) {
      characterData.class = selectedClass;
      characterData.features.class = findIntersectionCell(rows, selectedClass, 'features_class');
      characterData.hitDice = findIntersectionCell(rows, selectedClass, 'hit_dice');
      htmlData(); // Call the htmlData function to update the sheet

      console.log('Class information set successfully');
    }

    // Calls updateClass when changed
    class_select.addEventListener('change', event => {
      updateClass(event.target.value);
    });

  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


////////////BACKGROUNDS/////////////////////////////

// Declare a variable to store the selected backgrounds
let selectedBackgrounds = [];

fetch(SHEET_BACKGROUNDS)
  .then(response => response.json())
  .then(data => {
    const rows = data.values;

    // Adds background options to the select.
    rows.slice(1).forEach(row => {
      const option = document.createElement('option');
      option.value = row[0];
      option.textContent = row[0];
      background_select.appendChild(option);
    });
    function updateBackgrounds(selectedBackgrounds) {
      // Reset the background information
      const output_background_stats = document.getElementById('output_background_stats');
      const output_background_features = document.getElementById('output_background_features');
    
      characterData.stats.background = {};
      characterData.features.background = {};
    
      selectedBackgrounds.forEach(selectedBackground => {
        const selectedRow = rows.find(row => row[0] === selectedBackground);
    
        if (selectedRow) {
          characterData.stats.background[selectedBackground] = findIntersectionCell(rows, selectedBackground, 'stats_background');
          characterData.features.background[selectedBackground] = findIntersectionCell(rows, selectedBackground, 'features_background');
    
          console.log(`Background '${selectedBackground}' information set successfully`);
        } else {
          console.log(`Background '${selectedBackground}' not found in the data`);
        }
      });
    
      // Clear the existing content
      output_background_stats.innerHTML = '';
      output_background_features.innerHTML = '';
    
      // Update the HTML to display background stats and features
      Object.keys(characterData.stats.background).forEach(selectedBackground => {
        const stats = characterData.stats.background[selectedBackground];
        const features = characterData.features.background[selectedBackground];
    
        if (stats && features) {
          const statsDiv = document.createElement('div');
          statsDiv.innerHTML = `
            <b>${selectedBackground} proficiencies</b><br>
            ${stats || ''}
            <br>
          `;
          output_background_stats.appendChild(statsDiv);
    
          const featuresDiv = document.createElement('div');
          featuresDiv.innerHTML = `
            <b>${selectedBackground} Background Features</b><br>
            ${features || ''}
            <br>
          `;
          output_background_features.appendChild(featuresDiv);
        }
      });
    
      htmlData();
    };
    
    



    background_select.addEventListener('change', (event) => {
      const selectedBackground = event.target.value;

      // Push the selected background to the array
      selectedBackgrounds.push(selectedBackground);

      // Call updateBackgrounds function to update the sheet with all selected backgrounds
      updateBackgrounds(selectedBackgrounds);

      // Update the HTML menu to display the selected backgrounds
      document.getElementById("selected_backgrounds").innerHTML = `${selectedBackgrounds} <button onclick="clearSelectedBackgrounds()">Clear Backgrounds</button>`;
    });

  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


function clearSelectedBackgrounds() {
  // Clear the selected backgrounds array
  selectedBackgrounds = [];

  // Clear the HTML to remove the selected backgrounds display
  document.getElementById("selected_backgrounds").innerHTML = "";

  output_background_features.innerHTML = "";
  output_background_stats.innerHTML = "";
  background_languages.innerHTML = "";

  // reset background info in characterData object
  characterData.background = ""
  characterData.stats.background = [];
  characterData.features.background = [];
  characterData.languages.background = [];
  output_background_stats.innerHTML = "";
  output_background_features.innerHTML = "";


  htmlData();
}


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

function writeSheets() {
  //Respective functions to update the sheets
  //google, discord, discord short.
}

//Function that writes the Google Docs character sheet data.
function htmlData() {

  const DIVbasicInfo = document.getElementById('DIVbasicInfo');
  const DIVClassInfo = document.getElementById('DIVClassInfo');
  const DIVFeatures = document.getElementById('DIVFeatures');
  const indications = document.getElementById('indications');

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
    <t id="output_speed">${characterData.speed.race || ''}</t>
    <t id="lineage_speed">${characterData.speed.lineage || ''}</t>
    <t id="subrace_speed">${characterData.speed.subrace || ''}</t>
    <t id="mutant_speed">${characterData.speed.mutant || ''}</t>
  `;


  DIVClassInfo.innerHTML = `
  <b>Class:</b>${characterData.class || ''}
                <t id="output_class_name"></t><br>
                <b>Background(s):</b> ${characterData.background ? characterData.background.join(', ') : ''}</t><br>
                <b>Level:</b>
                <t id="output_level"></t><br>
                <b>HP:</b></t>${characterData.hitDice || ''}<br>
                <b>AC:</b>
                <t id="output_AC"></t><br>
                <b>Initiative: ${characterData.stats.dex.modifier || ''}</b>
                <t id="output_Initiative">  </t><br>

               
  `

  indications.innerHTML = ` 
  Must be done manually
  
  <div id="stat">
  ${characterData.race || ''}
  ${characterData.stats.race || ''}<br>
  ${characterData.subrace || ''}
  ${characterData.stats.subrace || ''}<br>
 </div>`

  DIVFeatures.innerHTML = `
  <div id="output_race_features" style="white-space: pre-line;">  <b>${characterData.race || ''}</b>  <br> ${characterData.features.race || ''}<br></div>
  <div id="output_lineage_features" style="white-space: pre-line;">  <b>${characterData.lineage || ''}</b>  <br> ${characterData.features.lineage || ''}<br></div>
  <div id="output_mutant_features" style="white-space: pre-line;">  <b>${characterData.mutant || ''}</b>  <br> ${characterData.features.mutant || ''}<br></div>
  <div id="output_subrace_features" style="white-space: pre-line;"> <b>${characterData.subrace || ''}</b> <br>  ${characterData.features.subrace || ''}<br></div>
  <div id="output_class_features" style="white-space: pre-line;"> <b>${characterData.class || ''}</b> <br>  ${characterData.features.class || ''}<br></div>
`;

  //backgrund features are written in it's own function updateBackgrounds()

  setElementVisibility('output_lineage', 'subrace');
  setElementVisibility('output_mutant', 'mutant');
  setElementVisibility('output_lineage', 'lineage');
  setElementVisibility('output_player', 'player');


  htmlInfo()
};



function htmlInfo() {
  const DIVLinks = document.getElementById('DIVLinks');

  let classLinkHTML = '';
  if (characterData.class) {
    classLinkHTML = `<a href='https://www.dandwiki.com/wiki/${characterData.class}_(5e_Class)'>Wiki ${characterData.class}</a>`;
  }

  DIVLinks.innerHTML = classLinkHTML;
};


// let featuresHTML = '';

// // Create a helper function to add feature content if it's not empty
// function addFeatureContent(title, content) {
//   if (content && content.trim() !== '') {
//     featuresHTML += `
//       <div style="white-space: pre-line;">
//         <b>${title}</b><br>${content}<br>
//       </div>
//       <br>
//     `;
//   }
// }
