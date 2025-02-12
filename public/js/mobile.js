var session_object = {};

// Cookies
//document.cookie = "username=Spike Risley; expires=Thu, 18 Dec 2033 12:00:00 UTC; path=/mobile"; 
//document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/mobile;";
//document.cookie = "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/mobile;";
// Generic cookie function
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setUserName(username) {
  const d = new Date();
  d.setTime(d.getTime() + (1*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = "username=" + username + ";" + expires + ";path=/mobile"; 
}

function getUserName() {
  usrnme = getCookie("username")
  //console.log(x)
  return usrnme
}

function toggleSubmission() {
  let expires = ''
  x = getCookie('submitted')
  const d = new Date();
  d.setTime(d.getTime() + (1*24*60*60*1000));
  expires = "expires="+ d.toUTCString();
  console.log(x)
  document.cookie = x == "false" ? "submitted=true;" + expires + ";path=/mobile" : "submitted=false;" + expires + ";path=/mobile";
}

function updateSession_object(data) {
  //Check if the overlay data has been updated, update data if nescessary
  if (JSON.stringify(session_object) == JSON.stringify(data)) {
    //console.log("Overlay stagnant...")
    return;
  }
  else {
    session_object = data;
  }
}

function getData(url, cb) {
  fetch(url)
    .then(response => response.json())
    .then(result => cb(result));

}

let resetSubmitFlag = false;
var userNameSet = false;
var votingStatus = "wating";

function preload() {
  //LOAD DATA BEFORE START
  getData("/jsons/session.json", (data) => updateSession_object(data));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  commentDiv = document.getElementById("comment")
  usernameBox = document.getElementById("username_box")
  loginDiv = document.getElementById('login')
  // submitButton = document.getElementById("confirm_comment")
  commentBox = document.getElementById("movie_comment")
  movieTitle = document.getElementById("movie_title")
  submitMessage = document.getElementById("submission_message_div")
  waitingDiv = document.getElementById("waiting_div")
  // waitingMsg = document.getElementById("waiting_msg")
  // // Hide components initially
  // commentDiv.style.display = "none";
  // submitMessage.style.display = "none";
  // waitingDiv.style.display = "none";
  //
  //document.cookie = "submitted=false; expires=Thu, 18 Dec 2033 12:00:00 UTC; path=/mobile"; 
}

function draw() {
  // Refresh data
  getData("/jsons/session.json", (data) => updateSession_object(data));
  // Wait for the data to be populate
  background(50,50,50);
  // Set movie title
  if (session_object.current_movie !== undefined) {
    movieTitle.innerHTML = session_object.current_movie.toUpperCase();
    //movieTitle.innerHTML = getUserName()
  }
  // Set Status
  if (session_object.status !== undefined) {
    votingStatus = session_object.status
  }
  // Check if username set
  if (getUserName() != '') {
    //console.log("nuh")
    userNameSet = true
  }
  
  // Set elements based on status
  // Make user login first
  if (!userNameSet) {
    loginDiv.style.display = "block";
    commentDiv.style.display = "none";
    submitMessage.style.display = "none"
    movieTitle.style.display = "none"
    waitingDiv.style.display = "none"
  }
  else if (votingStatus == "vote") {
    // Reset submission flag
    resetSubmitFlag = true
  }
  else if (votingStatus == "wait") {
    // Reset submission flag
    resetSubmitFlag = true
    // Hide commenting elements
    commentDiv.style.display = "none";
    submitMessage.style.display = "none"
    loginDiv.style.display = "none";
    movieTitle.style.display = "none"
    // Display waiting message
    waitingDiv.style.display = "block"
  }
  // Comment submitted
  else if (getCookie("submitted") == "true" && votingStatus == "comment") {
    if (resetSubmitFlag) {
      resetSubmitFlag = false
      // Set submission cookie
      toggleSubmission();
    }
    commentDiv.style.display = "none";
    submitMessage.style.display = "block"
    loginDiv.style.display = "none"
    // Hide waiting message
    waitingDiv.style.display = "none"
  }
  else if (votingStatus == "comment") {
    // Show commenting elements
    commentDiv.style.display = "block";
    movieTitle.style.display = "block"
    // Hide waiting message
    waitingDiv.style.display = "none"
    loginDiv.style.display = "none";
    submitMessage.style.display = "none";
  }
  else {
    console.log("FUCK")
  }
  
}

// When Submit clicked
function commentSubmitted() {
  fetch("localhost:3000", {
    method: "POST",
    body: JSON.stringify({
      comment: commentBox.value,
      user: getUserName()
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  //  .then((response) => console.log(response));
  commentBox.value = ""
  toggleSubmission()
}

function userNameSubmitted() {
  setUserName(usernameBox.value)
  usernameBox.value = ""
}