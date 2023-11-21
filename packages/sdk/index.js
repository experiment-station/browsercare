(function () {
  try {
    var scripts = document.getElementsByTagName("script");
    var currentScript = scripts[scripts.length - 1];
    var scriptUrl = new URL(currentScript.src);

    var makeAPICall = function (url, callback) {
      var httpRequest = new XMLHttpRequest();

      if (!httpRequest) {
        throw new Error("Failed to create XMLHttpRequest instance");
      }

      httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            callback(null, JSON.parse(httpRequest.responseText));
          } else {
            callback(new Error("Failed to make API call"), null);
          }
        }
      };

      httpRequest.open("GET", url);
      httpRequest.send();
    };

    var project = scriptUrl.searchParams.get("project");
    var env = scriptUrl.searchParams.get("env") || "production";

    var API_URL =
      env === "production"
        ? "https://browser.care/api/events"
        : "http://localhost:3000/api/events";

    makeAPICall(
      API_URL + "?project=" + encodeURIComponent(project),
      function (error, response) {
        if (error) {
          return;
        }

        var node = document.createElement("pre");
        node.innerHTML = JSON.stringify(
          {
            project: project,
            env: env,
            event: response.event,
          },
          null,
          2
        );

        var body = document.getElementsByTagName("body")[0];
        body.appendChild(node);
      }
    );
  } catch (error) {
    console.error("[@browsercare/sdk] - " + error);
  }
})();
