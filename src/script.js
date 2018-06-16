var entries = document.querySelectorAll(".entries");
var temp = entries[entries.length-1].getElementsByTagName("input");

for (var i = 0; i < temp.length; i++)
{
    if (temp[i].type =="text")
      temp[i].addEventListener("change", addInput);
}

function checkForEnter(event)
{
  if (event.which == 13)
   addInput.call(this);
}


function addInput()
{
  // removing eventListener
  var entry = this.parentNode.parentNode;
  var temp = entry.getElementsByTagName("input");

  for (var i = 0; i < temp.length; i++)
  {
      if (temp[i].type =="text")
      {
        temp[i].removeEventListener("blur", addInput);
        temp[i].removeEventListener("keypress", checkForEnter);
      }
  }
  //

  entry.insertAdjacentHTML('beforeend', '      <div class="description">          <input type="text" placeholder="Item Description"/>        </div>          <div class="price">          <input type="text" placeholder="$"/>        </div>          <div class="quantity">          <input type="text" placeholder="1"/>        </div>          <div class="checkboxes">          <input type="checkbox"/>          <input type="checkbox"/>          <input type="checkbox"/>          <input type="checkbox"/>          <input type="checkbox"/>        </div>');

  var entries = document.querySelectorAll(".entries");
  var temp = entries[entries.length-1].getElementsByTagName("input");

  for (var i = 0; i < temp.length; i++)
  {
      if (temp[i].type =="text")
        temp[i].addEventListener("change", addInput);
  }
}
