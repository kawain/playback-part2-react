import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Foot extends Component {
    render() {
        return (
            <footer>
                <div className="bg-primary text-white">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8">
                                <ul>
                                    <li><Link to='/about.html'>このサイトについて</Link></li>
                                    <li><Link to='/privacy.html'>プライバシーポリシー</Link></li>
                                    <li><Link to='/terms.html'>利用規約</Link></li>
                                    <li><a href="https://forms.gle/sggpogJnY1Pq6Fkh9" rel="noreferrer noopener" target="_blank">お問い合わせ</a></li>
                                </ul>
                            </div>
                            <div className="col-sm-4 text-center">
                                <img src="./img/logo.svg" alt="Guitar practice" />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Foot;
