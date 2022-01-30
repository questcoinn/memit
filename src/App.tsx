import React, { useEffect, useState } from 'react';
import Controller from './Controller';
import Memo from './Memo';

export default function App() {
  useEffect(() => {
    // debug용 초기화
    window.localStorage.setItem('memoContainer', '{}');
  }, []);

  const [ memoContainer, setMemoContainer ] = useStorage('memoContainer', '{}');
  const [ selectedKey, setSelectedKey ] = useState(-1);

  return (<>
    <Controller memoContainer={memoContainer} setMemoContainer={setMemoContainer}
      selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
    <Memo memoContainer={memoContainer} setSelectedKey={setSelectedKey} />
  </>);
}

function useStorage(key: string, defaultData = ''): [ string, React.Dispatch<React.SetStateAction<string>> ] {
  const rawData = window.localStorage.getItem(key) || defaultData;
  const [ retData, setData ] = useState(rawData);
  window.localStorage.setItem(key, retData);

  function setStorage(newData: string) {
    setData(newData);
    window.localStorage.setItem(key, newData);
  }

  return [ retData, setStorage as React.Dispatch<React.SetStateAction<string>> ];
}