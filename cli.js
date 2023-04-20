#!/usr/bin/env node

//import packages
import moment from "moment-timezone";
import minimist from "minimist";
import fetch from "node-fetch";
import process from 'process';

//obtain timezone
const timezone = moment.tz.guess()

//obtain inputs
const input = minimist(process.argv.slice(2))

//error messages
if (input.h) {
    console.log( "Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE");
    console.log("-h            Show this help message and exit.");
    console.log("-n, -s        Latitude: N positive; S negative.");
    console.log("-e, -w        Longitude: E positive; W negative.");
    console.log("-z            Time zone: uses tz.guess() from moment-timezone by default.");
    console.log("-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.");
    console.log("-j            Echo pretty JSON from open-meteo API and exit.");
    process.exit(0);
}

var latitude = (-1) * input.w || input.e;
var longitude = (-1) * input.s || input.n;

var url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude +  "&timezone=" + timezone + "&daily=precipitation_hours";
const api_resp = await fetch(url)
const return_data = await api_resp.json();

if (input.j) {
    console.log(data);
    process.exit(0);
}

var days = input.d;
var rain = return_data.daily.precipitation_hours[days];

if (rain > 0) {
    process.stdout.write("You might need your galoshes ");
}
else{
    process.stdout.write("You will not need your galoshes ");
}

if(days == 0) {
    console.log("today.")
} else if (days > 1){
    console.log("in" + days + "days.")
} else {
    console.log("tomorrow.")
}
