//Basic Triad Chord

import {
    Fingerboard,
    RefreshDisplay,
    calcFrequency,
} from './common'


class BTC {
    constructor(obj, flag = "") {
        this.__this = obj;
        this.flag = flag;
        this.playNoteQueue = [];

        // 列説明
        // ルートが1、弦、ルートを0にした場合の相対ポジション
        // [1, 0, 0],
        // [0, 1, 0],
        // [0, 2, 1]
        this.positionArr1 = {
            "123-1_": [
                [1, 0, 0],
                [0, 1, 0],
                [0, 2, 1]
            ],
            "123-1_m": [
                [1, 0, 0],
                [0, 1, 0],
                [0, 2, 0]
            ],
            "123-1_m7b5": [
                [1, 0, 0],
                [0, 1, -1],
                [0, 2, 0]
            ],
            "123-2_": [
                [0, 0, -1],
                [1, 1, 0],
                [0, 2, -1]
            ],
            "123-2_m": [
                [0, 0, -2],
                [1, 1, 0],
                [0, 2, -1]
            ],
            "123-2_m7b5": [
                [0, 0, -2],
                [1, 1, 0],
                [0, 2, -2]
            ],
            "123-3_": [
                [0, 0, -2],
                [0, 1, 0],
                [1, 2, 0]
            ],
            "123-3_m": [
                [0, 0, -2],
                [0, 1, -1],
                [1, 2, 0]
            ],
            "123-3_m7b5": [
                [0, 0, -3],
                [0, 1, -1],
                [1, 2, 0]
            ],
            "234-2_": [
                [1, 1, 0],
                [0, 2, -1],
                [0, 3, 1]
            ],
            "234-2_m": [
                [1, 1, 0],
                [0, 2, -1],
                [0, 3, 0]
            ],
            "234-2_m7b5": [
                [1, 1, 0],
                [0, 2, -2],
                [0, 3, 0]
            ],
            "234-3_": [
                [0, 1, 0],
                [1, 2, 0],
                [0, 3, 0]
            ],
            "234-3_m": [
                [0, 1, -1],
                [1, 2, 0],
                [0, 3, 0]
            ],
            "234-3_m7b5": [
                [0, 1, -1],
                [1, 2, 0],
                [0, 3, -1]
            ],
            "234-4_": [
                [0, 1, -2],
                [0, 2, -1],
                [1, 3, 0]
            ],
            "234-4_m": [
                [0, 1, -2],
                [0, 2, -2],
                [1, 3, 0]
            ],
            "234-4_m7b5": [
                [0, 1, -3],
                [0, 2, -2],
                [1, 3, 0]
            ]
        };

        this.positionArr2 = {
            "6_M7": [
                [0, 1, 0],
                [0, 2, 1],
                [0, 3, 1],
                [1, 5, 0]
            ],
            "5_M7": [
                [0, 1, 2],
                [0, 2, 1],
                [0, 3, 2],
                [1, 4, 0]
            ],
            "6_m7": [
                [0, 1, 0],
                [0, 2, 0],
                [0, 3, 0],
                [1, 5, 0]
            ],
            "5_m7": [
                [0, 1, 1],
                [0, 2, 0],
                [0, 3, 2],
                [1, 4, 0]
            ],
            "6_7": [
                [0, 1, 0],
                [0, 2, 1],
                [0, 3, 0],
                [1, 5, 0]
            ],
            "5_7": [
                [0, 1, 2],
                [0, 2, 0],
                [0, 3, 2],
                [1, 4, 0]
            ],
            "6_m7b5": [
                [0, 1, -1],
                [0, 2, 0],
                [0, 3, 0],
                [1, 5, 0]
            ],
            "5_m7b5": [
                [0, 1, 1],
                [0, 2, 0],
                [0, 3, 1],
                [1, 4, 0]
            ]
        };

    }

    firstTime() {
        let count = 4;
        // 一拍の秒数
        let speed = 60 / this.__this.state.bpmValue;
        let time = this.__this.state.context.currentTime + 0.100;

        let i = 0;
        //カウント
        while (i < count) {
            this.playSoundDrum(this.__this.bufMap["hihat"], time + (i * speed))
            i++
        }

        // 最初
        if (this.flag === "triad") {
            this.playNoteQueue.push(this.makeRandom2(this.positionArr1));
        } else if (this.flag === "chord") {
            this.playNoteQueue.push(this.makeRandom2(this.positionArr2));
        } else {
            this.playNoteQueue.push(this.makeRandom());
        }

        this.soundLoop(i, speed, time);
    }

