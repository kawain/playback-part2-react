import React, { Component } from 'react'
import uuidv4 from 'uuid/v4';

class FretboardSvg extends Component {

    fretsStrings() {
        //座標
        const coordinate = [
            [34, 60],
            [69, 60],
            [104, 60],
            [139, 60],
            [172, 60],
            [208, 60],
            [242, 60],
            [278, 60],
            [312, 60],
            [343, 60],
            [378, 60],
            [413, 60],
            [448, 60],
            [483, 60],
            [519, 60],
            [554, 60],
            [589, 60],
            [623, 60],
            [658, 60],
            [694, 60],
            [7, 85],
            [7, 105],
            [7, 125],
            [7, 145],
            [7, 165],
            [7, 185],
        ]

        let text;
        let i1 = 1;
        let i2 = 1;
        let arr = [];
        for (const v of coordinate) {
            let text_textContent = "";
            if (v[0] === 7) {
                text_textContent = i2;
                i2++;
            } else {
                text_textContent = i1;
                i1++;
            }
            text = <text key={uuidv4()} x={v[0]} y={v[1]} fill="#222">{text_textContent}</text>;
            arr.push(text);
        }

        return arr;
    }

    drawLine(kind) {
        let coordinate;

        if (kind === 1) {
            //横線座標
            coordinate = [
                [20, 80, 740, 80, 1],
                [20, 100, 740, 100, 1],
                [20, 120, 740, 120, 1],
                [20, 140, 740, 140, 1],
                [20, 160, 740, 160, 1],
                [20, 180, 740, 180, 1],
            ]
        } else {
            //縦線座標
            coordinate = [
                [20, 80, 20, 180, 3],
                [55, 80, 55, 180, 1],
                [90, 80, 90, 180, 1],
                [125, 80, 125, 180, 1],
                [160, 80, 160, 180, 1],
                [195, 80, 195, 180, 1],
                [230, 80, 230, 180, 1],
                [265, 80, 265, 180, 1],
                [300, 80, 300, 180, 1],
                [335, 80, 335, 180, 1],
                [370, 80, 370, 180, 1],
                [405, 80, 405, 180, 1],
                [440, 80, 440, 180, 1],
                [475, 80, 475, 180, 1],
                [510, 80, 510, 180, 1],
                [545, 80, 545, 180, 1],
                [580, 80, 580, 180, 1],
                [615, 80, 615, 180, 1],
                [650, 80, 650, 180, 1],
                [685, 80, 685, 180, 1],
                [720, 80, 720, 180, 1]
            ]
        }

        let line;
        let arr = [];
        for (const v of coordinate) {
            line = <line key={uuidv4()} x1={v[0]} y1={v[1]} x2={v[2]} y2={v[3]} stroke="#000" strokeWidth={v[4]}></line>;
            arr.push(line);
        }

        return arr;
    }

    circleMark() {
        //座標
        const coordinate = [
            [107, 130],
            [177, 130],
            [247, 130],
            [317, 130],
            [423, 110],
            [423, 150],
            [528, 130],
            [598, 130],
            [668, 130]
        ]

        let circle;
        let arr = [];
        for (const v of coordinate) {
            circle = <circle key={uuidv4()} cx={v[0]} cy={v[1]} r="5" fill="#444"></circle>;
            arr.push(circle);
        }

        return arr;
    }

    fretPosition(display) {
        //座標
        const cx = [38, 73, 108, 143, 178, 213, 248, 283, 318, 353, 388, 423, 458, 493, 528, 563, 598, 633, 668, 703];
        const cy = [80, 100, 120, 140, 160, 180];

        let circle;
        let arr = [];

        for (let n = 0; n < cy.length; n++) {
            for (let i = 0; i < cx.length; i++) {
                circle = <circle key={uuidv4()} cx={cx[i]} cy={cy[n]} r="9" fill={display[n][i].fill} display={display[n][i].display}></circle>;
                arr.push(circle);
            }
        }
        return arr;
    }

    render() {
        return (
            <React.Fragment>
                <svg viewBox="0 0 750 200">
                    <g fontFamily="sans-serif" fontSize="24">
                        <text x="10" y="30" fill="#222">{this.props.svg_title}</text>
                    </g>
                    <g fontFamily="sans-serif" fontSize="14">
                        {this.fretsStrings()}
                    </g>
                    {this.drawLine(1)}
                    {this.drawLine(2)}
                    {this.circleMark()}
                    {this.fretPosition(this.props.display)}
                </svg>
            </React.Fragment>
        )
    }
}

export default FretboardSvg;
