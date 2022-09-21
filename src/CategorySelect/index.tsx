import React from "react";
import { FlatList } from "react-native";

import { Button } from "../components/Forms/Button";

import { 
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separetor,
    Footer,

} from "./styles";
import {categories} from "../utils/categories"
interface Category {
    key: string;
    name: string;
}

export interface Props {
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

export function  CategorySelect({
    category,
    setCategory,
    closeSelectCategory,
}: Props) {
    function handleCategorySelect (category: Category){
        setCategory(category)
    }
    return(
            <Container>
                <Header>
                <Title>Categoria</Title>
                </Header>

                <FlatList 
                data={categories}
                style={{flex: 1, width: '100%'}}
                keyExtractor={(item) => item.key}
                renderItem={({item}) => (
                    <Category
                    onPress={() => handleCategorySelect(item)}
                    isActive={category.key === item.key}
                    >
                        <Icon name={item.icon}></Icon>
                        <Name>{item.name}</Name>
                    </Category>
                
                )}
                ItemSeparatorComponent={()=> <Separetor></Separetor>}
                ></FlatList>

                <Footer>
                    <Button title="Selecionar"
                    onPress={closeSelectCategory}
                    >
                        
                    </Button>
                </Footer>
            </Container>
    );
}