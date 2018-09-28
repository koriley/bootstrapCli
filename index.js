#!/usr/bin/env node

const fs = require('fs'); //file system
const exec = require("child_process").exec
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
        } else {
            console.log("Directory already exists");
        }
    });
}

function watch() {
    // exec("gulp default", {shell:true}, (error, stdout, stderr) => {
    //     console.log("stdout: "+stdout);
    //     console.log(`stderr: ${stderr}`);
    //     if (error !== null) {
    //         console.log(`exec error: ${error}`);
    //     }
    // })
    gulp.start('default');
}