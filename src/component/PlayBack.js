import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import { divideInput } from '../chordtone';

class PlayBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            area: "",
            transpose: 0,
            count: 4,
            bpm: 100,
            beat: 8,
            volume: 0.5,
            localStorageData: [],
            sample: "",
            sampleOption: []
        }

        this.titleChange = this.titleChange.bind(this);
        this.areaChange = this.areaChange.bind(this);
        this.transposeChange = this.transposeChange.bind(this);
        this.countChange = this.countChange.bind(this);
        this.bpmChange = this.bpmChange.bind(this);
        this.beatChange = this.beatChange.bind(this);
        this.volumeChange = this.volumeChange.bind(this);
        this.playClick = this.playClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.localstorageRemoveOne = this.localstorageRemoveOne.bind(this);
        this.localstorageShow = this.localstorageShow.bind(this);
        this.sampleChange = this.sampleChange.bind(this);
    }

    componentDidMount() {
        document.title = "コード進行・編集・再生 | ギター練習サイト コードトーン";
        window.scrollTo(0, 0);

        this.localstorageListing();

        // PHPからfetch
        // 読み込んだら実行
        let url = "./api/?mode=chordall";
        if (process.env.NODE_ENV !== "production") {
            console.log('devlope');
            url = "http://localhost:8000/?mode=chordall";
        }
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                if (myJson.error) {
                    alert("Read failure.");
                } else if (myJson.error) {
                    alert(myJson.error);
                } else {
                    let arr = [<option key={uuidv4()} value=""></option>];
                    for (let v of myJson) {
                        arr.push(<option key={uuidv4()} value={v.id}>{v.title}</option>);
                    }
                    this.setState({ sampleOption: arr });
                }
            })
            .catch(error => alert(error));

    }

    titleChange(e) {
        this.setState({ title: e.target.value });
    }

    areaChange(e) {
        this.setState({ area: e.target.value });
    }

    transposeChange(e) {
        this.setState({ transpose: Number(e.target.value) });
    }

    countChange(e) {
        this.setState({ count: Number(e.target.value) });
    }

    bpmChange(e) {
        this.setState({ bpm: Number(e.target.value) });
    }

    beatChange(e) {
        this.setState({ beat: Number(e.target.value) });
    }

    volumeChange(e) {
        this.setState({ volume: Number(e.target.value) });
    }

    playClick(e) {
        e.preventDefault();

        let arr = [];

        try {
            arr = this.checkArea();
        } catch (error) {
            alert(error);
            return;
        }

        let no = 0;
        let html = "";

        for (let v of arr[0]) {
            if (v === "|") {
                html += `<span class="separator">${v}</span>`
            } else {
                html += `<span class="chordone" id="chord${no}">${v}</span>`
                no++
            }
        }

        // 新しいウインドウ
        let top = window.innerHeight / 2;
        let left = window.innerWidth / 2;
        let WIDTH = 800;
        let HEIGHT = 600;
        let x = left - (WIDTH / 2);
        let y = top - (HEIGHT / 2);
        let scoreWindow = window.open("./score.html", "scoreWindow", `top=${y},left=${x},width=${WIDTH},height=${HEIGHT}`)
        if (scoreWindow) {
            scoreWindow.addEventListener("DOMContentLoaded", () => {
                const win = scoreWindow;

                let display_chord = win.document.getElementById("display_chord");
                display_chord.innerHTML = html;

                let hidden_chord = win.document.getElementById("hidden_chord");
                hidden_chord.innerHTML = JSON.stringify(arr[1]);

                let hidden_param = win.document.getElementById("hidden_param");
                const obj = {
                    "countValue": this.state.count,
                    "bpmValue": this.state.bpm,
                    "beatValue": this.state.beat,
                    "volumeValue": this.state.volume
                }
                hidden_param.innerHTML = JSON.stringify(obj);
            })
        }

    }

    //入力コード進行チェック
    checkArea() {

        let value = this.state.area;

        if (value.length < 1) {
            throw new Error("No chord progression entered");
        }

        //第1段階
        //改行をスペースに
        value = value.replace(/\r?\n/g, ' ');
        //タブかもしれないのでスペースにする
        value = value.replace(/\t/g, ' ');
        //カンマをスペースにする
        value = value.replace(/,/g, ' ');

        //誤入力の補正
        //パイプラインの前後にスペースを入れる
        value = value.replace(/\|/g, " | ");
        //スラッシュの前後にスペースを入れる
        value = value.replace(/\//g, " / ");
        //ハイフンの前後にスペースを入れる
        value = value.replace(/-/g, " - ");

        //前後の空白削除
        value = value.trim();
        //2個以上のスペースを1個にする
        value = value.replace(/ {2,}/g, ' ');
        //配列にする
        let chordArr = value.split(' ');

        //第2段階
        // | 小節の区切り
        // / 前と同じ
        // - 休み

        //音のみ
        let arr2 = [];
        //小節記号入り
        let arr3 = [];

        let old2 = "";
        let bad = false;

        chordArr.forEach((e) => {
            if (e === "|") {
                arr3.push(e);
            } else if (e === "/") {
                arr2.push(old2);
                arr3.push(old2);
            } else if (e === "-") {
                arr2.push(e);
                arr3.push(e);
                old2 = e;
            } else {
                const obj = divideInput(e);
                if (obj.keyName === "") {
                    bad = true;
                }
                // 前頭を大文字
                // e = e.charAt(0).toUpperCase() + e.slice(1);
                arr2.push(e);
                arr3.push(e);
                old2 = e;
            }
        });

        if (bad) {
            throw new Error("There were characters that could not be used");
        }

        // 転調の場合
        if (this.state.transpose !== 0) {
            for (let i = 0; i < arr2.length; i++) {
                arr2[i] = this.transposeChord(arr2[i], this.state.transpose);
            }
            //転調で小節記号の配列を書き換える
            let i = -1;
            let n = 0;
            for (const v of arr3) {
                i++;
                if (v === "|") {
                    continue;
                } else {
                    arr3[i] = arr2[n];
                    n++;
                }
            }
        }

        // console.log(arr2);
        // console.log(arr3);

        return [arr3, arr2];
    }

    transposeChord(chord, amount) {

        const order = {
            "Cb": 11,
            "C": 0,
            "C#": 1,
            "Db": 1,
            "D": 2,
            "D#": 3,
            "Eb": 3,
            "E": 4,
            "E#": 5,
            "Fb": 4,
            "F": 5,
            "F#": 6,
            "Gb": 6,
            "G": 7,
            "G#": 8,
            "Ab": 8,
            "A": 9,
            "A#": 10,
            "Bb": 10,
            "B": 11,
            "B#": 0
        };

        const scale1 = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        const scale2 = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

        let match = chord.match(/^([CDEFGAB]b?#?)(.*)$/);

        if (match === null) {
            return chord;
        }

        let matchon = chord.match(/on([CDEFGAB]b?#?)$/);

        let c = order[match[1]] + amount;
        if (c > (scale1.length - 1)) {
            c = c - scale1.length;
        } else if (c < 0) {
            c = scale2.length + c;
        }

        if (matchon === null) {
            if (amount > 0) {
                return scale1[c] + match[2];
            } else {
                return scale2[c] + match[2];
            }
        } else {
            let onc = order[matchon[1]] + amount;
            if (onc > (scale1.length - 1)) {
                onc = onc - scale1.length;
            } else if (onc < 0) {
                onc = scale2.length + onc;
            }

            if (amount > 0) {
                return scale1[c] + match[2].replace(matchon[0], "") + "on" + scale1[onc];
            } else {
                return scale2[c] + match[2].replace(matchon[0], "") + "on" + scale2[onc];
            }
        }
    }

    // ------------------------
    // ローカルストレージ関係
    // ------------------------

    saveClick(e) {
        e.preventDefault();

        const title = this.state.title;
        const chord = this.state.area;

        if (title.length < 1 || chord.length < 1) {
            alert("No title or chord progression entered");
            return;
        }

        //入力チェック
        try {
            this.checkArea();
        } catch (error) {
            alert(error);
            return;
        }

        // 保存したいドキュメント
        const doc = {
            title: title,
            chord: chord,
            count: this.state.count,
            bpm: this.state.bpm,
            beat: this.state.beat,
            createdAt: new Date()
        };

        try {
            //保存の前に現在入っているものを取り出し
            let chords = [];
            let tmp = localStorage.getItem('chords');

            if (tmp) {
                chords = JSON.parse(tmp);
            }

            //それに追加
            //chords配列の最後に追加
            chords.push(doc);
            //json文字列に変換して追加
            localStorage.setItem('chords', JSON.stringify(chords));

            alert("Saved");

            this.localstorageListing();

        } catch (e) {
            alert(`Failed to save localStorage ${e}`);
        }
    }

    localstorageListing() {
        try {
            let chords = [];
            let tmp = localStorage.getItem('chords');
            if (tmp) {
                chords = JSON.parse(tmp);
            } else {
                return;
            }

            //ソート
            chords.sort((a, b) => {
                if (a.createdAt > b.createdAt) return -1;
                if (a.createdAt < b.createdAt) return 1;
                return 0;
            })

            let html = [];
            for (const v of chords) {
                html.push(
                    <div className="alert alert-dismissible alert-light my-2">
                        <button type="button" className="close" data-id={v.createdAt} onClick={this.localstorageRemoveOne}>&times;</button>
                        <a href="/#" data-id={v.createdAt} onClick={this.localstorageShow}>{v.title}</a>
                    </div>);
            }

            this.setState({ localStorageData: html });

        } catch (e) {
            console.log(e);
        }
    }

    localstorageRemoveOne(e) {
        const id = e.currentTarget.dataset.id;
        try {
            let chords = [];
            let tmp = localStorage.getItem('chords');
            if (tmp) {
                chords = JSON.parse(tmp);
            } else {
                return;
            }

            const newchords = [];

            for (const v of chords) {
                if (String(v.createdAt) === id) {
                    //もしもcreatedAtとidが同じだったらなにもしない
                } else {
                    newchords.push(v);
                }
            }

            localStorage.setItem('chords', JSON.stringify(newchords));

            this.localstorageListing();

        } catch (e) {
            alert(`Remove failure ${e}`);
        }

    }

    localstorageShow(e) {
        e.preventDefault();
        const id = e.currentTarget.dataset.id;
        try {
            let chords = [];
            let tmp = localStorage.getItem('chords');
            if (tmp) {
                chords = JSON.parse(tmp);
            } else {
                return;
            }

            for (const v of chords) {
                if (String(v.createdAt) === id) {
                    //画面に表示
                    this.setState({
                        title: v.title,
                        area: v.chord,
                        count: v.count,
                        bpm: v.bpm,
                        beat: v.beat
                    });
                    break;
                }
            }
            window.scrollTo(0, 0);
        } catch (e) {
            alert(`Read failure ${e}`);
        }
    }

    // ------------------------
    // PHPからfetch
    // ------------------------
    sampleChange(e) {
        const id = e.currentTarget.value;
        this.setState({ sample: id });
        let url = `./api/?mode=chordone&id=${id}`;
        if (process.env.NODE_ENV !== "production") {
            console.log('devlope');
            url = `http://localhost:8000/?mode=chordone&id=${id}`;
        }
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                if (myJson.error) {
                    alert("Read failure.");
                } else if (myJson.error) {
                    alert(myJson.error);
                } else {
                    //画面に表示
                    this.setState({
                        title: myJson.title,
                        area: myJson.chord,
                        count: myJson.start_count,
                        bpm: myJson.bpm,
                        beat: myJson.beat
                    });
                    window.scrollTo(0, 0);
                }
            })
            .catch(error => alert(error));
    }


    render() {
        return (
            <div className="container">
                <div className="jumbotron sub-jumbotron">
                    <h1 className="h2 text-white">コード進行・編集・再生</h1>
                    <p className="text-white">色々なコード進行でアドリブの練習をしましょう。</p>
                </div>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">コード進行・編集・再生</li>
                    </ol>
                </nav>

                <h3 className="my-4">コード進行入力</h3>

                <p className="text-right"><a href="./howtowrite.html"><span className="badge badge-info">コード進行記入例と説明</span></a></p>

                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" value={this.state.title} onChange={this.titleChange} placeholder="保存する場合はここにタイトルが必要です" />
                    </div>

                    <div className="form-group">
                        <textarea className="form-control" value={this.state.area} onChange={this.areaChange} placeholder="ここにコード進行を入力して「再生」ボタンを押します" style={{ height: "150px" }}></textarea>
                    </div>

                    <div className="row my-4">
                        <div className="col-md-1"></div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label>転調</label>
                                <select className="form-control" value={this.state.transpose} onChange={this.transposeChange}>
                                    <option>-11</option>
                                    <option>-10</option>
                                    <option>-9</option>
                                    <option>-8</option>
                                    <option>-7</option>
                                    <option>-6</option>
                                    <option>-5</option>
                                    <option>-4</option>
                                    <option>-3</option>
                                    <option>-2</option>
                                    <option>-1</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    <option>11</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label>カウント数</label>
                                <select className="form-control" value={this.state.count} onChange={this.countChange}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label>テンポ (10-250)</label>
                                <input type="number" class="form-control" min="10" max="250" value={this.state.bpm} onChange={this.bpmChange} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label>ビート</label>
                                <select className="form-control" value={this.state.beat} onChange={this.beatChange}>
                                    <option value="0">指定なし</option>
                                    <option value="2">2ビート</option>
                                    <option value="3">3ビート</option>
                                    <option value="4">4ビート</option>
                                    <option value="8">8ビート</option>
                                    <option value="12">12ビート</option>
                                    <option value="16">16ビート</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label>音量</label>
                                <select className="form-control" value={this.state.volume} onChange={this.volumeChange}>
                                    <option>0</option>
                                    <option>0.1</option>
                                    <option>0.2</option>
                                    <option>0.3</option>
                                    <option>0.4</option>
                                    <option>0.5</option>
                                    <option>0.6</option>
                                    <option>0.7</option>
                                    <option>0.8</option>
                                    <option>0.9</option>
                                    <option>1</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>

                    <p className="text-center my-4">再生ボタン押下で、新しいウインドウが開き再生されます</p>

                    <div className="text-center my-4">
                        <button className="btn btn-primary" onClick={this.playClick}>再生</button>
                    </div>

                    <p className="text-center my-4"> コード進行内容とタイトルを入れ、保存ボタン押下で、ご利用ブラウザのローカルストレージに保存されます </p>

                    <div className="text-center my-4">
                        <button className="btn btn-danger" onClick={this.saveClick}>保存</button>
                    </div>

                </form>

                {this.state.localStorageData.length > 0 ? <h4 className="my-4">保存コード一覧</h4> : <></>}

                <div>{this.state.localStorageData}</div>

                <h4 className="my-4">サンプルコード一覧</h4>
                <select className="form-control" value={this.state.sample} onChange={this.sampleChange}>
                    {this.state.sampleOption}
                </select>

            </div>
        );
    }
}

export default PlayBack;