"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parserCSS = exports.isActive = exports.stop = exports.getFiles = exports.startCompile = void 0;
const fs = require("fs");
const vscode = require("vscode");
const enumColors_1 = require("./enumColors");
const color = require("color-convertor");
//const workspace = vscode.workspace.workspaceFolders[0].uri.fsPath;
let status = false;
let fsEvent;
const startCompile = () => {
    (0, exports.getFiles)();
    fsEvent = vscode.workspace.onDidSaveTextDocument((txdoc) => {
        (0, exports.parserCSS)(txdoc.uri);
    });
};
exports.startCompile = startCompile;
const getFiles = () => {
    vscode.workspace.findFiles("**/*.css").then((files) => {
        files.forEach((file) => {
            (0, exports.parserCSS)(file);
        });
    });
    status = true;
};
exports.getFiles = getFiles;
const stop = () => {
    fsEvent.dispose();
    status = false;
};
exports.stop = stop;
const isActive = () => {
    return status;
};
exports.isActive = isActive;
const parserCSS = (file) => {
    const data = fs.readFileSync(file.fsPath, { encoding: "utf-8", flag: "r" });
    let n = data.toString();
    const regexHex = /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b/g;
    const regexRgba = /(?:rgb)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb)a?\([^\)]*\)/g;
    const regexName = /(\:(.+[a-zA-Z]))/g;
    const parsedHex = [...data.matchAll(regexHex)];
    const parsedColorNames = [...data.matchAll(regexName)];
    const parsedRgba = [...data.matchAll(regexRgba)];
    const parsedClrNamesArr = [];
    for (const [key, value] of Object.entries(enumColors_1.ColorNames)) {
        parsedColorNames.map((a) => {
            const replace = a[0].replace(": ", "");
            if (replace === key) {
                parsedClrNamesArr.push(replace);
                let o = color.hexToHsl(value);
                n = n.replace(replace, o);
            }
        });
    }
    console.log(parsedColorNames[0]);
    parsedHex.map((el) => {
        let b = color.hexToHsl(el[0]);
        n = n.replace(el[0], b);
    });
    parsedRgba.map((el) => {
        let p = el[0].replace(/[^0-9\,]/g, "");
        const sp = p.split(",").map(Number);
        let b = sp.length >= 4
            ? color.rgbToHsl(sp[0], sp[1], sp[2], `.${sp[3]}`)
            : color.rgbToHsl(sp[0], sp[1], sp[2]);
        n = n.replace(el[0], b);
    });
    fs.writeFileSync(file.fsPath, n, "utf8");
};
exports.parserCSS = parserCSS;
//# sourceMappingURL=converter.js.map