import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const useStyles = makeStyles({
    vote: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center'
    },
    button: {
        color: 'blue' // icon color will override this, also changes color of animation
    }
});

type AcceptedProps = {
    voteCount: number,
    memeId: string,
    changeVote: (vote: number) => void,
    voteOnMeme: (event: any, memeId: string, vote: number) => void
}

const VoteDisplay = ({ voteCount, memeId, changeVote, voteOnMeme }: AcceptedProps) => {
    const classes = useStyles();

    return (
        <div>
            <CardActions className={classes.vote}>

                <Typography variant="subtitle1">Votes: {voteCount}</Typography>

                <div style={{ marginLeft: 0 }}>

                    <form style={{ display: 'inline' }} onSubmit={(event) => voteOnMeme(event, memeId, 1)}>
                        <Button type='submit' className={classes.button} onClick={event => changeVote(1)}>
                            <ThumbUpIcon color="error" fontSize="default" />
                        </Button>
                    </form>
                    <form style={{ display: 'inline' }} onSubmit={(event) => voteOnMeme(event, memeId, -1)}>
                        <Button type='submit' className={classes.button} onClick={event => changeVote(-1)}>
                            <ThumbDownIcon color="error" fontSize="default" />
                        </Button>
                    </form>
                </div>
            </CardActions>
        </div>
    )
}
export default VoteDisplay;