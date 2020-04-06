import React from 'react';

let style = {
    height: '200px',
    width: 'auto',
    borderRadius: '3%'
}

const FeedDisplay = (props) => {

    const displayMemes = (memes) => {
        console.log('DISPLAY', memes);

        memes.forEach(meme => {
            console.log(meme.caption, meme.voteCount)
        })

        // for (let i = 0; i < memes.length; i++) {
        //     return (
        //         <div>
        //             <h4>{memes[i].caption}</h4>
        //             <img style={style} src={props.url + memes[i].url} alt="meme" />
        //             <h4>Votes: {memes[i].voteCount}</h4>
        //         </div>
        //     )
        // }
    }

    return(
        <div>
            {displayMemes(props.memes)}
        </div>
    )
}

export default FeedDisplay;