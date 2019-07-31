const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.port;
var common_functions = require('./commonFunctions')
const fs = require('fs');
app.use(express.json())


app.get('/getEnvironment/:process', (req, res) => {
    let process = req.params.process;
    common_functions.get_data_from_file(process)
        .then(data => {
            console.log(data)
            return res.status(200).json({
                status: "OK",
                message: "environment variables",
                data: data
            })
        }).catch(err => {
            return res.status(400).json({
                status: "Failed",
                message: "error",
                data: err
            })
        })
})

app.get('/setEnvironment/:process/:key/:value', (req, res) => {
    let process = req.params.process;
    let key = req.params.key;
    let value = req.params.value;

    common_functions.get_data_from_file(process).then(data => {
        if(data){
            console.log("intial", data)
            let file_name = String;
            if (process == 'PROCESS1') {
                file_name = "./p1/.env"
            } else if (process == 'PROCESS2') {
                file_name = "./p2/.env"
            } else {
                return res.status(400).json({
                    status: "Failed",
                    message: "invalid process",
                    data: {}
                })
            }
            let flag = false;
            Object.keys(data).forEach(function (inner_key, index) {
                if (key == inner_key) {
                    flag = true;
                }
            });
    
            if (flag) {
                data[key] = value;
                console.log("change_vals", data);
                fs.truncate(file_name, 0, function () {
                    console.log('done')
                    common_functions.addEnv_multi(file_name, data).then(data => {
                    }).catch(err => {
                        return res.status(400).json({
                            status: "Failed",
                            message: "error",
                            data: err
                        })
                    })
                })
            } else {
                let append_line = key + "=" + value;
                common_functions.addEnv(file_name, append_line).then(data => {
                    return res.status(200).json({
                        status: "OK",
                        message: "environment variable added successfully",
                        data: data
                    })
                }).catch(err => {
                    return res.status(400).json({
                        status: "Failed",
                        message: "error",
                        data: err
                    })
                })
            }
        }

    }).catch(err => {
        console.log("error", err)
        return res.status(400).json({
            status: "Failed",
            message: "error",
            data: err
        })
    })

})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})