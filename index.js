"use strict";

function getRepos(username) {
  const apiString = `https://api.github.com/users/${username}/repos`;
  console.log(apiString);

  fetch(apiString)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson.length);
  $("#results-list").empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length; i++) {
    // for each repo in the repos
    //add a list item to the results
    //list with the repo name and repo url
    $("#results-list").append(
      `<li><h3>${responseJson[i].name}</h3><br><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
      </li>`
    );
  }
  //display the results section
  $("#results").removeClass("hidden");
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const username = $("#js-search-term").val();
    getRepos(username);
  });
}

$(watchForm);
