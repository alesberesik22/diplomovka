import React from 'react';
import styled from 'styled-components'
import { MdClose } from 'react-icons/md';
import LightControll from './LightControll';
import { useRef, useEffect, useCallback } from 'react';

export const Modal = ({showModal,setShowModal}) => {

    const modalRef = useRef();

    const closeModal = e => {
        if (modalRef.current === e.target) {
          setShowModal(false);
        }
      };

      const keyPress = useCallback(
        e => {
          if (e.key === 'Escape' && showModal) {
            setShowModal(false);
            console.log('I pressed');
          }
        },
        [setShowModal, showModal]
      );

      useEffect(
        () => {
          document.addEventListener('keydown', keyPress);
          return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
      );

    const Background = styled.div`
  width: 100%;
  height: 100%;
  margin-left: -670px;
  margin-top: -300px;
//   background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 360px;
  height: 250px;
  margin-left: -50px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

    return(
        <div>
            {showModal ? (
                <Background onClick={closeModal} ref={modalRef}>
                    <ModalWrapper showModal={showModal}>
                        <LightControll/>
                        <CloseModalButton aria-label='Close modal' onClick={() => setShowModal(prev => !prev)}></CloseModalButton>
                    </ModalWrapper>
                </Background>
            ):null}
        </div>
    );
}