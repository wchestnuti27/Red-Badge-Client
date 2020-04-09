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
    voteCount: number
}

const VoteDisplay = ({ voteCount }: AcceptedProps) => {
    const classes = useStyles();

    return (
        <div>
            <CardActions className={classes.vote}>
                <Typography variant="subtitle1">Votes: {voteCount}</Typography>
                <span>
                    <Button className={classes.button}>
                        <ThumbUpIcon color="error" fontSize="default" />
                    </Button>
                    <Button className={classes.button}>
                        <ThumbDownIcon color="error" fontSize="default" />
                    </Button>
                </span>
            </CardActions>
        </div>
    )
}
export default VoteDisplay;