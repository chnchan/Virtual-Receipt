var entries = document.querySelectorAll(".entries");
var temp = entries[entries.length-1].getElementsByTagName("input");
entries[entries.length-1].addEventListener("change", calculate);


for (var i = 0; i < temp.length; i++)
{
  if (temp[i].className == "money")
  {
    temp[i].addEventListener("change", addInput);
    temp[i].addEventListener("change", roundUp2decimal);
  }

  if (temp[i].className == "itemNum")
    temp[i].addEventListener("change", roundDown);
}

temp = document.querySelectorAll(".editable");

for (var i = 0; i < temp.length; i++)
  temp[i].addEventListener("click", editMode);

temp = document.querySelectorAll(".Box");
for (var i = 0; i < temp.length; i++)
{
  temp[i].addEventListener("blur", saveEdit);
  temp[i].addEventListener("keypress", checkForEnter);
}
// ^^ Event Listeners


function addInput()
{
  var entry = this.parentNode.parentNode;
  this.removeEventListener("change", addInput);
  entry.insertAdjacentHTML('beforeend', '<div class="description"><input type="text" placeholder="Item Description"/></div><div class="price"><input class="money" type="number" step="0.01" placeholder="$"/></div><div class="quantity"><input class="itemNum" type="number" step="1" min="1" value="1"/></div><div class="checkboxes"> <input type="checkbox"/> <input type="checkbox"/> <input type="checkbox"/> <input type="checkbox"/> </div>');
  var entries = document.querySelectorAll(".money");
  entries[entries.length-1].addEventListener("change", addInput);
  entries[entries.length-1].addEventListener("change", roundUp2decimal);
} // only last row will trigger new line

// Hide/Show Header Editing Mode
function editMode()
{
  this.classList.add("hide");
  var input = document.getElementById(this.attributes["target"].value);
  input.classList.remove("hide");
  input.select();
} //hide html, show input

function checkForEnter(event)
{
  if (event.which == 13)
   saveEdit.call(this);
}

function saveEdit()
{
  var purpose = document.getElementById(this.attributes["target"].value);
  if (this.value.trim().length)
    purpose.innerHTML = this.value;
  this.classList.add("hide");
  purpose.classList.remove("hide");
} // copy input to html
//


// Rounding
function roundDown()
{
  this.value = Math.floor(this.value);
} // round down ex. 1.5 -> 1

function roundUp2decimal()
{
  this.value = Math.round(this.value * 100) / 100;
} // round to 2nd decimal place
//


//Calculate
function calculate()
{
  var individuals = new Array();
  individuals[0] = 0.0;
  individuals[1] = 0.0;
  individuals[2] = 0.0;
  individuals[3] = 0.0;
  var dollars = document.querySelectorAll(".money");
  var quantities = document.querySelectorAll(".itemNum");
  var participants = document.querySelectorAll(".checkboxes");
  var checked = 0, dollarsToAdd = 0.0, totalDollar = 0.0;

  for (var i = 0; i < dollars.length; i++)
  {
    for (var j = 0; j < participants[i].children.length; j++)
    {
      if (participants[i].children[j].checked)
        checked += 1;
    }

    if (checked == 0)
      checked = 4; // if none of them are checked, it is assumed that everyone is a participant
    if (dollars[i].value != "")
      dollarsToAdd = dollars[i].value * quantities[i].value / checked;

    if (checked == 4)
    {
      individuals[0] += dollarsToAdd;
      individuals[1] += dollarsToAdd;
      individuals[2] += dollarsToAdd;
      individuals[3] += dollarsToAdd;
    }
    else
    {
      for (var j = 0; j < participants[i].children.length; j++)
      {
        if (participants[i].children[j].checked)
          individuals[j] += dollarsToAdd;
      }
    }

    checked = 0;
    dollarsToAdd = 0.0;
  }

  for (var i = 0; i < individuals.length; i++)
    totalDollar += individuals[i];

  document.getElementById("totalDollar").innerHTML = "Total: $" + totalDollar;
  document.getElementById("A").innerHTML = "A: $" + individuals[0].toFixed(2);
  document.getElementById("B").innerHTML = "B: $" + individuals[1].toFixed(2);
  document.getElementById("C").innerHTML = "C: $" + individuals[2].toFixed(2);;
  document.getElementById("D").innerHTML = "D: $" + individuals[3].toFixed(2);
}
//
