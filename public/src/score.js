import {
    soundFiles,
    calcFrequency,
    loadFile
} from '../../src/common';

import { findChordTone } from '../../src/chordtone';

let context = new AudioContext();

let chordArray = [];

let paramObj = {};

let bufMap = {};

/*
https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API
root
    target が見えるかどうかを確認するためのビューポートとして使用される要素です。
    指定されなかった場合、もしくは null の場合はデフォルトでブラウザーのビューポートが使用されます。
rootMargin
    root の周りのマージンです。CSS margin プロパティに似た値を持つことができます。
    例えば、"10px 20px 30px 40px" (top, right, bottom, left) のようなものです。
    この値はパーセント値にすることができます。
threshold
    単一の数値もしくは数値の配列で、オブザーバーのコールバックを実行する target がどのくらいの
    割合で見えているかを示します。
    50% 通過したときのみ検出する場合は値 0.5 を使用します。
    25% を超える度にコールバックを実行する場合は、 [0, 0.25, 0.5, 0.75, 1] という配列を指定します。
    既定値は 0 です (つまり、1ピクセルでも表示されるとコールバックが実行されます)。
    1.0 の値は全てのピクセルが見えるようになるまで、閾値をまたいだとみなされないことを意味します。
*/
const intersectionOptions = {
    root: null,
    rootMargin: "0px",
    threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
};

const observer = new IntersectionObserver(intersectionCallback, intersectionOptions);

function intersectionCallback(entries, observer) {
    entries.forEach((entry) => {
        if (entry.intersectionRatio <= 0.8) {
            entry.target.scrollIntoView();
        }
    })
}

// DOM
const hidden_chord = document.getElementById("hidden_chord");
const hidden_param = document.getElementById("hidden_param");
const stop_btn = document.getElementById("stop_btn");

stop_btn.addEventListener("click", () => {
    if (context.state === "running") {
        context.suspend().then(function () {
            stop_btn.textContent = "Resume";
        })
    } else if (context.state === "suspended") {
        context.resume().then(function () {
            stop_btn.textContent = "Pause";
        })
    }
});

// onendedを使用して音と同期するための関数
function playSoundCallback(buffer, time, count, index, countObj) {
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.onended = () => {
        changeDom(time, count, index, countObj);
    }
    //音は出さない
    const gainNode = context.createGain();
    source.connect(gainNode);
    gainNode.gain.value = 0;
    gainNode.connect(context.destination);
    //音量ここまで
    // 再生時間を短く
    source.start(time, 0, 0.01);
}

function changeDom(time, count, index, countObj) {
    let oldID = index - 1;
    if (index === 0) {
        oldID = countObj.len - 1;
    }

    let old = document.getElementById(`chord${oldID}`);
    old.style.backgroundColor = '';
    old.style.color = '#212529';
    observer.unobserve(old);

    let now = document.getElementById(`chord${index}`);
    now.style.backgroundColor = '#3498DB';
    now.style.color = '#fff';
    observer.observe(now);

    // 10固定　半分に来たら再度スケジュール
    if (count === 5) {
        countObj.update_next_time(5 * countObj.speed + time);
        soundLoop(countObj);
    }
}

function playSoundChord(buffer, time, countObj) {
    const chords = findChordTone(chordArray[countObj.index])
    console.log(chords);
    for (const v of chords) {
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.playbackRate.value = calcFrequency(v);
        //音量
        const gainNode = context.createGain();
        source.connect(gainNode);
        gainNode.gain.value = paramObj.volumeValue;
        gainNode.connect(context.destination);
        //音量ここまで
        source.start(time, 0, countObj.speed);
    }
}

function playSoundDrum(buffer, time) {
    const source = context.createBufferSource();
    source.buffer = buffer;
    //音量
    const gainNode = context.createGain();
    source.connect(gainNode);
    //音が小さいので
    let tmpvolume = 0;
    if (paramObj.volumeValue === 0) {
        tmpvolume = 0;
    } else {
        tmpvolume = paramObj.volumeValue + 0.1;
    }
    gainNode.gain.value = tmpvolume;
    gainNode.connect(context.destination);
    //音量ここまで
    source.start(time);
}

// 工夫したクラス
class BeatCounter {
    constructor(speed) {
        this.speed = speed;
        this.i = 0;
        this.len = chordArray.length;
        this.index = 0;
        this.next_time = 0;
    }

    // time + (i * speed)
    basetime() {
        return this.next_time + (this.i * this.speed);
    }

