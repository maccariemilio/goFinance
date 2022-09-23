import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import { HighCard } from "../components/Highcard";
import { TransationCard, TransactionProps } from "../components/TransationCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import {
  Container,
  UserGreetings,
  Header,
  UserName,
  Photo,
  User,
  UserInfo,
  UserWrapper,
  Icons,
  CardScrl,
  Transation,
  Title,
  TransationList,
  LoadContainer,
  LogOutButon,
} from "./style";
import { useAuth } from "../Hooks/Auth";

export interface DataListProps extends TransactionProps {
  id: string;
}

interface HighCardProps {
  amount: string;
  lastTransactions: string;
}

interface HighCardData {
  entries: HighCardProps;
  expensives: HighCardProps;
  total: HighCardProps;
}

export function Page(
  collection: DataListProps[],
  type: "positivy" | "negativy"
) {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highCardData, setHighCardData] = useState<HighCardData>(
    {} as HighCardData
  );

  const { signOut, user } = useAuth();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positivy" | "negativy"
  ) {
    const collectionFilttered = collection.filter(
      (transaction) => transaction.type === type
    );

    if (collectionFilttered.length === 0) return 0;

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collectionFilttered.map((transaction) =>
          new Date(transaction.date).getTime()
        )
      )
    );
    return ` ${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  }

  async function loadTransactions() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positivy") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date: item.date
            ? Intl.DateTimeFormat("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              }).format(new Date(item.date))
            : "Sem data",
        };
      }
    );

    setTransactions(transactionsFormatted);

    const lastTransactionsEntries = getLastTransactionDate(
      transactions,
      "positivy"
    );
    const lastTransactionsExpensive = getLastTransactionDate(
      transactions,
      "negativy"
    );
    const totalInterval =
      lastTransactionsExpensive === 0
        ? `Nao ha Transaçoes`
        : `01 ate ${lastTransactionsExpensive}`;

    const total = entriesTotal - expensiveTotal;

    setHighCardData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactions:
          lastTransactionsEntries === 0
            ? `Sem Transaçoes`
            : `Ultima entrada${lastTransactionsEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactions:
          lastTransactionsExpensive === 0
            ? `Sem Saidas`
            : `Ultima saida${lastTransactionsExpensive}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactions: totalInterval,
      },
    });
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  // console.log(transactions)

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color="red" size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{ uri: user.photo }}></Photo>
                <User>
                  <UserGreetings>Ola</UserGreetings>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <LogOutButon onPress={signOut}>
                <Icons name="power"></Icons>
              </LogOutButon>
            </UserWrapper>
          </Header>

          <CardScrl>
            <HighCard
              type="up"
              title="Entrada"
              amount={highCardData.entries.amount}
              lastTransition={highCardData.entries.lastTransactions}
            ></HighCard>
            <HighCard
              type="down"
              title="Saidas"
              amount={highCardData.expensives.amount}
              lastTransition={highCardData.expensives.lastTransactions}
            ></HighCard>
            <HighCard
              type="total"
              title="Total"
              amount={highCardData.total.amount}
              lastTransition={highCardData.total.lastTransactions}
            ></HighCard>
          </CardScrl>

          <Transation>
            <Title>Listagem</Title>

            <TransationList
              data={transactions}
              keyExtractor={(item: { id: any }) => item.id}
              renderItem={({ item }) => <TransationCard data={item} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 15,
              }}
            ></TransationList>
          </Transation>

          <StatusBar style="auto" />
        </>
      )}
    </Container>
  );
}
