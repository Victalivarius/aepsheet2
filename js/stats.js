function die() {
    roll1 = Math.floor((Math.random() * 6) + 1)
    roll2 = Math.floor((Math.random() * 6) + 1)
    roll3 = Math.floor((Math.random() * 6) + 1)
    roll4 = Math.floor((Math.random() * 6) + 1)
  
    const rollsArray = [roll1, roll2, roll3, roll4]
    low = Math.min.apply(Math, rollsArray)
  
    sum = roll1 + roll2 + roll3 + roll4 - low;
    return sum;
  }
  
  /*TODO
  */

  function rollStats() {
    // Roll dice and display scores
    arrayStat = [die(), die(), die(), die(), die(), die()];
    document.getElementById("rolls").innerHTML += arrayStat + `<br>`;
    document.getElementById("strInput").value = arrayStat[0];
    document.getElementById("dexInput").value = arrayStat[1];
    document.getElementById("conInput").value = arrayStat[2];
    document.getElementById("intInput").value = arrayStat[3];
    document.getElementById("wisInput").value = arrayStat[4];
    document.getElementById("chaInput").value = arrayStat[5];

    document.getElementById("strValue").textContent = arrayStat[0];
    document.getElementById("dexValue").textContent = arrayStat[1];
    document.getElementById("conValue").textContent = arrayStat[2];
    document.getElementById("intValue").textContent = arrayStat[3];
    document.getElementById("wisValue").textContent = arrayStat[4];
    document.getElementById("chaValue").textContent = arrayStat[5];
    
    // Update modifiers
    updateModifier('str');
    updateModifier('dex');
    updateModifier('con');
    updateModifier('int');
    updateModifier('wis');
    updateModifier('cha');

    
    // Rotate the image
    const image = document.getElementById("dice_image");
    image.classList.remove("rotate");
    void image.offsetWidth;
    image.classList.add("rotate");
  }
  
  function updateModifier(stat) {
    // Get input and modifier elements
    const input = document.getElementById(`${stat}Input`);
    const mod = document.getElementById(`${stat}Mod`);
    const outputMod = document.getElementById(`${stat}Modifier`);
    const statScore = document.getElementById(`${stat}Value`);
    const outputSkills = document.getElementsByClassName(`${stat}Skills`);

   
    // Calculate modifier and display
    const score = input.value;
    const modifier = Math.floor((score - 10) / 2);
    mod.innerHTML = modifier >= 0 ? `+${modifier}` : modifier;
    outputMod.innerHTML = modifier >= 0 ? `+${modifier}` : modifier;
    statScore.innerHTML = score;
     // Loop through the elements with the class and update their content
     for (let i = 0; i < outputSkills.length; i++) {
      outputSkills[i].innerHTML = modifier >= 0 ? `(${modifier})` : `(${modifier})`;
    }
    
  }
  
  
  document.getElementById("strInput").addEventListener("change", function() {
    updateModifier('str');
  });
  document.getElementById("dexInput").addEventListener("change", function() {
    updateModifier("dex");
  });
  document.getElementById("conInput").addEventListener("change", function() {
    updateModifier('con');
  });
  document.getElementById("intInput").addEventListener("change", function() {
    updateModifier('int');
  });
  document.getElementById("wisInput").addEventListener("change", function() {
    updateModifier('wis');
  });
  document.getElementById("chaInput").addEventListener("change", function() {
    updateModifier('cha');
  });

  
  // Add event listener to roll stats button
  const rollStatsButton = document.getElementById("roll-stats-button");
  rollStatsButton.addEventListener("click", rollStats);


  const tabList = document.querySelector('.tab-list');
const tabs = tabList.querySelectorAll('li');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    // remove active class from all tabs and tab contents
    tabs.forEach((t) => t.classList.remove('active'));
    tabContents.forEach((tc) => tc.classList.remove('active'));
    // add active class to clicked tab and corresponding tab content
    tab.classList.add('active');
    const tabId = tab.getAttribute('data-tab');
    document.querySelector(`#${tabId}`).classList.add('active');
  });
});
