import React, { Component } from 'react';
import FretboardSvg from './FretboardSvg';
import {
    Fingerboard,
    soundFiles,
    loadFile
} from '../common';
import BTC from '../BTC';

class Chord extends Component {
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
        window.scrollTo(0, 0)
        this.setState({
            disabled: false
        });
    }

    playClick(e) {
        const obj = new BTC(this, "chord");
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
                    <h1 className="h3 text-white">ランダム・コード＆コードトーン</h1>
                    <p className="text-white">コードを即座に押さえる練習とコードトーンを弾けるようになるための練習。</p>
                </div>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">ランダム・コード＆コードトーン</li>
                    </ol>
                </nav>

                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>再生ボタンを押すと音がなります</strong> 音量に注意してください。
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

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

                <p className="my-2 text-center">
                    ※色のついた場所は全部コードトーン　※赤と青がコードのポジション　※赤がルート音　※ピンク色もルート音
                </p>

                <h3 className="my-5">押さえ方</h3>
                <p className="my-4">Cの例です。他のコードの場合ポジションを変えてください。</p>
                <h4 className="my-4">メジャーセブンス</h4>
                <h5 className="my-4">6弦がルートの場合</h5>
                <div className="text-center"> <img src="./img/chord/CM7-6.png" alt="CM7-6" /> </div>
                <h5 className="my-4">5弦がルートの場合</h5>
                <div className="text-center"> <img src="./img/chord/CM7-5.png" alt="CM7-5" /> </div>
                <h4 className="my-4">マイナーセブンス</h4>
                <h5 className="my-4">6弦がルートの場合</h5>
                <div className="text-center"> <img src="./img/chord/C-7-6.png" alt="Cm-7-6" /> </div>
                <h5 className="my-4">5弦がルートの場合</h5>
                <div className="text-center"> <img src="./img/chord/C-7-5.png" alt="Cm-7-5" /> </div>
                <h4 className="my-4">セブンス</h4>
                <h5 className="my-4">6弦がルートの場合</h5>
                <div className="text-center"> <img src="./img/chord/C7-6.png" alt="C7-6" /> </div>
                <h5 className="my-4">5弦がルートの場合</h5>
                <div className="text-center"> <img src="./img/chord/C7-5.png" alt="C7-5" /> </div>
                <h4 className="my-4">マイナーセブンスフラットファイブ</h4>
                <h5 className="my-4">6弦がルートの場合</h5>
                <div className="text-center"> <img src="./img/chord/Cm7b5-6.png" alt="Cm7b5-6" /> </div>
                <h5 className="my-4">5弦がルートの場合</h5>
                <div className="text-center"> <img src="./img/chord/Cm7b5-5.png" alt="Cm7b5-5" /> </div>
            </div>
        );
    }
}

export default Chord;