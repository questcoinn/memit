import React from 'react';

interface Memo_t {
  title: string,
  text: string,
};

interface MemoProp {
  memoContainer: string,
  setSelectedKey: React.Dispatch<React.SetStateAction<number>>,
};
export default function Memo({ memoContainer, setSelectedKey, }: MemoProp) {
  const memoObj = JSON.parse(memoContainer);
  return (<div>{
    (Object.entries(memoObj) as [string, Memo_t][]).map(([ key, value ]) => {
      return (<div key={key}>
        <input type="radio" name="memo" value={key} onClick={() => setSelectedKey(parseInt(key))} />
        <div>{value['title']}</div>
        <div>{value['text']}</div>
      </div>);
    })
  }</div>);
}