    soundLoop(i, speed, time) {
        let speed8 = speed / 2;
        let n = 0;
        // 演奏
        // 1小節4拍
        while (n < 16) {
            if (i % 4 === 0) {
                if (this.flag === "triad" || this.flag === "chord") {
                    this.playSoundChord2(this.__this.bufMap["guitar"], time + (i * speed), time, speed, i, n);
                } else {
                    this.playSoundChord(this.__this.bufMap["guitar"], time + (i * speed), time, speed, i, n);
                }
            }

            if (i % 2 === 0) {
                this.playSoundDrum(this.__this.bufMap["kick"], time + (i * speed));
            }
            if (i % 2 !== 0) {
                this.playSoundDrum(this.__this.bufMap["snare"], time + (i * speed));
            }
            this.playSoundDrum(this.__this.bufMap["hihat"], time + (i * speed));
            this.playSoundDrum(this.__this.bufMap["hihat"], time + (i * speed) + speed8);

            i++;
            n++;
        }
    }

    makeRandom() {
        //fingerboardからランダムに一つ選択
        const gen = Math.floor(6 * Math.random());
        //選んだ弦の値から(12フレットまで)ランダムに一つ選択
        const flet = Math.floor(12 * Math.random());

        const toneObj = Fingerboard[gen][flet];

        const obj = {
            text: `${gen + 1}弦 ${toneObj.note}${toneObj.octave}`,
            sound: `${toneObj.note}${toneObj.octave}`,
            position: [gen, flet]
        }

        return obj;
    }

    makeRandom2(positionArr) {
        // positionArrのキーだけの配列
        const positionKeys = Object.keys(positionArr);
        // ランダム
        const randPosition = Math.floor(Math.random() * positionKeys.length);
        // ランダムに選んだキー　例："234-4_m7b5"
        const randKey = positionKeys[randPosition];

        let min = 0;
        let max = 0;
        if (this.flag === "triad") {
            // フレット範囲 配列からはみ出ないための工夫(数字はインデックス)実際は4フレットから15フレットまで
            min = 3;
            max = 14;
        } else if (this.flag === "chord") {
            // フレット範囲 配列からはみ出ないための工夫(数字はインデックス)実際は2フレットから13フレットまで
            min = 1;
            max = 12;
        }
        // ランダムに選んだフレット
        const randFret = Math.floor(Math.random() * (max - min + 1) + min);

        // ルート音の弦を調べる＆構成音を取得＆SVGポジション
        let rootGen = 0;
        let chords = [];
        let svgs = [];

        positionArr[randKey].forEach(e => {
            if (e[0] === 1) {
                rootGen = e[1];
            }
            chords.push(Fingerboard[e[1]][randFret + e[2]].note + Fingerboard[e[1]][randFret + e[2]].octave);
            svgs.push([e[0], e[1], randFret + e[2]]);
        })

        //ルート音を調べる
        let rootNote = Fingerboard[rootGen][randFret].note;
        //コード名に置換
        const chordName = randKey.replace("_", ` ${rootNote}`);

        const obj = {
            text: chordName,
            sound: chords,
            position: svgs
        }

        return obj;
    }

    playSoundDrum(buffer, time) {
        const source = this.__this.state.context.createBufferSource();
        source.buffer = buffer;
        //音量
        const gainNode = this.__this.state.context.createGain();
        source.connect(gainNode);
        //音が小さいので
        let tmpvolume = 0;
        if (this.__this.state.volumeValue === 0) {
            tmpvolume = 0;
        } else {
            tmpvolume = Number(this.__this.state.volumeValue) + 0.1;
        }
        gainNode.gain.value = tmpvolume;
        gainNode.connect(this.__this.state.context.destination);
        //音量ここまで
        source.start(time);
    }

