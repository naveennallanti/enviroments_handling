var readline = require('readline');
var fs = require('fs');

exports.env_to_json = (file_name) => {
    return new Promise((resolve, reject) => {
        var lineReader = readline.createInterface({
            input: fs.createReadStream(file_name)
        });
        var columnNames = ['x'];

        function parseLine(line) {
            console.log("line", line);
            columnNames[0] = line.trim().split('=')[0];
            return line.trim().split('=')
        }

        function createRowObject(values) {
            var rowObject = {};

            columnNames.forEach((value, index) => {
                console.log(value);
                rowObject[value] = values[index + 1];
            });

            return rowObject;
        }

        var json = {};

        lineReader.on('line', function (line) {

            let obj = createRowObject(parseLine(line));

            let key = Object.keys(obj)[0];

            let value = Object.values(obj)[0]

            Object.assign(json, {
                [key]: value
            });
        });

        lineReader.on('close', function () {
            //  fs.writeFileSync(file_name + '.json', JSON.stringify(json, null, 2));
            resolve(json);
        });
    })
}

exports.get_data_from_file = (process) => {
    return new Promise((resolve, reject) => {
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
        this.env_to_json(file_name).then(data => {
            resolve(data);
        }).catch(err => {
            console.log(err);
        })
    })

}

exports.addEnv = (file_name, append_line) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(file_name, "\n" + append_line, (data) => {
            resolve(data);
        })
    })
}

exports.addEnv_multi = (file_name, obj) => {
    return new Promise((resolve, reject) => {
        let count = 1;
        Object.keys(obj).forEach(function (inner_key, index) {
            let append_line = inner_key + "=" + obj[inner_key];
            console.log("append", append_line);
            fs.appendFile(file_name, append_line + "\n", (data) => {
                count = count + 1;
                console.log("count", count);
                if (count < 2) {
                    resolve(data);
                }
            })
        });
    })
}