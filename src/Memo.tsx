import React from 'react';

interface Memo_t {
  title: string,
  text: string,
};

interface MemoProp {
  memoContainer: string,
};
export default function Memo({ memoContainer, }: MemoProp) {
  const memoObj = JSON.parse(memoContainer);
  return (<div>{
    (Object.entries(memoObj) as [string, Memo_t][]).map(([ key, value ]) => {
      return (<div key={key}>
        <div>{value['title']}</div>
        <div>{value['text']}</div>
      </div>);
    })
  }</div>);
}
