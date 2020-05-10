import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Footer from './Footer';
import VisibleTodoList from './containers/VisibleTodoList';

const Content = styled.section`
  grid-template-rows: auto auto;
  align-content: space-between;
  display: grid;
  height: 100%;
`;

const List = styled.div`
  overflow-y: scroll;
`;

// eslint-disable-next-line
const renderLabel = (onClick) => <label onClick={onClick} />;

const MainSection = ({ todosCount, completedCount, actions }) => (
  <Content>
    <List>
      <VisibleTodoList />
    </List>
    {
      !!todosCount && (
        <Footer
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
          onClearCompleted={actions.clearCompleted}
        />
      )
    }
  </Content>
);

MainSection.propTypes = {
  todosCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  actions: PropTypes.shape.isRequired,
};

export default MainSection;
