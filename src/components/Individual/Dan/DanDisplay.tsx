import React from 'react';

import 'antd/dist/antd.css';
import { Button, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

type AcceptedProps = {
    question: string | undefined,
    answer: string | undefined,
    ansDisplay: boolean,
    toggleAnsDisplay: () => void
}

const DanDisplay = (props: AcceptedProps) => {

    const openNotification = () => {
        notification.info({
            message: 'The answer is...',
            icon: <SmileOutlined style={{ color: 'black' }} />,
            description: props.answer,
            placement: 'topLeft',
            duration: 5,
            top: 50,
            style: {
                width: '50vw',
                margin: 20,
                padding: 10,
                backgroundColor: 'lightblue',
                border: 'thin solid black',
                borderRadius: '15px',
                opacity: '.9'
            }
        });
    };

    return (
        <div style={{ backgroundColor: 'white', color: 'black', textAlign: 'center' }}>
            <h3>{props.question}</h3>
            <hr />
            <Button type='primary' onClick={e => openNotification()}>click to show answer!</Button>
        </div>
    )
}

export default DanDisplay;