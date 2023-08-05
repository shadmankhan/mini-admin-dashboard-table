import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './counterSlice';
import Button from '../common/Button/Button';

const Counter = () => {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <Button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </Button>
        <span>&nbsp;{count}&nbsp;</span>
        <Button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
      </div>
    </div>
  );
};

export default Counter;
