import React, { Component } from 'react';
import {
    soundFiles,
    calcFrequency,
    loadFile
} from '../common';


class Tuning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volumeValue: 0.5,
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

        this.playSound = this.playSound.bind(this);
        this.volumeChange = this.volumeChange.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    volumeChange(e) {
        e.preventDefault();
        this.setState({
            volumeValue: e.target.value
        });
    }

    playSound(e) {
        e.preventDefault();
        const context = this.state.context;
        const source = context.createBufferSource();
        source.buffer = this.bufMap["guitar"];
        source.playbackRate.value = calcFrequency(e.target.textContent);
        //音量
        const gainNode = context.createGain();
        source.connect(gainNode);
        gainNode.gain.value = this.state.volumeValue;
        gainNode.connect(context.destination);
        //音量ここまで
        source.start(0);
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron sub-jumbotron">
                    <h1 className="display-4 text-white">チューニング</h1>
                    <p className="text-white">ボタンを押すと音がなります。<br />音階名横の数字はオクターブの高さを表しています。</p>
                </div>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">チューニング</li>
                    </ol>
                </nav>

                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>ボタンを押すと音がなります</strong> 音量に注意してください。
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div className="row">
                    <div className="col-lg-6 my-5">
                        <h3 className="h4">レギュラーチューニング</h3>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>1弦</th>
                                        <th>2弦</th>
                                        <th>3弦</th>
                                        <th>4弦</th>
                                        <th>5弦</th>
                                        <th>6弦</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><button className="btn btn-primary note" onClick={this.playSound}>E4</button></td>
                                        <td><button className="btn btn-primary note" onClick={this.playSound}>B3</button></td>
                                        <td><button className="btn btn-primary note" onClick={this.playSound}>G3</button></td>
                                        <td><button className="btn btn-primary note" onClick={this.playSound}>D3</button></td>
                                        <td><button className="btn btn-primary note" onClick={this.playSound}>A2</button></td>
                                        <td><button className="btn btn-primary note" onClick={this.playSound}>E2</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-lg-6 my-5">
                        <h3 className="h4">半音下げチューニング</h3>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>1弦</th>
                                        <th>2弦</th>
                                        <th>3弦</th>
                                        <th>4弦</th>
                                        <th>5弦</th>
                                        <th>6弦</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><button className="btn btn-primary note" onClick={this.playSound}>Eb4</button></td>
                                        <td><button className="btn btn-primary note" onClick={this.playSound}>Bb3</button></td>
                                        <td><button className="btn btn-primary note" onClick={this.playSound}>Gb3</button></td>
                                        <td><button className="btn btn-primary note" onClick={this.playSound}>Db3</button></td>
                                        <td><button className="btn btn-primary note" onClick={this.playSound}>Ab2</button></td>
                                        <td><button className="btn btn-primary note" onClick={this.playSound}>Eb2</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 my-5">
                        <h3 className="h4">ドロップDチューニング</h3>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>1弦</th>
                                        <th>2弦</th>
                                        <th>3弦</th>
                                        <th>4弦</th>
                                        <th>5弦</th>
                                        <th>6弦</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><button className="btn btn-primary note" onClick={this.playSound}>E4</button></td>
                                        <td><button className="btn btn-primary note" onClick={this.playSound}>B3</button></td>
                                        <td><button className="btn btn-primary note" onClick={this.playSound}>G3</button></td>
                                        <td><button className="btn btn-primary note" onClick={this.playSound}>D3</button></td>
                                        <td><button className="btn btn-primary note" onClick={this.playSound}>A2</button></td>
                                        <td><button className="btn btn-primary note" onClick={this.playSound}>D2</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-lg-6 my-5">
                        <h3 className="h4">基準周波数A=440Hz(音叉の音)</h3>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>
                                            1弦の5フレット
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <button className="btn btn-primary note" onClick={this.playSound}>A4</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="m-2 text-center">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAeElEQVRIie2U0QnAIAwFb6SO4GbNhrpBO0I3SH+UCrFQJPmqB/k09wKJsHBmA3ItdwTQrtxoqZUAgXQNS5VNCxJwYJNqFTWmBeegcUvdMy34+nAJluCdC7umGcc1TYxvQYHdQzBCsNOEfHYFO5U7Ei2AZ5oSJfghN3LBWGKLsUm4AAAAAElFTkSuQmCC" alt="volume" />
                    <input type="range" min="0" max="1" step="0.1" value={this.state.volumeValue} onChange={this.volumeChange} />
                </div>
            </div>
        );
    }
}

export default Tuning;