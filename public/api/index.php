<?php

function connectPDO()
{
    $dbname = "_db.sqlite";
    $pdo = new PDO("sqlite:{$dbname}");
    // SQL実行時にもエラーの代わりに例外を投げるように設定
    // http://php.net/manual/ja/pdo.setattribute.php
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $pdo;
}

function print_json($data)
{
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($data);
}

if (isset($_GET['mode']) && $_GET['mode'] == "scale") {
    try {
        $pdo = connectPDO();
        $stmt = $pdo->query('SELECT * FROM scales');
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        print_json($rows);
    } catch (Exception $e) {
        print_json(["error" => $e->getMessage()]);
    }

} elseif (isset($_GET['mode']) && $_GET['mode'] == "chordall") {
    try {
        $pdo = connectPDO();
        $stmt = $pdo->query('SELECT id,title FROM chord_bbs ORDER BY title');
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        print_json($rows);
    } catch (Exception $e) {
        print_json(["error" => $e->getMessage()]);
    }

} elseif (isset($_GET['mode']) && $_GET['mode'] == "chordone" && isset($_GET['id']) && isset($_GET['id']) != "") {
    try {
        $pdo = connectPDO();
        $stmt = $pdo->prepare('SELECT id,title,chord,start_count,bpm,beat FROM chord_bbs WHERE id=?');
        $stmt->execute([htmlentities($_GET['id'])]);
        $rows = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($rows) {
            print_json($rows);
        } else {
            print_json(["error" => "not found"]);
        }
    } catch (Exception $e) {
        print_json(["error" => $e->getMessage()]);
    }

} else {
    header('HTTP', true, 400);
    echo "Bad Request";
}
