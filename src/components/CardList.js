import React from "react";
import { getApartments } from "./getApartments";
import styled from "styled-components";

const CardWrap = styled.div``;

const H1 = styled.h1`
  display: none;
`;

const CardTitle = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  margin: 3rem 0 0.5rem 1rem;
`;

const Card = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 3.5fr 0.5fr;
  grid-gap: 2rem;
  column-gap: 2rem;
  margin: 1rem;
  width: 90%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Title = styled.span`
  font-family: Roboto;
  font-size: 14px;
  color: grey;
  padding: 0.5rem;
`;

const Text = styled.span`
  font-family: Roboto;
  font-size: 16px;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
`;

const BuyerWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Buyer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeadlineWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Text1 = styled(Text)`
  display: flex;
  flex-direction: row;
`;

const StatusGreen = styled.span`
  width: 20px;
  height: 20px;
  background-color: #b8de91;
  border-radius: 24px;
  display: block;
  margin-right: 0.5rem;
`;

const StatusYellow = styled.span`
  width: 20px;
  height: 20px;
  background-color: #fbd277;
  border-radius: 24px;
  display: block;
  margin-right: 0.5rem;
`;

const StatusRed = styled.span`
  width: 20px;
  height: 20px;
  background-color: #fb9683;
  border-radius: 24px;
  display: block;
  margin-right: 0.5rem;
`;

function CardList(props) {
  return (
    <div>
      <H1>Apartments</H1>
      {getApartments()
        .filter((apartment) => {
          if (props.layoutType === null) {
            return true;
          }
          return apartment.layoutType === props.layoutType;
        })
        .map((apartment) => {
          return (
            <CardWrap key={apartment.id}>
              <CardTitle>{apartment.name}</CardTitle>
              <Card>
                <Column>
                  <Title>Floor</Title>
                  <Text>{apartment.floor}</Text>
                  <Title>Unit type</Title>
                  <Text>{apartment.type}</Text>
                  <Title>Type</Title>
                  <Text>{apartment.layoutType}</Text>
                </Column>

                <Column>
                  <BuyerWrap>
                    {apartment.buyers.map((buyer, index) => {
                      return (
                        <Buyer key={buyer.id}>
                          <Title>Buyer {index + 1}</Title>
                          <Text>{buyer.displayName} </Text>
                          <Text>{buyer.phoneNumber}</Text>
                          <Text>{buyer.email}</Text>
                        </Buyer>
                      );
                    })}
                  </BuyerWrap>
                </Column>

                <Column>
                  <Title>Last login</Title>
                  <Text>
                    {
                      [...apartment.buyers].sort((a, b) => {
                        return new Date(a.lastVisitDate).getTime() >
                          new Date(b.lastVisitDate).getTime()
                          ? 1
                          : 1;
                      })[0].displayName
                    }
                  </Text>
                  <Text>
                    {new Intl.DateTimeFormat("no-NO").format(
                      new Date(
                        [...apartment.buyers].sort((a, b) => {
                          return new Date(a.lastVisitDate).getTime() >
                            new Date(b.lastVisitDate).getTime()
                            ? 1
                            : 1;
                        })[0].lastVisitDate
                      )
                    )}
                  </Text>
                </Column>
                <Column>
                  <Title>Deadlines</Title>
                  {apartment.deadlines.map((deadline) => {
                    return (
                      <DeadlineWrap key={deadline.name}>
                        <Text1>
                          {deadline.name + " "}(
                          {new Intl.DateTimeFormat("no-NO").format(
                            new Date(deadline.date)
                          )}
                          ):
                        </Text1>

                        <Text1>
                          {deadline.status === "Sent" && (
                            <StatusGreen></StatusGreen>
                          )}
                          {deadline.status === "In progress" && (
                            <StatusYellow></StatusYellow>
                          )}
                          {deadline.status === "Not sent" && (
                            <StatusRed></StatusRed>
                          )}
                          {deadline.status}
                        </Text1>
                      </DeadlineWrap>
                    );
                  })}
                </Column>
              </Card>
            </CardWrap>
          );
        })}
    </div>
  );
}

export default CardList;
