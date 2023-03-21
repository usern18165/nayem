import styled from 'styled-components';
export const Container = styled('div')`
  display:grid;
  grid-template-columns: 13% 86%;

   @media (max-width: 1590px) {
   grid-template-columns: 16% 84%;
  }

  @media (max-width: 1440px) {
   grid-template-columns: 19% 81%;
  }
`;


export const Left = styled('div')`
  // width: 230px;
  // top: 0;
  // left: 0;
`;

export const Sidebar = styled('div')`
     width: 230px;
     border-right: 1px solid #bbb;
     position: fixed;
      height: 100vh;

`


export const Body = styled('div')`
  // flex: 1 1 auto;
  // margin-left: 230px;
    position: relative;
`;


export const Nav = styled('div')`
  a {
    text-align: center;
    border-top: 1px solid #dedede;
    display: block;
    padding: 8px;
    color: #000;
    font-weight: 700;
    text-decoration: none;
    &.active {
      background-color: #ebebeb;
    }
  }
`;


export const Profile = styled('div')`
  padding: 0px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 15px;
  }
  img {
    display: block;
    width: 65px;
    height: 65px;
    margin: 10px auto 2px;
    border-radius: 6%;
  }
  p {
    color: #333;
  }
`;
