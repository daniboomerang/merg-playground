import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Typography } from 'antd';
import Page from '../../components/Layout/Page';

const HomeContent = styled.div`
  text-align: center;
`;

const Cards = styled.div`
  grid-template-columns: auto;
  justify-content: center;
  display: grid;
`;

const { Paragraph, Title } = Typography;

const HomePage = () => (
  <Page currentPage="home">
    <HomeContent>
      <Title>Merg Playground</Title>
      <Paragraph>
        A Mongo, Express, GraphQL & React stack.
        Playground with demo apps using different React libraries.
      </Paragraph>
      <Cards>
        <Link to="/notes">
          <Card hoverable title="Notes" style={{ width: 300 }}>
            <Paragraph strong>
              Notes demo with CRUD actions using Apollo GraphQL server API and mongoDB.
            </Paragraph>
          </Card>
        </Link>
      </Cards>
    </HomeContent>
  </Page>
);

export default HomePage;
