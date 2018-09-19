#!/usr/bin/env node

const fs = require('fs');//file system
const mkdirp = require('mkdirp');
const yargs = require('yargs'); //cli commands and options
const prompt = require('node-ask').prompt; //user input

const argv = yargs
    .options({
       
    })
    .command(['new', 'New', 'NEW'], 'create a new project',{},(argv)=>{
        newProject();
    })
    .help()
    .alias('help','h')
    .argv;

    var projectName = "";
    function newProject(){
        prompt("What is the name of your project? ").then((answer)=>{
            projectName = answer;
            console.log("building project");
            if(!fs.existsSync(answer)){
                fs.mkdirSync(answer, function(err){
                    if(err){
                        console.log(err);
                        // echo the result back
                        response.send("ERROR! Can't make the directory! \n");
                    }
                });
            }
        });
        
    }

    