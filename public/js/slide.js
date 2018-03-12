var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("slide");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
  
}

$(document).keydown(function (e) {
  e=e || window.event;
  switch(e.key) {
    case "ArrowLeft":
      plusDivs(-1);
      break;
    case "ArrowRight":
      plusDivs(1);
      break;
    default:
      return;                
  }
  e.preventDefault();
});