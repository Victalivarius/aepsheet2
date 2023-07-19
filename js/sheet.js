///////////////////////////////VARIABLES////////////////////////////////

let characterData = {
    race: "",
    subrace: "",
    lineage: "",
    mutation: "",
    class: "",
    background: "",
    stats: {},
    proficiencies: [],
    features: [],
    languages: [],
    speed: 0,
    hitDice: "",
    indications: "",
    description: "",
  };

let SPREADSHEET_ID = '1_WR7ZR-NvvDnmdwbPQkz5tpzejk28eX8WA9NrmA2_64'

const SHEET_RACES = 'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/gviz/tq?sheet=RACES&range=A1:V17'
const SHEET_TRIBESCLANS = 'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/gviz/tq?sheet=' + 'TRIBESCLANS' + '&range=' + 'A1:H17';
const SHEET_BACKGROUNDS = 'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/gviz/tq?sheet=BACKGROUNDS&range=A1:I47'
const SHEET_CLASSES = 'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/gviz/tq?sheet=CLASSES&range=A1:J17'

  
///////////////////////////////VARIABLES////////////////////////////////

    //inputs
    let DIVbasicInfo = document.getElementById('DIVbasicInfo');
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
    //outputs
    let output_character_name = document.getElementById('output_character_name');
    let output_player_name = document.getElementById('output_player_name'); 
    let output_race_traits = document.getElementById('output_race_traits');
    let output_race_name = document.getElementById('output_race_name');
    let output_languages = document.getElementById('output_languages');
    let output_subrace = document.getElementById('output_subrace');
    let output_mutant = document.getElementById('output_mutant');
    let output_lineage = document.getElementById('output_lineage');
    let output_lineage_traits = document.getElementById('output_lineage_traits');
    let output_mutant_traits = document.getElementById('output_mutant_traits');
    let output_subrace_traits = document.getElementById('output_subrace_traits');
    let output_class_features = document.getElementById('output_class_features');
    let hitdice = document.getElementById('hitdice');
    let output_HP = document.getElementById('output_HP');
    // console.log(data.table.rows[0].c[0]);
    //indications
    let class_indications = document.getElementById('class_indications');


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
////////////////////////////////////////////////////////////////////////////////////////

fetch(SHEET_RACES)
 .then(res => res.text())
 .then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0,-2));
   
 
// RACE SELECT INPUT
data.table.rows.forEach((row) => {
  const option = document.createElement('option');
  option.value = row.c[0].v; // the race name is in the first cell of each row
  option.innerHTML = row.c[0].v;
  race_select.appendChild(option);
});

race_select.addEventListener('change', (event) => {
  const selectedRace = event.target.value;
  const selectedRow = data.table.rows.find((row) => row.c[0].v === selectedRace);

  characterData.race = selectedRace;

  // Assign race features to characterData.features
  assignValueToCharacterData('features', selectedRow, 3);

  // Assign race speed to characterData.speed
  assignValueToCharacterData('speed', selectedRow, 5);

  // Assign race languages to characterData.languages
  assignValueToCharacterData('languages', selectedRow, 4);

  
  console.log('Race information set successfully');
});



/////////////////////////////////////////////////////////////////////////////////
  // // // /// /////////////LINEAGES, MUTANT,  SUBRACE///////// ////// // /// /////
/////////////////////////////////////////////////////////////////////////////////


// Event listener for the lineage checkbox
input_lineage_checkbox.addEventListener("change", function() {
  if (input_lineage_checkbox.checked) {

    data.table.rows.forEach((row) => {
      if (row.c[9]) {
        const option = document.createElement("option");
        option.value = row.c[9].v;
        option.text = row.c[9].v;
        lineage_select.appendChild(option);
      }
    });

    lineage_select.addEventListener('change', (event) => {
      const selectedLineage = event.target.value;
      const selectedRow = data.table.rows.find((row) => row.c[9].v === selectedLineage);
      output_lineage.innerHTML = '<b>' + `Lineage:`+ '</b>' +  selectedLineage;
      output_lineage_traits.innerHTML =  '<br>' + selectedRow.c[10].v.replace(/\n/g, '<br>');

    });

    output_lineage_traits.style.display = "block"
    lineage_select_div.style.display = "block";
    output_lineage.style.display = "block";

  } else {
    output_lineage_traits.style.display = "none"
    lineage_select_div.style.display = "none";
    output_lineage.style.display = "none";
  }
});

// Event listener for the mutant checkbox
input_mutant_checkbox.addEventListener("change", function() {

  if (input_mutant_checkbox.checked) {
    data.table.rows.forEach((row) => {
      if (row.c[19]) {
        const option = document.createElement("option");
        option.value = row.c[19].v;
        option.text = row.c[19].v;
        mutant_select.appendChild(option);
        // console.log(row.c[19].v)
      }
    });

    mutant_select.addEventListener('change', (event) => {
      const selectedMutant = event.target.value;
      const selectedRow = data.table.rows.find((row) => row.c[19].v === selectedMutant);
      output_mutant.innerHTML = '<b>' + `Mutation:`+ '</b>'+ selectedMutant;
  
      output_mutant_traits.innerHTML =  '<br>' + "+----------------"+ selectedMutant + " MUTATION TRAITS------------------+" + '<br>' +  selectedRow.c[20].v.replace(/\n/g, '<br>');
    });

    output_mutant_traits.style.display = "block"
    mutant_select_div.style.display = "block";
    output_mutant.style.display = "block";

  } else {
    output_mutant_traits.style.display = "none"
    mutant_select_div.style.display = "none";
    output_mutant.style.display = "none";
  }
});

