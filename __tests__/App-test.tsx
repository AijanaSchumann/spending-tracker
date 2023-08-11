import React from 'react';

import {Provider} from 'react-redux';
import {setupStore} from '../src/app/store/store';
import {render, screen} from '@testing-library/react-native';
import Setup from '../src/app/views/Setup';
import Overview from '../src/app/views/Overview';
import Settings from '../src/app/views/Settings';
import Home from '../src/app/views/Home';

jest.useFakeTimers();

describe('renders correctly', () => {

  it('Setup screen',  () => {
    const root = render(
      <Provider store={setupStore()}>
        <Setup />
      </Provider>,
    );

    expect(root.getByText('Add first income')).toBeTruthy();
  });

  it('Home screen',  () => {
    render(
      <Provider store={setupStore()}>
        <Home />
      </Provider>,
    );

    screen.getByText('Income: ');
    screen.getByText('Expenses: ');


  });

  it('Overview screen',  () => {
    const root = render(
      <Provider store={setupStore()}>
        <Overview />
      </Provider>,
    );

    expect(root.getByText('No data logged.')).toBeTruthy();
  });

  it('Overview screen with data',  () => {

    const partialStore = {spending:{entries:[{ id: 1, categoryId: 1,  value: 50, note: "", date: new Date().getTime(), interval: null, type: "income" },
    { id: 2, categoryId: 3,  value: 150, note: "", date: new Date().getTime(), interval: null, type: "expense" }]}} as any;
    
    render(
      <Provider store={setupStore(partialStore)}>
        <Overview />
      </Provider>,
    );

    //make sure its not there
    const test = screen.queryByText('No data logged.');
    expect(test).toBeNull();

    //TODO: better test!
    //find two elements with the current day
    const listElements = screen.queryAllByText(new Date().toDateString());
    expect(listElements).toHaveLength(2);
  });

  it('Settings screen', () => {
    const root = render(
      <Provider store={setupStore()}>
        <Settings />
      </Provider>,
    );

    expect(root.getByText('Categories')).toBeTruthy();
    expect(root.getByText('Currency')).toBeTruthy();
  });
});
