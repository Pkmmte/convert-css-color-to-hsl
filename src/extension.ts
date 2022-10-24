import * as vscode from "vscode";
import { isActive, getFiles, startCompile, stop } from "./converter";

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand("colorToHsl.start", (args) => {
    startCompile();
    statusBarItem.text = "Stop Color Compiler";
  });

  vscode.commands.registerCommand("colorToHsl.stop", (args) => {
    statusBarItem.text = "Start Color Compiler";
    stop();
  });

  vscode.commands.registerCommand("colorToHsl.once", (args) => {
    getFiles();
  });

  vscode.commands.registerCommand("colorToHsl.toggle", (args) => {
    if (isActive()) {
      stop();
      statusBarItem.text = "Start Color Compiler";
    } else {
      statusBarItem.text = "Stop Color Compiler";
      startCompile();
    }
  });

  let statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    200
  );
  statusBarItem.text = "Start Color Compiler";
  statusBarItem.command = "colorToHsl.toggle";
  statusBarItem.tooltip = "Click to start or stop the Pug Compiler";
  statusBarItem.show();
}

export function deactivate() {}

export default activate;
