import React from 'react';
import styled from 'styled-components';
import Page from '../../components/Layout/Page';
import Header from '../../components/Todos/containers/Header';
import MainSection from '../../components/Todos/containers/MainSection';

const TodosContent = styled.div`
  grid-template-rows: auto minmax(400px, 100%);
  box-shadow: 0px 0px 3px 1px #f5f5f5;
  border-radius: 10px;
  background: white;
  overflow: hidden;
  display: grid;
  width: 500px;
`;

const TodosPage = () => (
  <Page currentPage="todos" loading={false}>
    <TodosContent>
      <Header />
      <MainSection />
    </TodosContent>
  </Page>
);

export default TodosPage;
