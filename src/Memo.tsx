import React from 'react';

interface Memo_t {
  title: string;
  text: string;
};

export default function Memo(props: { shouldUpdateMemo: boolean }) {
  console.log('fix here');
  if(!props.shouldUpdateMemo) {
    console.log('fix here too');
    return <></>;
  }

  const memoContainer = JSON.parse(window.localStorage.getItem('memoContainer') as string);
  return (<>{
    (Object.entries(memoContainer) as [string, string][]).map(([ key, valueString ]) => {
      console.log(valueString);
      const value = JSON.parse(valueString) as Memo_t;
      return (<div key={key}>
        <div>{value['title']}</div>
        <div>{value['text']}</div>
      </div>);
    })
  }</>);
}
