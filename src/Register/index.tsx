import React, { useState, useEffect } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../components/Forms/Input";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { InputForm } from "../components/Forms/InputForm";
import { Button } from "../components/Forms/Button";
import { TransactionTypeButton } from "../components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "../components/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionType,
} from "./styles";
import { useAuth } from "../Hooks/Auth";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe valor numerico")
    .positive("O valor apenas positivo")
    .required("Valor obrigatorio"),
});

export function Register() {
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { user } = useAuth();

  const [transactionType, setTransactionType] = useState("");

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  function handleTransactionType(type: "positivy" | "negativy") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo da Transaçao");
    if (category.key === "category")
      return Alert.alert("Selecione a Categoria");

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };
    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const curretData = data ? JSON.parse(data) : [];
      const dataFormatted = [...curretData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });
      navigation.navigate("Listagem");
    } catch (error) {
      console.error();
      Alert.alert("Nao fo possivel salvar");
    }
  }
  // rodar pra resetar
  // useEffect(()=> {
  //     const dataKey = '@gofinances:transactions'
  //     // async function loadData() {
  //     //     const data  =  await AsyncStorage.getItem(dataKey);
  //     //     console.log(JSON.parse(data!));

  //     // }
  //     // loadData()

  //     async function removeAll() {
  //         await AsyncStorage.removeItem(dataKey);
  //     }
  //     removeAll()

  // },[])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            ></InputForm>

            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            ></InputForm>
            <TransactionType>
              <TransactionTypeButton
                title={"Income"}
                type={"up"}
                onPress={() => handleTransactionType("positivy")}
                isActive={transactionType === "positivy"}
              ></TransactionTypeButton>

              <TransactionTypeButton
                title={"Outcome"}
                type={"down"}
                onPress={() => handleTransactionType("negativy")}
                isActive={transactionType === "negativy"}
              ></TransactionTypeButton>
            </TransactionType>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            ></CategorySelectButton>
          </Fields>
          <Button
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          ></Button>
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          ></CategorySelect>
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
