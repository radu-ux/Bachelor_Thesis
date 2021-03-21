import styled from "styled-components";

export const ChartTitle = styled.h1`
    font-size: 1.8em;
    font-weight: bold;
`
export const ChartInfo = styled.div`
    display: grid;
    padding-left: 5em;
    pedding-bottom: 10em;
`

export const ChartDescription = styled.div`
    font-size: 1.2em;
    width: 50%;
`

export const Emphasise = styled.span`
    color: rgb(202, 96, 79);
    font-weight: bold;
`

export const Redirection = styled.a`
    color: rgb(202, 96, 79);
    font-weight: bold;
    &:hover {
        text-decoration: none;
        color: rgb(202, 96, 79);
        opacity: 0.7;
    }
`

export const HorizontalLine = styled.hr`
    color: wheat;
    width: 100%;
    margin-top: 1em;
`

export const ReplayButton = styled.button`
    width: 10%;
    border: 1px solid black;
    font-size: 1em;
    margin-top: 1em;
    margin-bottom: 0.5em;
    &:hover {
        background-color: rgb(232,232,232);
    }
`

export const ExploreMore = styled.div`
    background-color: rgb(248,248,248);
    width: 100%;
`

export const ExploreMoreTitle = styled.p`
    padding-left: 4em;
    font-size: 20px;
    color: rgb(53, 62, 88);
    &:after {
        content: "";
        display: block;
        border-bottom: 1px solid rgb(53, 62, 88);
        width: 14em;
    }
`

export const Card = styled.a`
    transition: box-shadow .3s;
    margin-bottom: 2em;
    background-color: white;
    color: rgb(53, 62, 88);
    &:hover {
        text-decoration: none;
        box-shadow: 0 0 11px rgba(33,33,33,.2); 
        color: black;
    }
`

export const CardImgPlaceholder = styled.div`
    max-width: 100%;
    max-height: 100%;
`

export const CardText = styled.div`
    text-align: center;
`