    // ループのインクリメント
    count(n) {
        this.i += n;
        this.index += n;
        if (this.index >= this.len) {
            this.index = 0;
        }
    }

    // ループの最初
    update_next_time(time) {
        this.next_time = time;
    }
}

function soundLoop(countObj) {

    // 一拍の秒数
    let speed8 = countObj.speed / 2;
    let speed12 = countObj.speed / 3;
    let speed16 = countObj.speed / 4;

    countObj.i = 0;

    //演奏
    while (countObj.i < 10) {

        playSoundCallback(bufMap["hihat"], countObj.basetime(), countObj.i, countObj.index, countObj);

        playSoundChord(bufMap["guitar"], countObj.basetime(), countObj);

        switch (paramObj.beatValue) {
            case 2:
                playSoundDrum(bufMap["hihat"], countObj.basetime());
                if (countObj.i % 2 === 0) {
                    playSoundDrum(bufMap["kick"], countObj.basetime());
                }
                if (countObj.i % 2 !== 0) {
                    playSoundDrum(bufMap["snare"], countObj.basetime());
                }
                break;
            case 3:
                playSoundDrum(bufMap["hihat"], countObj.basetime());
                if (countObj.i % 3 === 0) {
                    playSoundDrum(bufMap["kick"], countObj.basetime());
                    playSoundDrum(bufMap["snare"], countObj.basetime() + countObj.speed + countObj.speed);
                }
                break;
            case 4:
                playSoundDrum(bufMap["hihat"], countObj.basetime());
                if (countObj.i % 4 === 0) {
                    playSoundDrum(bufMap["kick"], countObj.basetime());
                    playSoundDrum(bufMap["snare"], countObj.basetime() + countObj.speed + countObj.speed + countObj.speed);
                }
                break;
            case 8:
                playSoundDrum(bufMap["hihat"], countObj.basetime());
                playSoundDrum(bufMap["hihat"], countObj.basetime() + speed8);
                if (countObj.i % 2 === 0) {
                    playSoundDrum(bufMap["kick"], countObj.basetime());
                }
                if (countObj.i % 2 !== 0) {
                    playSoundDrum(bufMap["snare"], countObj.basetime());
                }
                break;
            case 12:
                playSoundDrum(bufMap["hihat"], countObj.basetime());
                playSoundDrum(bufMap["hihat"], countObj.basetime() + speed12);
                playSoundDrum(bufMap["hihat"], countObj.basetime() + speed12 + speed12);
                if (countObj.i % 2 === 0) {
                    playSoundDrum(bufMap["kick"], countObj.basetime());
                }
                if (countObj.i % 2 !== 0) {
                    playSoundDrum(bufMap["snare"], countObj.basetime());
                }
                break;
            case 16:
                playSoundDrum(bufMap["hihat"], countObj.basetime());
                playSoundDrum(bufMap["hihat"], countObj.basetime() + speed16);
                playSoundDrum(bufMap["hihat"], countObj.basetime() + speed16 + speed16);
                playSoundDrum(bufMap["hihat"], countObj.basetime() + speed16 + speed16 + speed16);
                if (countObj.i % 2 === 0) {
                    playSoundDrum(bufMap["kick"], countObj.basetime());
                }
                if (countObj.i % 2 !== 0) {
                    playSoundDrum(bufMap["snare"], countObj.basetime());
                }
                break;
            default:
                playSoundDrum(bufMap["hihat"], countObj.basetime());

        }
        countObj.count(1);
    }
}

function firstTime() {
    // コード配列
    chordArray = JSON.parse(hidden_chord.innerText);

    // 設定値読み込み代入
    paramObj = JSON.parse(hidden_param.innerText, (_, v) => {
        return (typeof v === "string") ? Number(v) : v;
    });

    // スピード
    let speed = 60 / paramObj.bpmValue;

    // 開始時間
    let time = context.currentTime + 0.100;
    //カウント
    let i = 0;
    while (i < paramObj.countValue) {
        playSoundDrum(bufMap["hihat"], time + (i * speed));
        i++;
    }
    const countObj = new BeatCounter(speed);
    countObj.update_next_time(time + (i * speed));

    soundLoop(countObj);
}

async function run() {

    // 音読み込み
    for (let key in soundFiles) {
        bufMap[key] = await loadFile(context, soundFiles[key])
    }

    firstTime();
}

window.onload = () => {
    run();
}


