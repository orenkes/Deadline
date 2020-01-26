const fetchAPI = async ({
  urlString,
  method,
  userName,
  userPassword,
  body
}) => {
  let options = {};

  // <---GET A USER FROM DATABASE USING A TOKEN ON HIS LOCAL STORAGE-->

  const getToken = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "auth-token": localStorage.getItem("token")
    }
  };

  // <---UPDATING THE TASKS ARRAYS IN THE DB-->

  const put = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "auth-token": localStorage.getItem("token")
    },
    body: JSON.stringify(body) // We send the updated arrays in JSON format
  };

  //   //<---CREATE A NEW USER IN DB--->

  const post = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };

  switch (method) {
    case "noOption":
      options = {};
      break;
    case "getByInput":
      options = {};
      break;
    case "getByToken":
      options = getToken;
      break;
    case "updateDB":
      options = put;
      break;
    case "newUserInDB":
      options = post;
      break;
    default:
      break;
  }

  const urls = {
    logWithToken: `https://tracker-database.youngwebdevs.now.sh/login/loggeduser/`,
    createUser: `https://tracker-database.youngwebdevs.now.sh/signup/`,
    logWithInput: `https://tracker-database.youngwebdevs.now.sh/login/userfromdb/?userName=${userName}&password=${userPassword}`,
    updateTasks: `https://tracker-database.youngwebdevs.now.sh/dashboard/updatingarrays`
  };

  const result = await fetch(urls[urlString], options);
  if (method === "getByToken" || method === "getByInput") {
    localStorage.setItem("token", result.headers.get("auth-token"));
  }
  const resultJSON = await result.json();
  return resultJSON;
};

export default fetchAPI;
