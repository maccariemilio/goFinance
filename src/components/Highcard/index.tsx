import React from "react";

import { 
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransition,
} from "./style";

interface  Props {
    title: string;
    amount: string;
    lastTransition: string;
    type: 'up'| 'down' | 'total'

}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
}

export function HighCard({type,title,amount,lastTransition} : Props){
    return(
        <Container type={type}>
            <Header>
                <Title type={type}>{title}</Title>
                <Icon name={icon[type]} type={type}></Icon>
            </Header>

            <Footer>
                <Amount type={type}>{amount}</Amount>
                <LastTransition type={type}>{lastTransition}</LastTransition>
            </Footer>
        </Container>
    )
} 