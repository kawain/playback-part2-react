import React, { Component } from 'react';

class HowToWrite extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        document.title = "コード進行記入例と説明 | ギター練習サイト コードトーン";
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div class="container">
                <div class="jumbotron sub-jumbotron">
                    <h1 class="text-white">コード進行記入例と説明</h1>
                </div>

                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">コード進行記入例と説明</li>
                    </ol>
                </nav>

                <div class="line px-4 howtowrite">

                    <h3 class="my-4">コード進行記入の仕方</h3>

                    <ul>
                        <li>すべて半角文字で入力</li>
                        <li>コードは一拍ごとに記入できます</li>
                        <li>コードや記号の間はスペース</li>
                        <li>改行はあってもなくてもかまいません</li>
                        <li><span class="badge badge-dark">/</span> は前と同じ</li>
                        <li><span class="badge badge-dark">-</span> は休み</li>
                        <li><span class="badge badge-dark">|</span> は小節の区切り (なくてもかまいません)</li>
                        <li>音名の書き方 (フラットは小文字のbです)<br />
                            <span class="badge badge-dark">C</span>
                            <span class="badge badge-dark">C#</span>
                            <span class="badge badge-dark">Db</span>
                            <span class="badge badge-dark">D</span>
                            <span class="badge badge-dark">D#</span>
                            <span class="badge badge-dark">Eb</span>
                            <span class="badge badge-dark">E</span>
                            <span class="badge badge-dark">F</span>
                            <span class="badge badge-dark">F#</span>
                            <span class="badge badge-dark">Gb</span>
                            <span class="badge badge-dark">G</span>
                            <span class="badge badge-dark">G#</span>
                            <span class="badge badge-dark">Ab</span>
                            <span class="badge badge-dark">A</span>
                            <span class="badge badge-dark">A#</span>
                            <span class="badge badge-dark">Bb</span>
                            <span class="badge badge-dark">B</span>
                        </li>
                        <li>使えるコードとその書き方 (C△7 や Cm7-5 などの書き方はできません。それぞれ CM7, Cm7b5 と書きます)<br />
                            例：Cの場合<br />
                            <span class="badge badge-dark">C</span>
                            <span class="badge badge-dark">Cadd9</span>
                            <span class="badge badge-dark">Caug</span>
                            <span class="badge badge-dark">C6</span>
                            <span class="badge badge-dark">C69</span>
                            <span class="badge badge-dark">CM7</span>
                            <span class="badge badge-dark">CM7b5</span>
                            <span class="badge badge-dark">CM7#5</span>
                            <span class="badge badge-dark">CM7#11</span>
                            <span class="badge badge-dark">CM9</span>
                            <span class="badge badge-dark">CM9#11</span>
                            <span class="badge badge-dark">CM13</span>
                            <span class="badge badge-dark">CM13#11</span>
                            <span class="badge badge-dark">Cm</span>
                            <span class="badge badge-dark">Cm6</span>
                            <span class="badge badge-dark">Cm69</span>
                            <span class="badge badge-dark">Cmadd9</span>
                            <span class="badge badge-dark">Cm7</span>
                            <span class="badge badge-dark">Cm7b5</span>
                            <span class="badge badge-dark">Cm7#5</span>
                            <span class="badge badge-dark">CmM7</span>
                            <span class="badge badge-dark">Cm9</span>
                            <span class="badge badge-dark">Cm11</span>
                            <span class="badge badge-dark">Cm11b5</span>
                            <span class="badge badge-dark">Cm13</span>
                            <span class="badge badge-dark">C7</span>
                            <span class="badge badge-dark">C7sus4</span>
                            <span class="badge badge-dark">C7b5</span>
                            <span class="badge badge-dark">C7#5</span>
                            <span class="badge badge-dark">C9</span>
                            <span class="badge badge-dark">C9sus4</span>
                            <span class="badge badge-dark">C7b9</span>
                            <span class="badge badge-dark">C7#9</span>
                            <span class="badge badge-dark">C7#11</span>
                            <span class="badge badge-dark">C13b9</span>
                            <span class="badge badge-dark">C13</span>
                            <span class="badge badge-dark">Csus4</span>
                            <span class="badge badge-dark">Cdim</span>
                            <span class="badge badge-dark">Cdim7</span>
                            <span class="badge badge-dark">C5</span>
                        </li>
                        <li>onコードの書き方<br />
                            コードの最後にonとベース音を書きます<br />
                            例：<span class="badge badge-dark">CmonEb</span>
                        </li>
                    </ul>


                    <h4 class="mt-5">コード進行の記入例</h4>

                    <div class="alert alert-light" role="alert">
                        <pre class="mb-0">{`C - C - | C - C - | E7 - E7 - | E7 - E7 - |
A7 - A7 / | A7 - A7 / | Dm - Dm / | Dm - Dm / |
E7 - E7 - | E7 - E7 - | Am - Am - | Am - Am - |
D7 - D7 - | D7 - D7 - | Fm7 - Fm7 - | G7 - G7 - |
C - C - | C - C - | E7 - E7 - | E7 - E7 - |
A7 - A7 - | A7 - A7 - | Dm - Dm - | Dm - Dm - |
F - F - | F - F - | CM7 - CM7 - | A7 - A7 - |
Dm7b5 - Dm7b5 - | G7 - G7 - | C - C - | Dm7 - G7 - |`}</pre>
                    </div>

                </div>
            </div>
        );
    }
}

export default HowToWrite;