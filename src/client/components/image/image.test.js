import React from 'react';
import { shallow } from 'enzyme';
import Image from './Image';

const setup = (propOverrides) => {
  const props = Object.assign({}, propOverrides);

  const wrapper = shallow(<Image {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('Render', () => {
  it('should render component ', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });
});
