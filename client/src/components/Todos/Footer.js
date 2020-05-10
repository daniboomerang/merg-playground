import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FilterLink from './containers/FilterLink';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../constants/TodoFilters';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed',
};

const Content = styled.footer`
  grid-template-columns: 100px auto 150px;
  border-top: 1px solid #e6e6e6;
  align-items: center;
  text-align: center;  
  padding: 10px 15px;
  background: white;
  min-height: 60px;
  padding: 0 20px;
  font-size: 15px;
  display: grid;

  &::before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
                0 8px 0 -3px #f6f6f6,
                0 9px 1px -3px rgba(0, 0, 0, 0.2),
                0 16px 0 -6px #f6f6f6,
                0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
`;

const Count = styled.span`
  float: left;
  text-align: left;
`;

const Filters = styled.div`
  display: flex;
`;

const Footer = (props) => {
  const { activeCount, completedCount, onClearCompleted } = props;
  const itemWord = activeCount === 1 ? 'item' : 'items';

  return (
    <Content>
      <Count>
        <strong>{activeCount || 'No'}</strong>
        {' '}
        {itemWord}
        {' '}
        left
      </Count>
      <Filters>
        {Object.keys(FILTER_TITLES).map((filter) => (
          <Button type="link" key={filter}>
            <FilterLink filter={filter}>
              {FILTER_TITLES[filter]}
            </FilterLink>
          </Button>
        ))}
      </Filters>
      {
        !!completedCount
        && (
        <Button type="primary" onClick={onClearCompleted}>
          Clear completed
        </Button>
        )
      }
    </Content>
  );
};

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default Footer;
