import React from 'react';

import './Admin.css';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

type AdminDisplayProps = {
    allMemes: any[],
    sessionToken: string | null,
    getAllMemes: () => void
}

const AdminMemesDisplay = ({ allMemes, sessionToken, getAllMemes }: AdminDisplayProps) => {

    const checkSessionToken = (token: string | null): string => {
        if (token === null) {
            return 'no token'
        } else {
            return token
        }
    }

    const displayAllMemes = (memes: any[]) => {
        memes.sort((a: any, b: any) => (a.createdAt > b.createdAt) ? -1 : ((a.createdAt < b.createdAt) ? 1 : 0));

        return memes.map((meme: any, index: number) => {
            return (
                <Card key={index} className='card'>
                    <CardActionArea>
                        <CardMedia className='image' image={meme.url} />
                        <CardContent>
                            <Typography variant="body1">{meme.caption}</Typography>
                            <Typography variant="body2"><i>posted by {meme.username}</i></Typography>
                            <Typography variant='body2'>Votes: {meme.voteCount}</Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className='deleteContainer'>
                        <DeleteForeverIcon color='error' fontSize='large' onClick={() => deleteMeme(meme.id)} />
                    </CardActions>
                </Card>
            )
        })
    }

    const deleteMeme = (memeId: string) => {
        fetch(`https://team6-red-badge-meme-server.herokuapp.com/mymemes/delete/${memeId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': checkSessionToken(sessionToken)
            })
        })
            .then(res => getAllMemes())
    }

    return (
        <div className='display'>
            {displayAllMemes(allMemes)}
        </div>
    )
}

export default AdminMemesDisplay;