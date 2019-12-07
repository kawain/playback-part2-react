import React, { Component } from 'react';
import FretboardSvg from './FretboardSvg';
import {
    Fingerboard,
    soundFiles,
    loadFile
} from '../common';
import BTC from '../BTC';

class Triad extends Component {
    constructor(props) {
        super(props);
        //多次元配列のコピー
        const displayCopy = JSON.parse(JSON.stringify(Fingerboard));
        this.state = {
            display: displayCopy,
            now: "",
            next: "",
            disabled: true,
            openClose: true,
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
        this.pauseClick = this.pauseClick.bind(this);
        this.stopClick = this.stopClick.bind(this);
        this.openCloseClick = this.openCloseClick.bind(this);
        this.volumeChange = this.volumeChange.bind(this);
        this.bpmChange = this.bpmChange.bind(this);

    }

    componentDidMount() {
        document.title = "ランダム・トライアド | ギター練習サイト コードトーン";
        window.scrollTo(0, 0)
        this.setState({
            disabled: false
        });
    }

    playClick(e) {
        const obj = new BTC(this, "triad");
        obj.firstTime();
    }

    pauseClick(e) {
        const context = this.state.context;
        if (context.state !== "closed") {
            if (context.state === "running") {
                context.suspend().then(function () {
                    // console.log("再開")
                });
            } else if (context.state === "suspended") {
                context.resume().then(function () {
                    // console.log("停止")
                });
            }
        }
    }

    stopClick(e) {
        this.state.context.close();
        this.setState({
            context: new AudioContext()
        });
    }

    openCloseClick(e) {
        this.setState({
            openClose: !this.state.openClose
        });
    }

    volumeChange(e) {
        this.setState({
            volumeValue: e.target.value
        });
    }

    bpmChange(e) {
        this.setState({
            bpmValue: e.target.value
        });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron sub-jumbotron">
                    <h1 className="display-4 text-white">ランダム・トライアド</h1>
                    <p className="text-white">トライアドを押さえられるようになるための練習。<br />123弦と234弦を押さえるトライアドのパターンを覚えましょう。</p>
                </div>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">ランダム・トライアド</li>
                    </ol>
                </nav>

                <p className="text-danger p-2">※ボタンを押すと音がなります</p>

                <h2 className="display-3">{this.state.now}</h2>
                <p className="text-right h3">{this.state.next}</p>

                <div style={{ display: this.state.openClose ? 'block' : 'none' }}>
                    <FretboardSvg svg_title={""} display={this.state.display} />
                </div>

                <div className="my-2 d-flex flex-column flex-md-row justify-content-center align-items-center">
                    <div className="m-2">
                        <button className="btn btn-outline-secondary" onClick={this.playClick} disabled={this.state.disabled}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAVElEQVRIie2Uuw3AIBDF3GUQ1mErRso6DEIHFV0imrNoztKrLb37QJLYvEAxBRMYQAMeS7DTgWoKdkJr+xKE1vYnCKvtmkCtSBuytqbqoemvIknOLEkYO9M2jirZAAAAAElFTkSuQmCC" alt="play" /></button>
                    </div>
                    <div className="m-2">
                        <button className="btn btn-outline-secondary" onClick={this.pauseClick} disabled={this.state.disabled}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAI0lEQVRIiWNgGAWjYFiA/0gYn9ioBaMWjFowmC0YBaNggAEAfoM7xeGFS3YAAAAASUVORK5CYII=" alt="pause" /></button>
                    </div>
                    <div className="m-2">
                        <button className="btn btn-outline-secondary" onClick={this.stopClick} disabled={this.state.disabled}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAIUlEQVRIiWNgGAWjYMiD/0TiUQtGLRi1YDBbMApGwSAAAHd6Y537tr7RAAAAAElFTkSuQmCC" alt="stop" /></button>
                    </div>
                    <div className="m-2">
                        <button className="btn btn-outline-secondary" onClick={this.openCloseClick}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA7klEQVRIid2U4Q2CMBBG3wgdgREYxQ3sCG4Am+gGjgAbyAawgW6AP7hqU6+lmBQTmzSE3Hffu3JH4d/WATAlzWfgVgpigGFvSAUcgau8z16sk9jmQnxI7m62gkLISU7jVgVY4BKcahViWJodQlLJdaYOgF6EGmQE7vJslMKcrouZWxFMQRWxnrQKZJKY1QCpoAYZE0VqsTRdgTwSgEkz8OmxRoU9CT/luFLkq8mpadCmy/D+EfuYuZZcZ+qc+ZAoTE2egTPLlVCt6LLM/eSWz9F020ZO8tW9ZFm+azhBtafZ/RYuDmlLABykmPlv1hP++IN+kD23UgAAAABJRU5ErkJggg==" alt="open close" /></button>
                    </div>
                    <div className="m-2">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAeElEQVRIie2U0QnAIAwFb6SO4GbNhrpBO0I3SH+UCrFQJPmqB/k09wKJsHBmA3ItdwTQrtxoqZUAgXQNS5VNCxJwYJNqFTWmBeegcUvdMy34+nAJluCdC7umGcc1TYxvQYHdQzBCsNOEfHYFO5U7Ei2AZ5oSJfghN3LBWGKLsUm4AAAAAElFTkSuQmCC" alt="volume" />
                        <input type="range" id="volume_value" min="0" max="1" step="0.1" value={this.state.volumeValue} onChange={this.volumeChange} />
                    </div>
                    <div className="m-2">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA1klEQVRIie2TXQ3DMAyEPyiFECYrhEIIhDJYGSwQxmBlkDJoGGwMtpdE86T8eO1TpZ7kl/h8sc8JnDgCBuAGeOAdw8ezyx7hHliFaCnWyP0LkxAIgAWMyJt4FgTvukXcKvhW8KcWuRdk0+BKGFFXtSug7xygE9w0yVoiD3w91yDtoMs0mJ3Coeu+Ax4FbprC5QoX2t5b4Bl5cyafduFzxWlJJYyC8+LXGpVO64I7uudb1JmpW2TiJWNFPFk055JO0V0L1SXLT7Y3ip9tUQrUYtkw+Ykj4wNDlnej8x6PgwAAAABJRU5ErkJggg==" alt="bpm" />
                        <input type="range" id="bpm_value" min="10" max="250" step="1" value={this.state.bpmValue} onChange={this.bpmChange} />
                    </div>
                </div>

                <h3 className="my-5">押さえ方 </h3>
                <p>Cの例です。他のコードの場合ポジションを変えてください。</p>
                <h4 className="my-4">1、2、3弦を押さえるパターン</h4>
                <h5>1弦がルートの場合(略称:123-1)</h5>
                <div className="text-center">
                    <img src="./img/triad/123_C_1.png" alt="C" />
                    <img src="./img/triad/123_Cm_1.png" alt="Cm" />
                    <img src="./img/triad/123_Cm7b5_1.png" alt="Cm7b5" />
                </div>
                <h5>2弦がルートの場合(略称:123-2)</h5>
                <div className="text-center">
                    <img src="./img/triad/123_C_2.png" alt="C" />
                    <img src="./img/triad/123_Cm_2.png" alt="Cm" />
                    <img src="./img/triad/123_Cm7b5_2.png" alt="Cm7b5" />
                </div>
                <h5>3弦がルートの場合(略称:123-3)</h5>
                <div className="text-center">
                    <img src="./img/triad/123_C_3.png" alt="C" />
                    <img src="./img/triad/123_Cm_3.png" alt="Cm" />
                    <img src="./img/triad/123_Cm7b5_3.png" alt="Cm7b5" />
                </div>
                <h4 className="my-4">2、3、4弦を押さえるパターン</h4>
                <h5>2弦がルートの場合(略称:234-2)</h5>
                <div className="text-center">
                    <img src="./img/triad/234_C_2.png" alt="C" />
                    <img src="./img/triad/234_Cm_2.png" alt="Cm" />
                    <img src="./img/triad/234_Cm7b5_2.png" alt="Cm7b5" />
                </div>
                <h5>3弦がルートの場合(略称:234-3)</h5>
                <div className="text-center">
                    <img src="./img/triad/234_C_3.png" alt="C" />
                    <img src="./img/triad/234_Cm_3.png" alt="Cm" />
                    <img src="./img/triad/234_Cm7b5_3.png" alt="Cm7b5" />
                </div>
                <h5>4弦がルートの場合(略称:234-4)</h5>
                <div className="text-center">
                    <img src="./img/triad/234_C_4.png" alt="C" />
                    <img src="./img/triad/234_Cm_4.png" alt="Cm" />
                    <img src="./img/triad/234_Cm7b5_4.png" alt="Cm7b5" />
                </div>
            </div>
        );
    }
}

export default Triad;