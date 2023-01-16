import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
//redux
import { useDispatch } from 'react-redux';
import { open } from '../store/modules/reduxModal';

const ItemBlock = styled.div`
    width: 25%;
    padding: 0 10px 0;
    margin-bottom: 20px;
    box-sizing: border-box;
    cursor: pointer;
    .videoWrap {
        position: relative;
        width: 100%;
        padding-bottom: 75%;
        background-color: #272727;
    }
`

const YoutubeItem = (props) => {
    const {
        data,
    } = props;
    const dispatch = useDispatch();

    const openModal = () => {
        let videoid = data.id.videoId;

        dispatch(
            open({
                id: videoid
            })
        )
    }

    return (
        <ItemBlock onClick={openModal}>
            <div className='videoWrap'>
                {
                    data.snippet.thumbnails.high.url &&
                    <Image src={data.snippet.thumbnails.high.url} alt={data.snippet.channelTitle} fill sizes={"100%"}/>
                }
            </div>
        </ItemBlock>
    );
};

export default YoutubeItem;