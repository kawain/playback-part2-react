const chordPositionMap = {
    "-": [0, 7, 12, 16, 19],
    "add9": [0, 7, 14, 16],
    "aug": [0, 4, 8],
    "6": [0, 7, 9, 16],
    "69": [0, 4, 9, 14, 19],
    "M7": [0, 7, 11, 16],
    "M7b5": [0, 6, 11, 16],
    "M7#5": [0, 8, 11, 16],
    "M7#11": [0, 4, 11, 16, 18],
    "M9": [0, 4, 11, 14],
    "M9#11": [0, 4, 11, 14, 18],
    "M13": [0, 7, 11, 16, 21],
    "M13#11": [0, 11, 18, 21],
    "m": [0, 7, 12, 15, 19],
    "m6": [0, 9, 12, 15, 19],
    "m69": [0, 3, 9, 14],
    "madd9": [0, 7, 14, 15, 19],
    "m7": [0, 7, 10, 15],
    "m7b5": [0, 6, 10, 15],
    "m7#5": [0, 8, 10, 15],
    "mM7": [0, 7, 11, 15],
    "m9": [0, 3, 10, 14],
    "m11": [0, 3, 10, 14, 17],
    "m11b5": [0, 6, 10, 12, 17],
    "m13": [0, 10, 15, 21],
    "7": [0, 4, 10, 12],
    "7sus4": [0, 7, 10, 17],
    "7b5": [0, 6, 10, 16],
    "7#5": [0, 8, 10, 16],
    "9": [0, 4, 10, 14],
    "9sus4": [0, 5, 10, 14],
    "7b9": [0, 4, 10, 13],
    "7#9": [0, 4, 10, 15],
    "7#11": [0, 4, 10, 18],
    "13b9": [0, 4, 10, 13, 21],
    "13": [0, 10, 13, 16, 21],
    "sus4": [0, 7, 12, 17, 19],
    "dim": [0, 6, 12, 15],
    "dim7": [0, 6, 9, 15],
    "5": [0, 7]
};

const octaveOrderArray = [
    "A2",
    "Bb2",
    "B2",
    "C3",
    "Db3",
    "D3",
    "Eb3",
    "E3",
    "F3",
    "Gb3",
    "G3",
    "Ab3",
    "A3",
    "Bb3",
    "B3",
    "C4",
    "Db4",
    "D4",
    "Eb4",
    "E4",
    "F4",
    "Gb4",
    "G4",
    "Ab4",
    "A4",
    "Bb4",
    "B4",
    "C5",
    "Db5",
    "D5",
    "Eb5",
    "E5",
    "F5"
];

const keyOrderMap = {
    "A": 0,
    "A#": 1,
    "Bb": 1,
    "B": 2,
    "C": 3,
    "C#": 4,
    "Db": 4,
    "D": 5,
    "D#": 6,
    "Eb": 6,
    "E": 7,
    "F": 8,
    "F#": 9,
    "Gb": 9,
    "G": 10,
    "G#": 11,
    "Ab": 11
};

export function findChordTone(str) {
    let obj = divideInput(str);

    let { keyName, chordName, onKeyName } = obj;

    let arr = [];

    if (keyName !== "") {
        arr = chordTones(keyName, chordName, onKeyName);
    }

    return arr;
}

//文字列分解、あれば返す、なければ空を返す
export function divideInput(str) {

    let keyName = "";
    let chordName = "";
    let onKeyName = "";

    let keySlice = 0;
    let onSlice = 0;

    //文字列分解して配列に
    const arr = Array.from(str);

    //長さを代入
    const len = arr.length;

    //配列をループ
    for (let i = 0; i < len; i++) {

        if (i === 0) {
            //最初の文字が以下のいずれか
            switch (arr[i]) {
                case "C":
                case "D":
                case "E":
                case "F":
                case "G":
                case "A":
                case "B":
                    keySlice++;
                    break;
                default:
                    return { keyName, chordName, onKeyName };
            }
        } else if (i === 1) {
            //2番目の文字がいずれかだったら
            switch (arr[i]) {
                case "#":
                case "b":
                    keySlice++;
                    break;
                default:
                    break;
            }
        }

        if (arr[i] === "o" && len > i + 2 && arr[i + 1] === "n") {
            //oの見つかった位置から、配列の残りが2文字以上あり、次の文字がnの場合
            onSlice = i;
        }
    }

    // console.log("keySlice", keySlice);
    // console.log("onSlice", onSlice);

    //キーとコードを特定
    keyName = str.slice(0, keySlice);
    if (onSlice > 0) {
        chordName = str.slice(keySlice, onSlice);
        onKeyName = str.slice(onSlice + 2);
    } else {
        chordName = str.slice(keySlice);
    }

    if (chordName === "") {
        chordName = "-";
    }

    // console.log("keyName", keyName);
    // console.log("chordName", chordName);
    // console.log("onKeyName", onKeyName);

    //存在チェック
    //連想配列の値が0なのは判定しづらいので
    if (keyOrderMap[keyName] >= 0 && keyOrderMap[keyName] <= 11) {

    } else {
        //Cb　B#
        return { keyName: "", chordName: "", onKeyName: "" };
    }

    if (!chordPositionMap[chordName]) {
        return { keyName: "", chordName: "", onKeyName: "" };
    }

    if (onKeyName !== "") {
        if (keyOrderMap[onKeyName] >= 0 && keyOrderMap[onKeyName] <= 11) {

        } else {
            return { keyName: "", chordName: "", onKeyName: "" };
        }
    }

    return { keyName, chordName, onKeyName };
}

//keyName, chordName, onKeyName を受け取って、コード構成音を返す
function chordTones(keyName, chordName, onKeyName) {

    // console.log("keyName", keyName);
    // console.log("chordName", chordName);
    // console.log("onKeyName", onKeyName);

    let arr = [];

    //onの場合最初に追加
    if (onKeyName !== "") {
        arr.push(onKeyName + "2");
    }

    const plus = keyOrderMap[keyName];

    for (let v of chordPositionMap[chordName]) {
        arr.push(octaveOrderArray[v + plus]);
    }

    return arr;
}
