import React from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter, Button
} from 'reactstrap';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    imageModal: {
        maxWidth: '80%',
        maxHeight: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 0,
        paddingRight: 0
    },
    memeImage: {
        maxWidth: '100%',
        maxHeight: '100%'
    }
});

type ImageModalProps = {
    memeUrl: string,
    memeCaption: string,
    memeUsername: string,
    memeComments: any[],
    closeImageModal: () => void
}

const ImageModal = ({ memeUrl, memeCaption, memeUsername, memeComments, closeImageModal }: ImageModalProps) => {

    const classes = useStyles();
    console.log('YO', memeComments)

    const displayComments = (comments: any[]) => {
        comments.sort((a: any, b: any) => (a.createdAt < b.createdAt) ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0));

        return comments.map((individualComments: any, index: number) => {
            return (
                <div key={index}>
                    <p><i>{individualComments.posterUsername}: </i> {individualComments.comment}</p>
                </div>
            )
        })
    }

    return (
        < Modal isOpen={true} >
            <ModalHeader toggle={() => closeImageModal()}>
                {memeCaption !== '' ? memeCaption : `${memeUsername}'s meme`}
            </ModalHeader>
            <ModalBody className={classes.imageModal} style={{ padding: 10 }}>
                <img className={classes.memeImage} src={memeUrl} alt="big meme" />
            </ModalBody>
            <ModalFooter>
                <p><i>posted by: {memeUsername}</i></p>
            </ModalFooter>
            <ModalBody>
                <hr />
                {displayComments(memeComments)}
            </ModalBody>
        </Modal >
    )
}

export default ImageModal;