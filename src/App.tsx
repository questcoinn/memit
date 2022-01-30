import React, { useEffect, useState } from 'react';
import Controller from './Controller';
import Memo from './Memo';

export default function App() {
  useEffect(() => {
    // debug용 초기화
    window.localStorage.setItem('memoContainer', '{}');

    if(window.localStorage.getItem('memoContainer') === null) {
      window.localStorage.setItem('memoContainer', '{}');
    }
  }, []);

  const [ shouldUpdateMemo, setShouldUpdateMemo ] = useState(false);

  return (<>
    <Controller setShouldUpdateMemo={setShouldUpdateMemo}></Controller>
    <Memo shouldUpdateMemo={shouldUpdateMemo} />
  </>);
}
