import * as vscode from 'vscode';
import * as parser from 'c4-model-visualizer-core/utils/yaml-parser';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "c4-model-visualizer-vscode" is now active!');

  vscode.workspace.onDidSaveTextDocument((e) => {
    try {
      const parsedData = parser.parse(e.getText());

      console.log(parsedData);
    } catch(e) {
      vscode.window.showInformationMessage(e.message);
    }
  });

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('c4Visualizer.start', () => {
    // The code you place here will be executed every time your command is executed

    // Create and show a new webview
    const editor = vscode.window.activeTextEditor;
    const panel = vscode.window.createWebviewPanel(
      'c4Visualizer',
      'C4 Visualizer',
      vscode.ViewColumn.Two,
      {},
    );

    panel.webview.html = getWebviewContent();

    if (!editor) {
      vscode.window.showInformationMessage('Editor does not exist');
      return;
    }
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
  <h1>C4 Visualizer</h1>
</body>
</html>`;
}
