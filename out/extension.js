"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const converter_1 = require("./converter");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    vscode.commands.registerCommand("colorToHsl.start", (args) => {
        (0, converter_1.startCompile)();
        statusBarItem.text = "Stop Color Compiler";
    });
    vscode.commands.registerCommand("colorToHsl.stop", (args) => {
        statusBarItem.text = "Start Color Compiler";
        (0, converter_1.stop)();
    });
    vscode.commands.registerCommand("colorToHsl.once", (args) => {
        (0, converter_1.getFiles)();
    });
    vscode.commands.registerCommand("colorToHsl.toggle", (args) => {
        if ((0, converter_1.isActive)()) {
            (0, converter_1.stop)();
            statusBarItem.text = "Start Color Compiler";
        }
        else {
            statusBarItem.text = "Stop Color Compiler";
            (0, converter_1.startCompile)();
        }
    });
    let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 200);
    statusBarItem.text = "Start Color Compiler";
    statusBarItem.command = "colorToHsl.toggle";
    statusBarItem.tooltip = "Click to start or stop the Pug Compiler";
    statusBarItem.show();
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
exports.default = activate;
//# sourceMappingURL=extension.js.map