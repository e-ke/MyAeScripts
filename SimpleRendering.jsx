// アクティブなコンポジションを "プロジェクトパス/render/" を出力先としてにレンダーキューに追加
// Ctrl + M で RenderQueue に追加すると出力先を毎回指定しなきゃいけないから作った。

{
    app.beginUndoGroup("Add Comp to Render Queue");

    // 現在のコンポジションを取得
    var activeComp = app.project.activeItem;

    // コンポジションが選択されていない場合のエラーチェック
    if (activeComp == null || !(activeComp instanceof CompItem)) {
        alert("No active composition selected.");
    } else {
        // ファイル名入力を現在のコンポジション名に設定
        var outputFileName = prompt("Enter the output file name", activeComp.name);

        // キャンセル時の処理
        if (outputFileName == null) {
            // alert("Cancelled");
        } else {
            // 出力ディレクトリのパスを設定
            var outputDir = new Folder(app.project.file.path + "/render");
            
            // ない場合は作成
            if (!outputDir.exists) {
                outputDir.create();
            }

            // レンダーキューに追加
            var renderQueueItem = app.project.renderQueue.items.add(activeComp);
            
            // 出力モジュールの設定を取得してファイル名を設定
            var outputModule = renderQueueItem.outputModule(1);
            var file = new File(outputDir.fsName + "/" + outputFileName + ".mp4");
            outputModule.file = file;

            // alert("Added to render queue with file name: " + outputFileName);
        }
    }

    app.endUndoGroup();
}