// Event listener for the subrace checkbox
input_subrace_checkbox.addEventListener("change", function() {
  if (input_subrace_checkbox.checked) {
    data.table.rows.forEach((row) => {
      if (row.c[12]) {
        const option = document.createElement("option");
        option.value = row.c[12].v;
        option.text = row.c[12].v;
        subrace_select.appendChild(option);
        // console.log(row.c[12].v)
      }
    });

        subrace_select.addEventListener('change', (event) => {
          const selectedSubrace = event.target.value;
          characterData.subrace = selectedSubrace;
          htmlData();
        });
    
        output_subrace_traits.style.display = "block"
        subrace_select_div.style.display = "block";
      
    
      } else {
        output_subrace_traits.style.display = "none"
        subrace_select_div.style.display = "none";
      
        characterData.subrace = '';
        htmlData();
      }
    });

});





/////////////////////////////////
//  CLASSESS /////////////////
/////////////////////////////////

fetch(SHEET_CLASSES)
 .then(res => res.text())
 .then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0,-2));
    console.log(data.table.rows[0].c)
   
//Puts class options in the select
   data.table.rows.forEach((row) => {
    const option = document.createElement('option');
    option.value = row.c[0].v; // the class name is in the first cell of each row
    option.innerHTML = row.c[0].v;
    class_select.appendChild(option);
  });

//Updates class data to the sheet
  function updateClass(selectedClass) {
    const selectedRow = data.table.rows.find((row) => row.c[0].v === selectedClass);
  
    output_class_name.innerHTML = selectedClass;
    updateInnerHTML(output_class_features, selectedRow, 4);
    updateInnerHTML(class_stats, selectedRow, 1);
    updateInnerHTML(hitdice, selectedRow, 5);
  
  }

  //Calls updateClass when changed
class_select.addEventListener('change', (event) => {
  updateClass(event.target.value)
  console.log('Class information set successfully');
});

});

 
////////////BACKGROUNDS/////////////////////////////

// Declare a variable to store the selected backgrounds
let selectedBackgrounds = [];

fetch(SHEET_BACKGROUNDS)
.then(res => res.text())
.then(rep => {
   let data = JSON.parse(rep.substr(47).slice(0,-2));
   console.log(data.table.rows[0].c)
  /////////////////////////////////////////////////////////////////////////////////

  //Adds background options to the select.
  data.table.rows.forEach((row) => {
   const option = document.createElement('option');
   option.value = row.c[0].v; // the class name is in the first cell of each row
   option.innerHTML = row.c[0].v;
   background_select.appendChild(option);
 });


const background_languages = document.getElementById('background_languages');
const output_background_features = document.getElementById('output_background_features');
const background_stats = document.getElementById('background_stats');
const output_background_name = document.getElementById('output_background_name');

function updateBackgrounds(selectedBackgrounds) {
  // Reset the background information
  let allBackgroundFeatures = ""; // Variable to store concatenated background features
  let allBackgroundStats = ""; // Variable to store concatenated background proficiencies
  let allBackgroundLanguages = ""; // Variable to store concatenated background languages

  selectedBackgrounds.forEach((selectedBackground) => {
    const selectedRow = data.table.rows.find((row) => row.c[0].v === selectedBackground);

    if (selectedRow) {
      updateInnerHTML(output_background_features, selectedRow, 3,  "<br>" + "<br>" + "<b>+---------------" + selectedBackground + " features----------------+</b>" + "<br>");
      updateInnerHTML(background_stats, selectedRow, 1, "Background proficiencies:");
      updateInnerHTML(background_languages, selectedRow, 4, "(" + selectedBackground + ")");

      allBackgroundFeatures += output_background_features.innerHTML;
      allBackgroundStats += background_stats.innerHTML;
      allBackgroundLanguages += background_languages.innerHTML;

      console.log(`Background '${selectedBackground}' information set successfully`);
    } else {
      console.log(`Background '${selectedBackground}' not found in the data`);
    }
  });

  // Update the background features, proficiencies, and languages on the sheet
  output_background_features.innerHTML = allBackgroundFeatures;
  background_stats.innerHTML = allBackgroundStats;
  background_languages.innerHTML = allBackgroundLanguages;

  // Update the background name on the sheet
  output_background_name.innerHTML = selectedBackgrounds;
}


background_select.addEventListener('change', (event) => {
  const selectedBackground = event.target.value;

  // Push the selected background to the array
  selectedBackgrounds.push(selectedBackground);

  // Call the updateBackgrounds function to update the sheet with all selected backgrounds
  updateBackgrounds(selectedBackgrounds);

  // Update the HTML to display the selected backgrounds
  document.getElementById("selected_backgrounds").innerHTML = `${selectedBackgrounds} <button onclick="clearSelectedBackgrounds()">Clear Backgrounds</button>`;
});

});

// Define the clearSelectedBackgrounds function in the global scope
function clearSelectedBackgrounds() {
  // Clear the selected backgrounds array
  selectedBackgrounds = [];

  // Clear the HTML to remove the selected backgrounds display
  document.getElementById("selected_backgrounds").innerHTML = "";

  output_background_features.innerHTML = "";
  background_stats.innerHTML = "";
  background_languages.innerHTML = "";
  // Update the background name on the sheet
  output_background_name.innerHTML = "";
}

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
