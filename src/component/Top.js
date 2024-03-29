import React, { Component } from 'react'

class Top extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="container">

                <div className="jumbotron top-jumbotron">
                    <h1 className="display-4 text-black-50 ml-4">Guitar practice</h1>
                </div>

                <div className="row">
                    <div className="col-sm-6 my-4">
                        <div className="card">
                            <div className="card-header"><span role="img" aria-label="Guitar">🎸</span> コード進行・編集・再生</div>
                            <div className="card-body">
                                <p>コード進行を入力して再生できます。色々なコード進行でアドリブの練習ができます。</p>
                                <p className="text-right"><a className="btn btn-primary" href="playback.html">Click</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 my-4">
                        <div className="card">
                            <div className="card-header"><span role="img" aria-label="Guitar">🎸</span> メトロノーム</div>
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
                            <div className="card-header"><span role="img" aria-label="Guitar">🎸</span> チューニング</div>
                            <div className="card-body">
                                <p>最初は音合わせから。</p>
                                <p className="text-right"><a className="btn btn-primary" href="tuning.html">Click</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 my-4">
                        <div className="card">
                            <div className="card-header"><span role="img" aria-label="Guitar">🎸</span> 指板の音当てクイズ</div>
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
                            <div className="card-header"><span role="img" aria-label="Guitar">🎸</span> ランダム指板の音</div>
                            <div className="card-body">
                                <p>指板の音を覚えるための練習。</p>
                                <p className="text-right"><a className="btn btn-primary" href="basic.html">Click</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 my-4">
                        <div className="card">
                            <div className="card-header"><span role="img" aria-label="Guitar">🎸</span> ランダム・トライアド</div>
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
                            <div className="card-header"><span role="img" aria-label="Guitar">🎸</span> ランダム・コード＆コードトーン</div>
                            <div className="card-body">
                                <p>コードを即座に押さえる練習＆コードトーンを弾けるようになるための練習。</p>
                                <p className="text-right"><a className="btn btn-primary" href="chord.html">Click</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 my-4">
                        <div className="card">
                            <div className="card-header"><span role="img" aria-label="Guitar">🎸</span> スケール</div>
                            <div className="card-body">
                                <p>スケールも覚えましょう。とりあえずは「マイナーペンタトニックスケール」を覚えましょう。</p>
                                <p className="text-right"><a className="btn btn-primary" href="scale.html">Click</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Top;