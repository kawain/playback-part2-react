import React, { Component } from 'react'

class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
                <div className="container">
                    <a className="navbar-brand" href="/"><img src="./img/logo.svg" width="64" height="30" alt="Guitar practice" /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/playback2.html">コード進行・編集・再生</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/bbs.php">コード進行掲示板</a>
                                    <a className="dropdown-item" href="/metronome.html">メトロノーム</a>
                                    <a className="dropdown-item" href="/tuning.html">チューニング</a>
                                    <a className="dropdown-item" href="/quiz.html">指板の音当てクイズ</a>
                                    <a className="dropdown-item" href="/basic.html">ランダム指板の音</a>
                                    <a className="dropdown-item" href="/triad.html">ランダム・トライアド</a>
                                    <a className="dropdown-item" href="/chord.html">ランダム・コード＆コードトーン</a>
                                    <a className="dropdown-item" href="/scale.html">スケール</a>
                                    <a className="dropdown-item" href="/howtowrite.html">コード進行記入例と説明</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav;