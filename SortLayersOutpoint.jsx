(function() {
    // アクティブなコンポジションを取得
    var comp = app.project.activeItem;
    if (comp == null || !(comp instanceof CompItem)) {
        alert("コンポジションを選択してください。");
        return;
    }

    // スクリプトのアクションを1つのアクションとしてグループ化
    app.beginUndoGroup("Align Layers by Out Point");

    // 選択されたレイヤーを取得
    var selectedLayers = comp.selectedLayers;
    if (selectedLayers.length == 0) {
        alert("レイヤーを選択してください。");
        app.endUndoGroup();
        return;
    }

    // 一番遅いアウトポイントを見つける
    var maxOutPoint = -1;
    for (var i = 0; i < selectedLayers.length; i++) {
        var outPoint = selectedLayers[i].outPoint;
        if (outPoint > maxOutPoint) {
            maxOutPoint = outPoint;
        }
    }

    // すべての選択されたレイヤーを最も遅いアウトポイントに揃えるために移動
    for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i];
        var duration = layer.outPoint - layer.inPoint;
        layer.startTime = maxOutPoint - duration;
    }

    app.endUndoGroup();
})();
