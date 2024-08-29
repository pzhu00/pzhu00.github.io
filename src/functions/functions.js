/* global clearInterval, console, setInterval */



/**
 * Add two numbers
 * @customfunction
 * @param {number} first First number
 * @param {number} second Second number
 * @returns {number} The sum of the two numbers.
 */
async function add2(first, second) {
  return first + second;
  
}



/**
 * Displays the current time once a second
 * @customfunction
 * @param {CustomFunctions.StreamingInvocation<string>} invocation Custom function invocation
 */
export function clock(invocation) {
  const timer = setInterval(() => {
    const time = currentTime();
    invocation.setResult(time);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Returns the current time
 * @returns {string} String with the current time formatted for the current locale.
 */
export function currentTime() {
  return new Date().toLocaleTimeString();
}

/**
 * Increments a value once a second.
 * @customfunction
 * @param {number} incrementBy Amount to increment
 * @param {CustomFunctions.StreamingInvocation<number>} invocation
 */
export function increment(incrementBy, invocation) {
  let result = 0;
  const timer = setInterval(() => {
    result += incrementBy;
    invocation.setResult(result);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Writes a message to console.log().
 * @customfunction LOG
 * @param {string} message String to write.
 * @returns String to write.
 */
export function logMessage(message) {
  console.log(message);

  return message;
}

/**
  * Gets the star count for a given Github repository.
  * @customfunction 
  * @param {string} userName string name of Github user or organization.
  * @param {string} repoName string name of the Github repository.
  * @return {number} number of stars given to a Github repository.
  */
async function getStarCount(userName, repoName) {
  try {
    //You can change this URL to any web request you want to work with.
    const url = "https://api.github.com/repos/" + userName + "/" + repoName;
    const response = await fetch(url);
    //Expect that status code is in 200-299 range
    if (!response.ok) {
      throw new Error(response.statusText)
    }
      const jsonResponse = await response.json();
      return jsonResponse.network_count;
  }
  catch (error) {
    return error;
  }
}

/**
  * Gets the distace between two points using Google Matrix API.
  * @customfunction 
  * @param {string} startDest string name of Github user or organization.
  * @param {string} endDest string name of the Github repository.
  * @return {string} number of stars given to a Github repository.
  */
async function getGoogleDistance(startDest, endDest) {
    try {
    
      const encodedStartDest = encodeURIComponent(startDest);
      const encodedEndDest = encodeURIComponent(endDest);
    
    //const url ="https://maps.googleapis.com/maps/api/distancematrix/json?destinations=london&origins=madrid&units=metric&key=AIzaSyDGhRm0zTGO8ev3JBUNUpaI_DR8ZmvFVvk";
    //const url = "https://v2.jokeapi.dev/joke/Any"
    const url1 = "https://api.geoapify.com/v1/geocode/search?text=" +encodedStartDest+ "&apiKey=2c645ff23fde48f7ac0a6b96b6727a4e";
    
    const response1 = await fetch(url1);

    if (!response1.ok) {
      return "this is not ok";
    }

    const url2 = "https://api.geoapify.com/v1/geocode/search?text=" +encodedEndDest+ "&apiKey=2c645ff23fde48f7ac0a6b96b6727a4e";
    
    const response2 = await fetch(url2);

    if (!response2.ok) {
      return "this is not ok";
    }


      const jsonResponse1 = await response1.json();
      const lon = jsonResponse1.features[0].geometry.coordinates[0];
      const lat = jsonResponse1.features[0].geometry.coordinates[1];
      const coords_1 = lat + "," + lon;


      const jsonResponse2 = await response2.json();
      const lon2 = jsonResponse2.features[0].geometry.coordinates[0];
      const lat2 = jsonResponse2.features[0].geometry.coordinates[1];
      const coords_2 = lat2 + "," + lon2;

      const jointCoords = coords_1 + "|" + coords_2;
      //let jsonString = JSON.stringify(jsonResponse);

      //return jointCoords;

      const url_3 = "https://api.geoapify.com/v1/routing?waypoints=" + jointCoords +"&mode=drive&apiKey=2c645ff23fde48f7ac0a6b96b6727a4e";
      console.log(url_3);
      
      
      const response3 = await fetch(url_3);

      if (!response3.ok) {
        return "this is not ok 3";
      }

      const jsonResponse3 = await response3.json();

      const distance = jsonResponse3.features[0].properties.distance;

      console.log(distance);  

      //console.log(jsonString);

      return distance;


    //return "heehee";
    }
    catch (error) {
      return error;
    }
}

