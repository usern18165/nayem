import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const AddButton = styled(Button)`
  font-size: 14px !important;
  text-transform: capitalize !important;
  padding: 2px 10px !important;
`;
export const Works = styled('div')`
  margin: 5px;
  & > h3 {
    font-size: 18px;
    color: black;
    text-align: center;
    border-bottom: 2px solid;
    margin: 0px;
    padding: 0px 0;
    width: 200px;
  }
`;
export const WorkItem = styled('div')`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #cacaca;
  .a {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid #b3b3b3;
    padding: 5px;
    margin: 5px 10px;
    & > * {
      width: 100%;
      height: 100%;
    }
  }
  .m {
    display:flex;
    margin: 0;
    width: max-content;
    padding: 10px;
    h3 {
      font-size: 17px;
      color: black;
      padding-right:10px;
    }
    .d::before{
      content:"("
    }
    .d::after{
      content:")"
    }
    .da::before{
      content:"("
    }
    .da::after{
      content:")"
    }
    .da{
      font-size: 13px;
      color: grey;
      margin-top: 4px;
    }
    h4 {
      font-size: 17px;
      color: grey;
      margin:  0;
      padding-right:10px;
    }
    .d {
      font-size: 13px;
      color: grey;
      margin-top: 2px;
    }
    p {
      font-size: 15px;
      color: gray;
      margin: 5px 0;
    }
  }
  button {
    svg {
      font-size: 17px;
    }
  }
`;
export const WorkForm = styled('form')`

  padding: 2px;
  border-bottom: 1px solid #bebebe;
  & > div {
    display: flex;
    margin: 10px 0;
    align-items: center;
  }
  .e,
  .p,
  .ds {
   
    & > div {
      min-width: 50%;
    }
  }
  .d {
    & > div {
      margin: 0 10px;
    }
  }
  .b {
    span {
      button {
        margin: 5px;
        height: 33px;
      }
    }
  }
`;
