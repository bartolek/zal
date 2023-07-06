/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
	address: "localhost",	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",			// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
					  		// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "Cracow",
				locationID: "3094802", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "9f05b73fba218a8760f0fe410b7e4c08"
			}
		},
		{
		  module: "json-display",
		  position: "bottom_bar" // 
		},
		{
			module: "weather",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openweathermap",
				type: "forecast",
				location: "Cracow",
				locationID: "3094802", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "9f05b73fba218a8760f0fe410b7e4c08"
			}
		},
		{
		  module: "MMM-NowPlayingOnSpotify",
		  position: "top_left",

		  config: {
			clientID: "62db734ef0a74756a22d7878b789c7ea",
			clientSecret: "5eac536d59ee404aafcd7e6b89d33cf9",
			accessToken: "BQCwSPTg3L8h6DsBaDAf8qLSfrwkG91NPkM_dGYhGGbvie8eWKDkyIxF_0HXj5Q8lP6UrSdlProyTG58TofF-fxKBJ2EHtcPf-S8tYzIDKuEyouFyK9v-B7XtP-VCz6_agOH0hrnhOdrBB1R60RzxA2NWgYb9l9YRyqkNbj6qWAA0ZSChDnjmmTb8A",
			refreshToken: "AQBN5Z7kBnF8HwAZk6oLk9XnIBuiGFJQ5ts0bOhS5L3EL0IyGbS-P4ALuwtw6C0nnl5M2BtX4HAbrqODwLP7Ru5mY8rqPDnyOrVEh-EsSsvXw1khd7LLgX-nGaNUgC5fWXI"
		  }
		},
		{
		  module: 'MMM-json',
		  position: 'bottom_left',
		  header: "Kraków-Dębica",
		  config: { // 
			url: "http://192.168.5.52:8080/wynik.json",
			    headerIcon: "fa-cube",
				values: [
				  {
					title: "ID",
					query: "$[0].TrainID"
				  },
				  {
					title: "Name",
					query: "$[0].TrainName"
				  },
				  {
					title: "Average Delay",
					query: "$[0].AverageDelay"
				  },
				  {
					title: "ID",
					query: "$[1].TrainID"
				  },
				  {
					title: "Name",
					query: "$[1].TrainName"
				  },
				  {
					title: "Average Delay",
					query: "$[1].AverageDelay"
				  },
			]
		  }
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "TVN24",
						url: "https://tvn24.pl/najwazniejsze.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: false,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
