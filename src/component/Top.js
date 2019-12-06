import React, { Component } from 'react'

class Top extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div className="container">

                <div className="jumbotron top-jumbotron">
                    <h1 className="display-4 text-black-50 ml-4">Guitar practice</h1>
                </div>

                <div className="card">
                    <div className="card-header"> コード進行・編集・再生</div>
                    <div className="card-body">
                        <p>コード進行を入力して再生できます。色々なコード進行でアドリブの練習ができます。</p>
                        <p className="text-right"><a className="btn btn-primary" href="playback2.html">Click</a></p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6 my-4">
                        <div className="card">
                            <div className="card-header"> コード進行掲示板</div>
                            <div className="card-body">
                                <p>かっこいいコード進行ができたら公開して共有しましょう。</p>
                                <p className="text-right"><a className="btn btn-primary" href="bbs.php">Click</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 my-4">
                        <div className="card">
                            <div className="card-header">メトロノーム</div>
                            <div className="card-body">
                                <p>ドラムの音に合わせてリズム感を鍛えましょう。</p>
                                <p className="text-right"><a className="btn btn-primary" href="metronome.html">Click</a></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6 my-4">
                        <div className="card">
                            <div className="card-header">チューニング</div>
                            <div className="card-body">
                                <p>最初は音合わせから。</p>
                                <p className="text-right"><a className="btn btn-primary" href="tuning.html">Click</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 my-4">
                        <div className="card">
                            <div className="card-header">指板の音当てクイズ</div>
                            <div className="card-body">
                                <p>指板の音を覚えるためのクイズ。指板の音を覚えるのが第一歩です。</p>
                                <p className="text-right"><a className="btn btn-primary" href="quiz.html">Click</a></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6 my-4">
                        <div className="card">
                            <div className="card-header">ランダム指板の音</div>
                            <div className="card-body">
                                <p>指板の音を覚えるための練習。</p>
                                <p className="text-right"><a className="btn btn-primary" href="basic.html">Click</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 my-4">
                        <div className="card">
                            <div className="card-header">ランダム・トライアド</div>
                            <div className="card-body">
                                <p>トライアドを押さえられるようになるための練習。</p>
                                <p className="text-right"><a className="btn btn-primary" href="triad.html">Click</a></p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-sm-6 my-4">
                        <div className="card">
                            <div className="card-header"> ランダム・コード＆コードトーン</div>
                            <div className="card-body">
                                <p>コードを即座に押さえる練習＆コードトーンを弾けるようになるための練習。</p>
                                <p className="text-right"><a className="btn btn-primary" href="chord.html">Click</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 my-4">
                        <div className="card">
                            <div className="card-header"> スケール</div>
                            <div className="card-body">
                                <p>スケールも覚えましょう。とりあえずは「マイナーペンタトニックスケール」を覚えましょう。</p>
                                <p className="text-right"><a className="btn btn-primary" href="scale.html">Click</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="alert alert-danger" role="alert">※ Google Chrome と Firefox で動作確認しています</div>
            </div>
        )
    }
}

export default Top;