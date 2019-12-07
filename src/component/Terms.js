import React, { Component } from 'react'

class Terms extends Component {
    componentDidMount() {
        document.title = "利用規約 | ギター練習サイト コードトーン";
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div class="container">
                <div class="jumbotron sub-jumbotron">
                    <h1 class="text-white">利用規約</h1>
                </div>

                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">利用規約</li>
                    </ol>
                </nav>

                <div class="line px-4">
                    <p>
                        この利用規約（以下、「本規約」といいます。）は、コードトーン.xyz（https://chordtone.xyz/）（以下、「当サイト」とします。）がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。
                        訪問者の皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
            </p>

                    <h3>禁止事項</h3>

                    <p>
                        ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
            </p>

                    <ol>
                        <li>法令または公序良俗に違反する行為</li>
                        <li>犯罪行為に関連する行為</li>
                        <li>本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為</li>
                        <li>当サイト、ほかのユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                        <li>本サービスによって得られた情報を商業的に利用する行為</li>
                        <li>当サイトのサービスの運営を妨害するおそれのある行為</li>
                        <li>不正アクセスをし、またはこれを試みる行為</li>
                        <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                        <li>不正な目的を持って本サービスを利用する行為</li>
                        <li>本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為</li>
                        <li>他のユーザーに成りすます行為</li>
                        <li>当サイトが許諾しない本サービス上での宣伝、広告、勧誘、または営業行為</li>
                        <li>面識のない異性との出会いを目的とした行為</li>
                        <li>当サイトのサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
                        <li>その他、当サイトが不適切と判断する行為</li>
                    </ol>

                    <h3>本サービスの提供の停止等</h3>

                    <p>
                        当サイトは、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
            </p>
                    <ul>
                        <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                        <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                        <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                        <li>その他、当サイトが本サービスの提供が困難と判断した場合</li>
                    </ul>
                    <p>
                        当サイトは、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
            </p>

                    <h3>保証の否認および免責事項</h3>

                    <p>
                        当サイトは、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
            </p>
                    <p>

                        当サイトは、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。ただし、本サービスに関する当サイトとユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
            </p>

                    <p>
                        当サイトは、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
            </p>

                    <h3>サービス内容の変更等</h3>

                    <p>
                        当サイトは、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。

            </p>

                    <h3>利用規約の変更</h3>

                    <p>
                        当サイトは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。

            </p>

                    <h3>個人情報の取扱い</h3>

                    <p>
                        当サイトは、本サービスの利用によって取得する個人情報については、当サイト「プライバシーポリシー」に従い適切に取り扱うものとします。

            </p>

                    <p>
                        本規約の解釈にあたっては、日本法を準拠法とします。<br />
                        本サービスに関して紛争が生じた場合には、当サイトの管理人所在地を管轄する裁判所を専属的合意管轄とします。
            </p>

                    <p class="text-right">以上</p>
                </div>
            </div>)
    }
}

export default Terms;