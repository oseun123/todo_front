import styled from "styled-components";
// import { CheckDouble } from '@styled-icons/boxicons-regular/CheckDouble';

// export const Tick = styled(CheckDouble)`
//   width: 30px;
//   color: #06A82A;
//   margin-right: -10px;
// `;

export const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  form {
    margin-top: -100px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    width: 500px;
    padding: 30px;
    z-index: 20;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;
