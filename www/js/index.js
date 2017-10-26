/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        document.getElementById("btnweather").addEventListener("click", getweather);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function getweather(){
    //alert('hello');
   
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position)
    {
        $("#geoloc").html("latitude:" + position.coords.latitude + "<br> longitude: " + position.coords.longitude);

        var lat = position.coords.latitude ;
        var long = position.coords.longitude;
        // alert('lat' + lat);
        // alert('long' + long);
      
        var weatherURL= "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&APPID=a8c6ec89508e2e48a3d4ee8d06c3e5d1";
        $.getJSON(weatherURL).done(function(data){
            
            $("#currtemp").html("current temp:" + data.main.temp);
            $("#weather").html("Weather Condition : "+data.weather[0].main);
            $("#subweather").html("Sub Weather Condition : "+data.weather[0].description);
            var mintemp=data.main.temp_min-273.15;
            var maxtemp=data.main.temp_max-273.15;
            $("#min").html("Minimum Tempture : "+mintemp);
            $("#max").html("Maxmum Tempture : "+maxtemp);
            $("#wind").html("current Wind:" + (data.wind.speed)*3.6);
            $("#humidity").html("Humidity : "+data.main.humidity+"%");
            $("#pressure").html("pressure : "+data.main.pressure+"Ph");
            var gottime=new Date(data.sys.sunrise*1000);
            $("#sunrise").html("Sun Rise at : "+gottime.getHours()+":"+gottime()+":"+gottime.getSeconds());
            var gottime=new Date(data.sys.sunset*1000);
            $("#sunset").html("Sun Set at : "+gottime.getHours()+":"+gottime.getMinutes()+":"+gottime.getSeconds());
        });
    },function(er){
        alert(er.message);
    });
}
}