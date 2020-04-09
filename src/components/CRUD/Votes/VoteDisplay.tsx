import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const useStyles = makeStyles({
    vote: {
        textAlign: 'center',
        flexDirection: 'column'
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


                <span>
                    <form onSubmit={(event) => voteOnMeme(event, memeId, 1)}>
                        <Button type='submit' className={classes.button} onClick={event => changeVote(1)}>
                            <ThumbUpIcon color="error" fontSize="default" />
                        </Button>
                    </form>
                </span>
                <Typography variant="subtitle1">Votes: {voteCount}</Typography>
                <span>
                    <form onSubmit={(event) => voteOnMeme(event, memeId, -1)}>
                        <Button type='submit' className={classes.button} onClick={event => changeVote(-1)}>
                            <ThumbDownIcon color="error" fontSize="default" />
                        </Button>
                    </form>
                </span>
            </CardActions>
        </div>
    )
}
export default VoteDisplay;