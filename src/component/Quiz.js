import React, { Component } from 'react'
import FretboardSvg from './FretboardSvg';
import {
    Fingerboard,
    RefreshDisplay
} from '../common'


class Quiz extends Component {
    constructor(props) {
        super(props);
        //多次元配列のコピー
        const displayCopy = JSON.parse(JSON.stringify(Fingerboard));
        this.state = {
            question: "",
            answer: "",
            display: displayCopy
        };

        //正解
        this.correct = "";
    }

    componentDidMount() {
        document.title = "指板の音当てクイズ | ギター練習サイト コードトーン";
        window.scrollTo(0, 0)
        this.questions();
    }

    questions() {
        this.setState({
            answer: ""
        });
        //fingerboardからランダムに一つ選択
        const gen = Math.floor(6 * Math.random())
        //選んだ弦の値から(20フレットまで)ランダムに一つ選択
        const flet = Math.floor(20 * Math.random())
        //答え
        this.correct = Fingerboard[gen][flet].note;
        //質問
        this.setState({
            question: `${gen + 1}弦の${flet + 1}フレットは何の音？`
        });
        //SVG表示
        //更に多次元配列のコピー
        const displayCopy = JSON.parse(JSON.stringify(this.state.display));
        //リフレッシュ
        RefreshDisplay(displayCopy);
        //現在のものをblock
        displayCopy[gen][flet].display = "block";
        this.setState({
            display: displayCopy
        });
    }

    answerClick(note) {
        if (this.correct === note) {
            this.setState({
                answer: <h3 className="text-success">正解</h3>
            });
        } else {
            this.setState({
                answer: <React.Fragment><h3 className="text-danger">不正解</h3>正解は {this.correct} です</React.Fragment>
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="jumbotron sub-jumbotron">
                        <h1 className="display-4 text-white">指板の音当てクイズ</h1>
                        <p className="text-white">指板の音を覚えましょう。</p>
                    </div>

                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">指板の音当てクイズ</li>
                        </ol>
                    </nav>

                    <p className="my-4"> 指板の音を下のボタン(C～Bまで)を押して答えてください。６弦から、EADGBE のレギュラーチューニングです。 </p>

                    <div className="my-2">
                        <FretboardSvg svg_title={this.state.question} display={this.state.display} />
                    </div>

                    <div className="my-5 text-center">
                        {this.state.answer}
                    </div>

                    <div className="my-5 text-center">
                        <button className="btn btn-primary ansbtn" onClick={this.answerClick.bind(this, "C")}>C</button>
                        <button className="btn btn-primary ansbtn" onClick={this.answerClick.bind(this, "Db")}>C# or Db</button>
                        <button className="btn btn-primary ansbtn" onClick={this.answerClick.bind(this, "D")}>D</button>
                        <button className="btn btn-primary ansbtn" onClick={this.answerClick.bind(this, "Eb")}>D# or Eb</button>
                        <button className="btn btn-primary ansbtn" onClick={this.answerClick.bind(this, "E")}>E</button>
                        <button className="btn btn-primary ansbtn" onClick={this.answerClick.bind(this, "F")}>F</button>
                        <button className="btn btn-primary ansbtn" onClick={this.answerClick.bind(this, "Gb")}>F# or Gb</button>
                        <button className="btn btn-primary ansbtn" onClick={this.answerClick.bind(this, "G")}>G</button>
                        <button className="btn btn-primary ansbtn" onClick={this.answerClick.bind(this, "Ab")}>G# or Ab</button>
                        <button className="btn btn-primary ansbtn" onClick={this.answerClick.bind(this, "A")}>A</button>
                        <button className="btn btn-primary ansbtn" onClick={this.answerClick.bind(this, "Bb")}>A# or Bb</button>
                        <button className="btn btn-primary ansbtn" onClick={this.answerClick.bind(this, "B")}>B</button>
                    </div>

                    <div className="my-5 text-center">
                        <button className="btn btn-secondary" onClick={this.questions.bind(this)}>次の問題</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Quiz;
