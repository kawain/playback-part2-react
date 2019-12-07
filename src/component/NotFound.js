import React from 'react'

function NotFound() {
    return (
        <div className="container">
            <div class="jumbotron sub-jumbotron">
                <h1 class="display-4 text-white"><span role="img" aria-label="Cross Mark">❌</span> Not Found</h1>
            </div>

            <h3>This page may not be found or has been moved. Please see from the top page.</h3>
            <h4 className="my-5"><a href="https://chordtone.xyz/">https://chordtone.xyz/</a></h4>
        </div>
    )
}

export default NotFound;
