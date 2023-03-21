import styled from 'styled-components';

export const InputContainer = styled('div')
`
padding: 20px;
input  {
    width:48%;
    margin: 5px;
    border: none;
    box-shadow: none;
    border: 1px solid lightgray;
    border-radius: 2px;
    height: 30px;
}

input[type="text"] {
    padding-left: 10px;
}

div {
    text-align : center;
    margin-top : 10px;
    button {
        border: none;
        box-shadow: none;
        background: #0048ba;
        color: white;
        padding: 4px 6px;
        border-radius: 3px;

    }
}

.error {
    color: red;
    text-align: center;
    margin-bottom: 10px;
}

`