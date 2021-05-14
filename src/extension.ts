import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "open-file-in-search-editor.openInSearchEditor",
    async () => {
      await searchInCurrentFile();
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

async function searchInCurrentFile(): Promise<void> {
  const activeEditor = vscode.window.activeTextEditor;
  console.log("running lol")
  if (!activeEditor) {
    return;
  }
  
  const currentFilePath = vscode.workspace.asRelativePath(
    activeEditor.document.uri
  );
  await vscode.commands.executeCommand("search.action.openNewEditor", {
    // Fill-in selected text to query
    query: activeEditor.document.getText(activeEditor.selection)|| " ",
    filesToInclude: currentFilePath,
  });
}
