//Creates a global variable of type window.localstorage
var localStorage = window.localStorage;

//Stores the data contained in the <a> tag into local storage with click
document.addEventListener("click", function(event){
  if(event.target && event.target.dataset.isproduct === "true" )
  {
    localStorage.setItem('imageURL', event.target.dataset.image);
    localStorage.setItem('title', event.target.dataset.title);
    localStorage.setItem('description', event.target.dataset.description);
    localStorage.setItem('price', event.target.dataset.price);
}
})

//Fetches the product database from api
function products(){
    fetch('https://fakestoreapi.com/products')
    .then(resp => resp.json())
    .then((products) => render(products));
}

//Renders the products and produces a dynamic list of the products contained in the database
function render(products) {
    let output = "";
    let i = 0;

    products.forEach((products) => { 
        output += `
        <div class="card col-sm-4" style="width: 18rem;">
        <img src=${products.image} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${products.title}</h5>
          <p class="card-text">${products.description}</p>
          <p class="card-text">${products.price}€</p>
          <a href="Cart.html" data-isproduct="true" data-image="${products.image}" data-title="${products.title}" data-description="${products.description}" data-price="${products.price}" class="buyLink btn btn-primary">Buy</a>
        </div>
      </div>`;
      i++;
    });

    document.getElementById("output").innerHTML = output;
}

//Creates a dynamic cart page from the info stored in local storage
function resultProduct(){
  let productResult = "";
  let image = localStorage.getItem('imageURL');
  let title = localStorage.getItem('title');
  let description = localStorage.getItem('description');
  let price = localStorage.getItem('price');

  productResult += `
  <div class="card col-sm-4" style="width: 18rem;">
  <img src=${image} class="card-img-top" alt="...">
   <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${description}</p>
    <p class="card-text">${price}€</p>
   </div>
  </div>`;

    document.getElementById("productResult").innerHTML = productResult;
}

//Validates that all the values in the person fields have been entered and returns error messages if they haven't
function validateForm(){
  var a = document.forms["personform"]["fname"].value;
  var b = document.forms["personform"]["lname"].value;
  var c = document.forms["personform"]["pnumber"].value;
  var d = document.forms["personform"]["email"].value;
  var e = document.forms["personform"]["address"].value;

  var fieldA = true;
  var fieldB = true;
  var fieldC = true;
  var fieldD = true;
  var fieldE = true;

  if (a == "") {
    var returnValName = "Enter a name";
    document.getElementById("returnValName").innerHTML = returnValName;
    fieldA = false;
  }
  if (b == "") {
    var returnValLname = "Enter a lastname";
    document.getElementById("returnValLname").innerHTML = returnValLname;
    fieldB = false;
  }
  if (c == "" || c.length < 10 || c.length > 10) {
    var returnValPhone = "Enter a phonenumber";
    document.getElementById("returnValPhone").innerHTML = returnValPhone;
    fieldC = false;
  }
  if (d == "" || !d.includes('@')) {
    var returnValEmail = "Enter a Email";
    document.getElementById("returnValEmail").innerHTML = returnValEmail;
    fieldD = false;
  }
  if (e == "") {
    var returnValAddress = "Enter a address";
    document.getElementById("returnValAddress").innerHTML = returnValAddress;
    fieldE = false;
  }

  if (fieldA && fieldB && fieldC && fieldD && fieldE) {
    var thanks = "Thank you for your purchase!"
    document.getElementById("thanks").innerHTML = thanks;
    return false;
  }
  else{
    return false;
  }
}
