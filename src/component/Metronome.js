import React, { Component } from 'react';
import {
    soundFiles,
    loadFile
} from '../common';

class Metronome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            bpmDom: 0,
            pyayBtnColors: "",
            beatValue: 8,
            volumeValue: 0.5,
            bpmValue: 80,
            context: new AudioContext()
        }
        this.bufMap = {};
        // 音読み込み
        for (let key in soundFiles) {
            loadFile(this.state.context, soundFiles[key])
                .then((e) => {
                    this.bufMap[key] = e;
                })
                .catch((error) => {
                    alert(error);
                });
        }

        this.playClick = this.playClick.bind(this);
        this.stopClick = this.stopClick.bind(this);
        this.beatChange = this.beatChange.bind(this);
        this.volumeChange = this.volumeChange.bind(this);
        this.bpmChange = this.bpmChange.bind(this);

    }

    componentDidMount() {
        document.title = "メトロノーム | ギター練習サイト";
        window.scrollTo(0, 0);
        this.setState({
            disabled: false,
            bpmDom: 80,
        });
    }

    playSoundDrum(buffer, time, flag = false, deftime = 0, speed = 0, i = 0, n = 0) {
        if (flag) {
            const source = this.state.context.createBufferSource();
            source.buffer = buffer;
            source.onended = () => {
                if (this.state.pyayBtnColors === "") {
                    this.setState({
                        pyayBtnColors: "red"
                    });
                } else {
                    this.setState({
                        pyayBtnColors: ""
                    });
                }

                if (n === 5) {
                    this.soundLoop(speed, deftime, i + 5)
                }
            }
            //音量
            const gainNode = this.state.context.createGain();
            source.connect(gainNode);
            gainNode.gain.value = this.state.volumeValue;
            gainNode.connect(this.state.context.destination);
            //音量ここまで
            source.start(time);
        } else {
            const source = this.state.context.createBufferSource();
            source.buffer = buffer;
            //音量
            const gainNode = this.state.context.createGain();
            source.connect(gainNode);
            gainNode.gain.value = this.state.volumeValue;
            gainNode.connect(this.state.context.destination);
            //音量ここまで
            source.start(time);
        }
    }

    soundLoop(speed, time, i) {
        let speed8 = speed / 2;
        let speed12 = speed / 3;
        let speed16 = speed / 4;
        let n = 0;
        while (n < 10) {
            if (this.state.beatValue === 2) {
                this.playSoundDrum(this.bufMap["hihat"], time + (i * speed), true, time, speed, i, n);
                if (i % 2 === 0) {
                    this.playSoundDrum(this.bufMap["kick"], time + (i * speed));
                }
                if (i % 2 !== 0) {
                    this.playSoundDrum(this.bufMap["snare"], time + (i * speed));
                }
            } else if (this.state.beatValue === 3) {
                this.playSoundDrum(this.bufMap["hihat"], time + (i * speed), true, time, speed, i, n);
                if (i % 3 === 0) {
                    this.playSoundDrum(this.bufMap["kick"], time + (i * speed));
                    this.playSoundDrum(this.bufMap["snare"], time + (i * speed) + speed + speed);
                }
            } else if (this.state.beatValue === 4) {
                this.playSoundDrum(this.bufMap["hihat"], time + (i * speed), true, time, speed, i, n);
                if (i % 4 === 0) {
                    this.playSoundDrum(this.bufMap["kick"], time + (i * speed));
                    this.playSoundDrum(this.bufMap["snare"], time + (i * speed) + speed + speed + speed);
                }
            } else if (this.state.beatValue === 8) {
                this.playSoundDrum(this.bufMap["hihat"], time + (i * speed), true, time, speed, i, n);
                this.playSoundDrum(this.bufMap["hihat"], time + (i * speed) + speed8);
                if (i % 2 === 0) {
                    this.playSoundDrum(this.bufMap["kick"], time + (i * speed));
                }
                if (i % 2 !== 0) {
                    this.playSoundDrum(this.bufMap["snare"], time + (i * speed));
                }
            } else if (this.state.beatValue === 12) {
                this.playSoundDrum(this.bufMap["hihat"], time + (i * speed), true, time, speed, i, n);
                this.playSoundDrum(this.bufMap["hihat"], time + (i * speed) + speed12);
                this.playSoundDrum(this.bufMap["hihat"], time + (i * speed) + speed12 + speed12);
                if (i % 2 === 0) {
                    this.playSoundDrum(this.bufMap["kick"], time + (i * speed));
                }
                if (i % 2 !== 0) {
                    this.playSoundDrum(this.bufMap["snare"], time + (i * speed));
                }
            } else if (this.state.beatValue === 16) {
                this.playSoundDrum(this.bufMap["hihat"], time + (i * speed), true, time, speed, i, n);
                this.playSoundDrum(this.bufMap["hihat"], time + (i * speed) + speed16);
                this.playSoundDrum(this.bufMap["hihat"], time + (i * speed) + speed16 + speed16);
                this.playSoundDrum(this.bufMap["hihat"], time + (i * speed) + speed16 + speed16 + speed16);
                if (i % 2 === 0) {
                    this.playSoundDrum(this.bufMap["kick"], time + (i * speed));
                }
                if (i % 2 !== 0) {
                    this.playSoundDrum(this.bufMap["snare"], time + (i * speed));
                }

            } else {
                this.playSoundDrum(this.bufMap["hihat"], time + (i * speed), true, time, speed, i, n);
            }
            n++;
            i++;
        }
    }

    firstTime() {
        // 再生開始時間
        let time = this.state.context.currentTime + 0.100;
        // 一拍の秒数
        let speed = 60 / this.state.bpmValue;
        let i = 0;
        this.soundLoop(speed, time, i);
    }

    playClick(e) {
        this.setState({
            bpmDom: this.state.bpmValue
        });
        this.firstTime();
    }

    stopClick(e) {
        this.state.context.close();
        this.setState({
            pyayBtnColors: "",
            context: new AudioContext()
        });
    }

    beatChange(e) {
        this.setState({
            beatValue: Number(e.target.value)
        });
    }

    volumeChange(e) {
        this.setState({
            volumeValue: e.target.value
        });
    }

    bpmChange(e) {
        this.setState({
            bpmDom: e.target.value,
            bpmValue: e.target.value
        });
    }

    render() {
        return (
            <div class="container">
                <div class="jumbotron sub-jumbotron">
                    <h1 class="display-4 text-white">メトロノーム</h1>
                    <p class="text-white">リズム感を鍛える練習</p>
                </div>

                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">メトロノーム</li>
                    </ol>
                </nav>

                <p className="text-danger p-2">※ボタンを押すと音がなります</p>

                <h2 class="text-center my-5">{this.state.bpmDom} BPM</h2>

                <div class="my-2 d-flex flex-column flex-lg-row justify-content-center align-items-center">
                    <div class="m-2">
                        <button style={{ backgroundColor: this.state.pyayBtnColors }} class="btn btn-outline-secondary" onClick={this.playClick} disabled={this.state.disabled}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAVElEQVRIie2Uuw3AIBDF3GUQ1mErRso6DEIHFV0imrNoztKrLb37QJLYvEAxBRMYQAMeS7DTgWoKdkJr+xKE1vYnCKvtmkCtSBuytqbqoemvIknOLEkYO9M2jirZAAAAAElFTkSuQmCC" alt="play" /></button>
                    </div>
                    <div class="m-2">
                        <button class="btn btn-outline-secondary" onClick={this.stopClick} disabled={this.state.disabled}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAIUlEQVRIiWNgGAWjYMiD/0TiUQtGLRi1YDBbMApGwSAAAHd6Y537tr7RAAAAAElFTkSuQmCC" alt="stop" /></button>
                    </div>
                    <div class="m-2">
                        <select class="form-control" value={this.state.beatValue} onChange={this.beatChange}>
                            <option value="0">ビート指定なし</option>
                            <option value="2">2ビート</option>
                            <option value="3">3ビート</option>
                            <option value="4">4ビート</option>
                            <option value="8">8ビート</option>
                            <option value="12">12ビート</option>
                            <option value="16">16ビート</option>
                        </select>
                    </div>
                    <div class="m-2">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAeElEQVRIie2U0QnAIAwFb6SO4GbNhrpBO0I3SH+UCrFQJPmqB/k09wKJsHBmA3ItdwTQrtxoqZUAgXQNS5VNCxJwYJNqFTWmBeegcUvdMy34+nAJluCdC7umGcc1TYxvQYHdQzBCsNOEfHYFO5U7Ei2AZ5oSJfghN3LBWGKLsUm4AAAAAElFTkSuQmCC" alt="volume" />
                        <input type="range" min="0" max="1" step="0.1" value={this.state.volumeValue} onChange={this.volumeChange} />
                    </div>
                    <div class="m-2">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA1klEQVRIie2TXQ3DMAyEPyiFECYrhEIIhDJYGSwQxmBlkDJoGGwMtpdE86T8eO1TpZ7kl/h8sc8JnDgCBuAGeOAdw8ezyx7hHliFaCnWyP0LkxAIgAWMyJt4FgTvukXcKvhW8KcWuRdk0+BKGFFXtSug7xygE9w0yVoiD3w91yDtoMs0mJ3Coeu+Ax4FbprC5QoX2t5b4Bl5cyafduFzxWlJJYyC8+LXGpVO64I7uudb1JmpW2TiJWNFPFk055JO0V0L1SXLT7Y3ip9tUQrUYtkw+Ykj4wNDlnej8x6PgwAAAABJRU5ErkJggg==" alt="bpm" />
                        <input type="range" min="10" max="250" step="1" value={this.state.bpmValue} onChange={this.bpmChange} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Metronome;