let API_URL = "";

switch (window.location.hostname) {
    // this is the localhost host name of your react ap
    case "localhost" || "127.0.0.1":
        // this is the local host name of your API
        API_URL = "http://localhost:4000"
        break;
        // this is the deployed react application
    case "wd80-blue-badge-project-server.herokuapp.com":
        // this is the full url of your deployed API
        API_URL = "https://wd80-blue-badge-project-server.herokuapp.com"

}


export default API_URL;