<!DOCTYPE html>
<html>
  <head>
    <title>Road Trip - Map</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <!-- <script src="key.js"></script> -->
    <link rel="stylesheet" href="style.css">
    <link rel="shortcut icon" type="image/png" href="images/roadtrip-logo-small.png"/>
    <script>
        var TripName = localStorage.getItem("tripname");
        var Name = localStorage.getItem("name");
        var Email = localStorage.getItem("email");
        var StartDate = localStorage.getItem("start-date");
        var EndDate = localStorage.getItem("end-date");
        var MPG = localStorage.getItem("mpg");
    </script>
    <script src="directions.js"></script>
    <script src="key.js"></script>
    <!-- <script src="https://cdn.rawgit.com/googlemaps/v3-utility-library/master/routeboxer/src/RouteBoxer.js"></script> -->
    <!-- <script type="text/javascript" src="routeboxer/src/RouteBoxer.js"></script> -->
  </head>
  <body>
    <div id="main-container">
      <div id="header-tab">
        <img src="images/roadtrip-logo-small.png" alt="Road Trip Logo" title="Road Trip Logo" class="logo">
        <img src="images/roadtrip-sign-logo.png" alt="Road Trip Logo" title="Road Trip Logo" class="logo">
        <a href="frontpage.html">
         <button class="button-tab home-tab" title="Home">Home</button>
        </a>
        <a href="aboutus.html">
          <button class="button-tab about-tab" title="About Us">About Us</button>
        </a>
        <button class="button-tab faq-tab" title="Frequently Asked Questions">FAQ</button>
      </div>
      <div style="display: none">
          <input id="origin-input" class="controls" type="text"
              placeholder="Enter an origin location">

          <input id="destination-input" class="controls" type="text"
              placeholder="Enter a destination location">

          <div id="mode-selector" class="controls">
            <input type="radio" name="type" id="changemode-walking" checked="checked">
            <label for="changemode-walking">Walking</label>

            <input type="radio" name="type" id="changemode-transit">
            <label for="changemode-transit">Transit</label>

            <input type="radio" name="type" id="changemode-driving">
            <label for="changemode-driving">Driving</label>
          </div>
      </div>
      <div id="map-container">
        <div id="map"></div>
        <div id="trip-details">
          <h2 style="text-align: center; margin-top: 20px;">Your Trip Details</h2>
          <h3 style="text-align: center;"><?php $tripname = $_POST["tripname"]; echo $tripname;?></h3>
          <h4 style="text-align: center;">Created by: <?php echo $_POST["name"]?></h4>
          <table style="width: 100%;border-collapse: separate; border-spacing: 15px;">
            <tr>
              <td class="data-label">MPG of Car</td>
              <td id="mpg"><?php $mpg = $_POST["mpg"]; echo $mpg;?></td>
            </tr>
            <tr>
              <td class="data-label">Trip Distance:</td>
              <td id="distance"></td>
            </tr>
            <tr>
              <td class="data-label">Trip Duration:</td>
              <td id="duration"></td>
            </tr>
            <tr>
              <td class="data-label">Avg. Gas Cost:</td>
              <td id="costs"></td>
            </tr>
            <tr>
              <td class="data-label">Start Date:</td>
              <td id="start-date"></td>
            </tr>
          </table>
        </div>
      </div>
  </div>
  <div id="footer">
    <p class="footer-p" style="color: white; padding-top: 20px">
      Programming languages used to make Road Trip:
    </p>
      <div class="PL-logo">
        <div class="html-logo"><img src="images/logo_html.png" alt="HTML Logo" title="HTML"></div>
        <div class="css-logo"><img src="images/logo_css.png" alt="CSS Logo" title="CSS"></div>
        <div class="js-logo"><img src="images/logo_javascript.png" alt="JavaScript Logo" title="JavaScript"></div>
        <div class="php-logo"><img src="images/logo_php.png" alt="PHP Logo" title="PHP"></div>
      </div>
    <p class="footer-p" style="color: white; padding-top: 30px">
      Thank you for using the Road Trip Web App!
    </p>
  </div>
  </body>
</html>
