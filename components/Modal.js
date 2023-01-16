import React, {useState, useEffect} from 'react';
import { createPortal } from 'react-dom';
import styled, {keyframes} from 'styled-components';
import ReactPlayer from 'react-player/youtube'
//redux
import { useSelector, useDispatch } from 'react-redux';
import { close } from '../store/modules/reduxModal';

//animation
const fadeOverlay = (active) => keyframes`
    0% {
        opacity: ${active ? '0' : '1'};
        ${active ? `transform: translate(100%, 100%) scale(0)` : `transform: translate(0, 0) scale(1)`};
    }
    100% {
        opacity: ${active ? '1' : '0'};
        ${active ? `transform: translate(0, 0) scale(1)` : `transform: translate(100%, 100%) scale(0)`};
    }
`

const fadeContents = (active) => keyframes`
    0% {
        opacity: ${active ? '0' : '1'};
    }
    100% {
        opacity: ${active ? '1' : '0'};
    }
`

const ModalBlock = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100vw;
    height: 100vh;
`

const OverlayBlock = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    opacity: 0;
    transform: translate(0,0) scale(0);
    background-color: rgba(0,0,0,0.7);
    animation-name: ${props => fadeOverlay(props.active)};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
    cursor: pointer;
`

const ContentsBlock = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%,-50%);
    width: 50%;
    opacity: 0;
    animation-name: ${props => fadeContents(props.active)};
    animation-duration: 0.25s;
    animation-fill-mode: forwards;
    animation-delay: ${props => props.active ? '0.1s' : '0'};
    .contentsBox {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%;
        background-color: black;
        .videoWrap {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            .videoBox {
                position: relative;
                width: 100%;
                height: 100%;
            }
        }
    }
`

const Modal = (props) => {
    const {
        children,
    } = props;
    //redux
    const dispatch = useDispatch();
    const modalData = useSelector(state => state.reduxModal);
    //state
    const [element, setElement] = useState(null)
    const [modalActive, setModalActive] = useState(false);

    const modalClose = () => {
        setModalActive(false);
    }

    useEffect(() => {
        if (document) {
            setElement(document.getElementById('modal-root'))
        }
    }, [])

    useEffect(() => {
        if(modalData.active)
        {
            setModalActive(true);
        }
    }, [modalData.active]);

    useEffect(() => {
        if(!modalActive)
        {
            const timer = setTimeout(() => {
                dispatch(close());
            }, 250);

            return () => {
                clearTimeout(timer);
            }
        }
    }, [modalActive]);

    return (
        <>
            {
                element &&
                createPortal(
                    <>
                    {
                        modalData.active &&
                        <ModalBlock>
                            <OverlayBlock
                                active={modalActive}
                                onClick={modalClose}
                            />
                            <ContentsBlock
                                active={modalActive}
                            >
                                <div className='contentsBox'>
                                    <div className='videoWrap'>
                                        <div className='videoBox'>
                                            <ReactPlayer
                                                width='100%'
                                                height='100%'
                                                url={`https://www.youtube.com/watch?v=${modalData.id}`}
                                                controls={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </ContentsBlock>
                        </ModalBlock>
                    }
                    </>
                    , element
                )
            }
        </>
    );
};

export default Modal;