    playSoundChord(buffer, time, deftime, speed, i, n) {
        this.playNoteQueue.push(this.makeRandom());

        if (this.playNoteQueue.length !== 2) {
            return;
        }

        const firstNote = Object.create(this.playNoteQueue[0]);
        const secondNote = Object.create(this.playNoteQueue[1]);

        this.playNoteQueue.shift();

        // onended 用　音無し
        const source2 = this.__this.state.context.createBufferSource();
        source2.buffer = buffer;
        source2.onended = () => {
            // 音と画面をなるべく同期させる
            this.changeDom(firstNote, secondNote, deftime, speed, i, n);
        }
        const gainNode2 = this.__this.state.context.createGain();
        source2.connect(gainNode2);
        gainNode2.gain.value = 0;
        gainNode2.connect(this.__this.state.context.destination);
        source2.start(time, 0, 0.1);

        // 音あり
        const source = this.__this.state.context.createBufferSource();
        source.buffer = buffer;
        source.playbackRate.value = calcFrequency(firstNote.sound);
        //音量
        const gainNode = this.__this.state.context.createGain();
        source.connect(gainNode);
        gainNode.gain.value = this.__this.state.volumeValue;
        gainNode.connect(this.__this.state.context.destination);
        //音量ここまで
        source.start(time, 0, speed * 4);
    }

    changeDom(firstNote, secondNote, deftime, speed, i, n) {
        //更に多次元配列のコピー
        const displayCopy = JSON.parse(JSON.stringify(this.__this.state.display));
        //リフレッシュ
        RefreshDisplay(displayCopy);
        displayCopy[firstNote.position[0]][firstNote.position[1]].display = "block";
        this.__this.setState({
            now: firstNote.text,
            next: `(次の音) ${secondNote.text}`,
            display: displayCopy
        });
        if (n === 8) {
            this.soundLoop(i + 8, speed, deftime);
        }
    }

    playSoundChord2(buffer, time, deftime, speed, i, n) {

        if (this.flag === "triad") {
            this.playNoteQueue.push(this.makeRandom2(this.positionArr1));
        } else if (this.flag === "chord") {
            this.playNoteQueue.push(this.makeRandom2(this.positionArr2));
        }

        if (this.playNoteQueue.length !== 2) {
            return;
        }

        const firstNote = JSON.parse(JSON.stringify(this.playNoteQueue[0]));
        const secondNote = JSON.parse(JSON.stringify(this.playNoteQueue[1]));

        this.playNoteQueue.shift();

        // onended 用　音無し
        const source2 = this.__this.state.context.createBufferSource();
        source2.buffer = buffer;
        source2.onended = () => {
            // 音と画面をなるべく同期させる
            this.changeDom2(firstNote, secondNote, deftime, speed, i, n);
        }
        const gainNode2 = this.__this.state.context.createGain();
        source2.connect(gainNode2);
        gainNode2.gain.value = 0;
        gainNode2.connect(this.__this.state.context.destination);
        source2.start(time, 0, 0.1);;

        for (const v of firstNote.sound) {
            const source = this.__this.state.context.createBufferSource();
            source.buffer = buffer;
            source.playbackRate.value = calcFrequency(v);
            //音量
            const gainNode = this.__this.state.context.createGain();
            source.connect(gainNode);
            gainNode.gain.value = this.__this.state.volumeValue;
            gainNode.connect(this.__this.state.context.destination);
            //音量ここまで
            source.start(time, 0, speed * 4);
        }
    }

    changeDom2(firstNote, secondNote, deftime, speed, i, n) {
        //更に多次元配列のコピー
        let displayCopy = JSON.parse(JSON.stringify(this.__this.state.display));
        //リフレッシュ
        RefreshDisplay(displayCopy);

        if (this.flag === "chord") {
            this.drawChordTone(firstNote.sound, displayCopy);
        }

        for (const v of firstNote.position) {
            if (v[0] === 1) {
                displayCopy[v[1]][v[2]].fill = "red";
            } else {
                displayCopy[v[1]][v[2]].fill = "blue";
            }
            displayCopy[v[1]][v[2]].display = "block";
        }

        this.__this.setState({
            now: firstNote.text,
            next: `(次の音) ${secondNote.text}`,
            display: displayCopy
        });

        if (n === 8) {
            this.soundLoop(i + 8, speed, deftime);
        }
    }

    drawChordTone(notes, displayCopy) {
        let count = 0
        for (const v of notes) {
            //末尾削除
            const v2 = v.slice(0, -1);

            for (let i = 0; i < displayCopy.length; i++) {
                for (let n = 0; n < displayCopy[i].length; n++) {
                    if (displayCopy[i][n].note === v2) {
                        if (count === 3) {
                            displayCopy[i][n].display = "block";
                            displayCopy[i][n].fill = "fuchsia";
                        } else {
                            displayCopy[i][n].display = "block";
                            displayCopy[i][n].fill = "aqua";
                        }
                    }
                }
            }
            count++
        }
    }
}

export default BTC;