import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

import FretboardSvg from './FretboardSvg';
import {
    Fingerboard,
    RefreshDisplay,
    transposition
} from '../common'


class Scale extends Component {
    constructor(props) {
        super(props);
        //多次元配列のコピー
        const displayCopy = JSON.parse(JSON.stringify(Fingerboard));
        this.state = {
            keyValue: "1",
            keySelectedIndexText: "C",
            scaleValue: "",
            scaleSelectedIndexText: "",
            selectOption: [],
            scaleName: "",
            display: displayCopy
        };

        this.keyChange = this.keyChange.bind(this);
        this.scaleChange = this.scaleChange.bind(this);
        this.show = this.show.bind(this);
    }

    componentDidMount() {
        document.title = "スケール | ギター練習サイト コードトーン";
        window.scrollTo(0, 0);
        //読み込んだら実行
        let url = "./api/?mode=scale";
        if (process.env.NODE_ENV !== "production") {
            console.log('devlope');
            url = "http://localhost/test/api/?mode=scale";
        }
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(myJson => {
                if (myJson.error) {
                    alert("Read failure.")
                } else {
                    let arr = [<option key={uuidv4()} value=""></option>];
                    for (let v of myJson) {
                        arr.push(<option key={uuidv4()} value={v.keys}>{v.name}</option>);
                    }
                    this.setState({ selectOption: arr });
                }
            })
            .catch(error => alert(error))
    }

    keyChange(e) {
        this.setState({
            keyValue: e.target.value,
            keySelectedIndexText: e.target[e.target.selectedIndex].text
        });
    }

    scaleChange(e) {
        this.setState({
            scaleValue: e.target.value,
            scaleSelectedIndexText: e.target[e.target.selectedIndex].text
        });
    }

    show(e) {
        e.preventDefault();
        //キーに合わせた音配列を取得
        const ary = transposition(this.state.keyValue);
        const tmp = [];
        //配列にする
        const keys = this.state.scaleValue.split(',');
        for (let i = 0; i < ary.length; i++) {
            for (const v of keys) {
                if (parseInt(v) === i + 1) {
                    tmp.push(ary[i])
                }
            }
        }
        //キーに合わせた音配列
        // console.log(tmp);

        //SVG表示
        //ルートの色
        let color1 = "red"
        //それ以外の色
        let color2 = "blue"

        //更に多次元配列のコピー
        const displayCopy = JSON.parse(JSON.stringify(this.state.display));
        //リフレッシュ
        RefreshDisplay(displayCopy);
        // 表示する
        let rootCount = 0;
        for (const v of tmp) {
            // 1~6弦
            for (let g = 0; g < 6; g++) {
                for (let i = 0; i < displayCopy[g].length; i++) {
                    if (v === displayCopy[g][i].note) {
                        if (rootCount === 0) {
                            displayCopy[g][i].fill = color1;
                        } else {
                            displayCopy[g][i].fill = color2;
                        }
                        displayCopy[g][i].display = "block";
                    }
                }
            }
            rootCount++
        }

        //SVGのタイトルとdisplayを更新
        this.setState({
            scaleName: `${this.state.keySelectedIndexText} ${this.state.scaleSelectedIndexText}`,
            display: displayCopy
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="jumbotron sub-jumbotron">
                        <h1 className="display-4 text-white">スケール</h1>
                        <p className="text-white">スケールを覚えましょう</p>
                    </div>

                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">スケール</li>
                        </ol>
                    </nav>

                    <h2 className="h4 my-4">スケール選択</h2>
                    <form className="form-inline">
                        <div className="m-2">
                            <select className="form-control" value={this.state.keyValue} onChange={this.keyChange}>
                                <option value="1">C</option>
                                <option value="2">Db</option>
                                <option value="3">D</option>
                                <option value="4">Eb</option>
                                <option value="5">E</option>
                                <option value="6">F</option>
                                <option value="7">Gb</option>
                                <option value="8">G</option>
                                <option value="9">Ab</option>
                                <option value="10">A</option>
                                <option value="11">Bb</option>
                                <option value="12">B</option>
                            </select>
                        </div>
                        <div className="m-2">
                            <select className="form-control" value={this.state.scaleValue} onChange={this.scaleChange}>
                                {this.state.selectOption}
                            </select>
                        </div>
                        <div className="m-2">
                            <button className="btn btn-primary" onClick={this.show}>表示</button>
                        </div>
                    </form>

                    <div className="my-4">
                        <FretboardSvg svg_title={this.state.scaleName} display={this.state.display} />
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

export default Scale;
