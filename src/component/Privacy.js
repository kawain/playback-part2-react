import React, { Component } from 'react'

class Privacy extends Component {
    componentDidMount() {
        document.title = "プライバシーポリシー | ギター練習サイト コードトーン";
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div class="container">
                <div class="jumbotron sub-jumbotron">
                    <h1 class="text-white">プライバシーポリシー</h1>
                </div>

                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">プライバシーポリシー</li>
                    </ol>
                </nav>

                <div class="line px-4">
                    <p>
                        本プライバシーポリシーは、コードトーン.xyz（https://chordtone.xyz/）（以下、「当サイト」とします。)の各種サービス（当サイトによる情報提供、各種お問合せの受付等）において、当サイトの訪問者（以下、「訪問者」とします。）の個人情報もしくはそれに準ずる情報を取り扱う際に、当サイトが遵守する方針を示したものです。
        </p>

                    <h3>1．基本方針</h3>

                    <p>
                        当サイトは、個人情報の重要性を認識し、個人情報を保護することが社会的責務であると考え、個人情報に関する法令を遵守し、当サイトで取扱う個人情報の取得、利用、管理を適正に行います。当サイトで収集した情報は、利用目的の範囲内で適切に取り扱います。
        </p>

                    <h3>2．適用範囲</h3>

                    <p>
                        本プライバシーポリシーは、当サイトにおいてのみ適用されます。
        </p>

                    <h3>3．個人情報の取得と利用目的</h3>

                    <p>
                        当サイトで取得する訪問者の個人情報と利用目的は下記の通りです。
        </p>

                    <h4>3-1．コメントを残した際に個人情報を取得します</h4>

                    <p>
                        当サイトでは、訪問者が当サイトにコメントを残した際に、以下の個人情報を取得します。
        </p>

                    <ul>
                        <li>コメントフォームに表示されている名前（HN）</li>
                        <li>コメントフォームに表示されているメールアドレス</li>
                        <li>コメントフォームに表示されているコメント内容</li>
                        <li>IPアドレス</li>
                        <li>ブラウザユーザーエージェント文字列</li>
                    </ul>

                    <h4>3-1-1．利用目的について</h4>

                    <p>
                        荒し対策やスパム検出に役立てるためと、訪問者の利便性のためです。
                        また、当サイト内で「訪問者からこのようなコメントがありました」と紹介させていただく場合もあります。
                        コメントが当サイトの管理人に承認されると一般公開されます。
        </p>

                    <h4>3-2．Cookieによる個人情報の取得</h4>
                    <p>
                        当サイトは、訪問者のコンピュータにCookieを送信することがあります。
                        Cookie（クッキー）とは、ウェブサイトを利用したときに、ブラウザとサーバーとの間で送受信した利用履歴や入力内容などを、訪問者のコンピュータにファイルとして保存しておく仕組みです。
        </p>

                    <h4>3-2-1．利用目的について</h4>

                    <p>
                        訪問者の当サイト閲覧時の利便性を高めるためです。
                        たとえば、次回同じページにアクセスするとCookieの情報を使って、ページの運営者は訪問者ごとに表示を変えることができます。
                        訪問者がブラウザの設定でCookieの送受信を許可している場合、ウェブサイトは、訪問者のブラウザからCookieキーを取得できます。
                        なお、訪問者のブラウザはプライバシー保護のため、そのウェブサイトのサーバーが送受信したCookieのみを送信します。
        </p>

                    <h4>3-2-2．第三者によるCookie情報の取得について</h4>

                    <p>
                        当サイトでは、グーグル株式会社やヤフー株式会社などをはじめとする第三者から配信される広告が掲載される場合があり、これに関連して当該第三者が訪問者のCookie情報等を取得して、利用している場合があります。
                        当該第三者によって取得されたCookie情報等は、当該第三者のプライバシーポリシーに従って取り扱われます。
        </p>

                    <h4>3-2-3．Cookie情報の送受信の許可・拒否について</h4>

                    <p>
                        訪問者は、Cookieの送受信に関する設定を「すべてのCookieを許可する」、「すべてのCookieを拒否する」、「Cookieを受信したらユーザーに通知する」などから選択できます。設定方法は、ブラウザにより異なります。Cookieに関する設定方法は、お使いのブラウザの「ヘルプ」メニューでご確認ください。
                        すべてのCookieを拒否する設定を選択されますと、認証が必要なサービスを受けられなくなる等、インターネット上の各種サービスの利用上、制約を受ける場合がありますのでご注意ください。
        </p>

                    <h4>3-3．ローカルストレージ(localStorage)について</h4>

                    <p>
                        当サイトは、Cookieに似たローカルストレージ(localStorage)というものを利用しています。
                        ローカルストレージ(localStorage)とはWebブラウザにデータを保存する仕組みです。
                        HTML5になってできたWebStorageというローカル環境であるWebブラウザ側でデータを保存する仕組みの中の１つです。
                        ページを閉じても保存したデータは保持されますが、ブラウザの設定でローカルストレージがOFFになっていると使えません。
        </p>

                    <h3>4．個人情報の管理</h3>

                    <p>
                        当サイトは、訪問者からご提供いただいた情報の管理について、以下を徹底します。
        </p>

                    <h4>4-1. 情報の正確性の確保</h4>

                    <p>
                        訪問者からご提供いただいた情報については、常に正確かつ最新の情報となるよう努めます。
        </p>

                    <h4>4-2. 安全管理措置</h4>

                    <p>
                        当サイトは、個人情報の漏えいや滅失又は棄損を防止するために、適切なセキリュティ対策を実施して個人情報を保護します。
        </p>

                    <h4>4-3. 個人情報の廃棄</h4>

                    <p>
                        個人情報が不要となった場合には、すみやかに廃棄します。
        </p>

                    <h3>5．個人情報の第三者への提供について</h3>

                    <p>
                        当サイトは、訪問者からご提供いただいた個人情報を、訪問者本人の同意を得ることなく第三者に提供することはありません。また、今後第三者提供を行うことになった場合には、提供する情報と提供目的などを提示し、訪問者から同意を得た場合のみ第三者提供を行います。
        </p>

                    <h3>6．アクセス解析ツールについて</h3>

                    <p>
                        当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
                        このGoogleアナリティクスはアクセス情報の収集のためにCookieを使用しています。このアクセス情報は匿名で収集されており、個人を特定するものではありません。
                        この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
        </p>

                    <h3>7．プライバシーポリシーの変更について</h3>

                    <p>
                        当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本プライバシーポリシーの内容を適宜見直しその改善に努めます。
                        修正された最新のプライバシーポリシーは常に本ページにて開示されます。
        </p>
                    <p class="text-right">
                        令和1年11月11日　策定 <br />
                        以上
        </p>
                </div>
            </div>)
    }
}

export default Privacy;