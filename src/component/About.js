import React, { Component } from 'react'

class About extends Component {
    componentDidMount() {
        document.title = "このサイトについて | ギター練習サイト コードトーン";
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron sub-jumbotron">
                    <h1 className="text-white">このサイトについて</h1>
                </div>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">このサイトについて</li>
                    </ol>
                </nav>

                <div className="line px-4">

                    <h3 className="my-4">はじめに</h3>

                    <p>
                        このサイトは、ギターは好きだけれど、腕は下手くそな管理人が趣味で作った個人サイトです。<br />
                        無料で、手軽に、面倒でなく、ログインしなくてもよく、簡単にギターの練習ができるサイトを目指しています。<br />
                        素晴らしいアプリやソフトがあるのは知っていますが(例えば iReal Pro)、手軽に、無料でとなると数は少ないと思います。
                    </p>

                    <p className="my-4">
                        音楽のジャンルに関しては、演歌を含めた歌謡曲の弾き語りやロックやクラッシック、ジャズまで何でも興味があります。<br />
                        学生時代は、バンドでベースを担当。一人で弾くときはギターという感じでした。<br />
                        ギターは「禁じられた遊び」が弾きたいから始めたタイプです。
                    </p>

                    <p className="my-4">
                        「コード進行　著作権」で検索するとわかりますが、
                        コード進行だけでは著作権はないようですので、
                        これからいろいろなコード進行を掲載していきたいと思います。<br />
                        それでは、ギター上達に向けてがんばりましょう！
                     </p>
                </div>
            </div>
        )
    }
}

export default About;