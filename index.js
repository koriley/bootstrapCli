#!/usr/bin/env node

const fs = require('fs'); //file system
const exec = require("child_process").exec
const runGulpTask = require("run-gulp-task")
const gulp = require("gulp");
const yargs = require('yargs'); //cli commands and options
const prompt = require('node-ask').prompt; //user input


const argv = yargs
    .options({

    })
    .command(['new', 'New', 'NEW'], 'create a new project', {}, (argv) => {
        newProject();
    })
    .command(["watch"], "Watch changes in your code in a browser", {}, (argv) => {
        watch();
    })
    .help()
    .alias('help', 'h')
    .argv;


function newProject() {
    console.log("This is not officially licensed by Twitter Bootstrap.")
    prompt("What is the name of your project? ").then((answer) => {
        if (answer === "") {
            console.log("Exiting");
            process.exit(1);
        }
        console.log("building project");
        if (!fs.existsSync(answer)) {
            fs.mkdirSync(answer);
            fs.createReadStream(__dirname+'/bootstrap-raw/bootstrap.zip').pipe(unzipper.Extract({ path: answer+'/bootstrap.zip' }));
                
                
                // fs.createWriteStream(answer+'/bootstrap.zip'));
        } else {
            console.log("Directory already exists");
        }
    });
}

function watch() {
    runGulpTask('default', 'gulpfile.js').then(()=> {
        console.log("A thing was did");
    }).catch(e => {
        console.log("ugh");
        console.log("Error :"+e)
    })
}
