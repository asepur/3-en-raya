import './loadingBar.css'

function LoadingBar(){

    return(
        <div className='loadingBar__box'>
            <div id="progressbar">
                <span id="loading"></span>
                <div id="load"></div>
            </div>
        </div>
        
    )
}

export default LoadingBar;