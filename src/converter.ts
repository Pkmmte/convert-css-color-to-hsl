import * as fs from "fs";
import * as vscode from "vscode";
import { ColorNames } from "./enumColors";
import color = require("color-convertor");

let status: boolean = false;
let fsEvent: vscode.Disposable;

export const startCompile = () => {
  getFiles();
  fsEvent = vscode.workspace.onDidSaveTextDocument((txdoc) => {
    parserCSS(txdoc.uri);
  });
};

export const getFiles = () => {
  vscode.workspace.findFiles("**/*.css").then((files) => {
    files.forEach((file) => {
      parserCSS(file);
    });
  });
  status = true;
};

export const stop = () => {
  fsEvent.dispose();
  status = false;
};

export const isActive = () => {
  return status;
};

export const parserCSS = (file: vscode.Uri) => {
  const data = fs.readFileSync(file.fsPath, { encoding: "utf-8", flag: "r" });
  let n = data.toString();

  const regexHex = /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b/g;
  const regexRgba = /(?:rgb)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb)a?\([^\)]*\)/g;
  const regexName = /(\:(.+[a-zA-Z]))/g;

  const parsedHex = [...data.matchAll(regexHex)];
  const parsedColorNames = [...data.matchAll(regexName)];
  const parsedRgba = [...data.matchAll(regexRgba)];

  const parsedClrNamesArr = [];
  for (const [key, value] of Object.entries(ColorNames)) {
    parsedColorNames.map((a) => {
      const replace = a[0].replace(": ", "");
      if (replace === key) {
        parsedClrNamesArr.push(replace);
        let o = color.hexToHsl(value);
        n = n.replace(replace, o);
      }
    });
  }

  parsedHex.map((el) => {
    let b = color.hexToHsl(el[0]);
    n = n.replace(el[0], b);
  });

  parsedRgba.map((el) => {
    let p = el[0].replace(/[^0-9\,]/g, "");
    const sp = p.split(",").map(Number);
    let b =
      sp.length >= 4
        ? color.rgbToHsl(sp[0], sp[1], sp[2], sp[3])
        : color.rgbToHsl(sp[0], sp[1], sp[2]);

    n = n.replace(el[0], b);
  });

  fs.writeFileSync(file.fsPath, n, "utf8");
};
