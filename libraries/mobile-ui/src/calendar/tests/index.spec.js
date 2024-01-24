import {
  describe,
  it,
  test,
  vi as jest,
  expect,
} from 'vitest';
  import Calendar from '..';
import { mount, later } from '../../../test';
import {
  minDate,
  maxDate,
} from './utils';


test('confirm event', async () => {
  const wrapper = mount(Calendar, {
    propsData: {
      minDate,
      maxDate,
      poppable: false,
      value: '2010-01-11',
    },
  });

  await later();

  wrapper.findAll('.van-calendar__day').at(15).trigger('click');
  expect(wrapper.emitted('confirm')).toBeFalsy();

  wrapper.find('.van-calendar__confirm').trigger('click');
  expect(wrapper.emitted('confirm')[0][0]).toEqual('2010-01-16');
});
