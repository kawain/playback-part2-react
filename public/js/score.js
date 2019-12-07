import { divideInput } from '../../src/chordtone.js';


if (!window.opener || window.opener.closed) {
    window.alert('メインウィンドウがありません');
}

let obj = divideInput("AonA");

console.log(obj.chordName);
console.log(obj.keyName);
console.log(obj.onKeyName);

console.log("こんちは");