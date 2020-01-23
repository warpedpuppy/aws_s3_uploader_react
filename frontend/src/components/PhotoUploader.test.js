import React from 'react';
import ReactDOM from 'react-dom';
import PhotoUploader from './PhotoUploader';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

describe( 'smoke tests', () => {
  it('photo uploader renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PhotoUploader />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

describe('snapshot tests', () => {
    it('renders the UI as expected', () => {
      const wrapper = shallow(<PhotoUploader />)
      expect(toJson(wrapper)).toMatchSnapshot()
    });
})

describe( 'uploader submit button event listener tests', () => {
    it(`responds with 'please choose an image'`, () => {
      const wrapper = shallow(<PhotoUploader />)
      expect(wrapper.find('div#result').text()).toEqual('')
      wrapper.find(`form`).simulate('submit');
      expect(wrapper.find('div#result').text()).toEqual('please choose an image')
    })
  })