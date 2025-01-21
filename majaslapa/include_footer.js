function a()
{
  fetch('a.html').then(response => {return response.text();}).then(data => {document.getElementById('footer').innerHTML = data;})
}
window.onload = a();