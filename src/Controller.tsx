import React, { useRef, useState } from 'react';


export default function Controller(
  props: {
    setShouldUpdateMemo: React.Dispatch<React.SetStateAction<boolean>>
  })
{
  const [ creating, setCreating ] = useState(false);
  const [ id, setId ] = useState(0);

  type EditingState = 'CREATE' | 'UPDATE';
  function setEditingState(state: EditingState) {
    if(state === 'CREATE') {
      setCreating(true);
    }
    else {
      // todo: UPDATE
    }
  }

  return (<>
    <button onClick={() => setEditingState('CREATE')}>Create</button>
    <button>Read</button>
    <button>Update</button>
    <button>Delete</button>
    {creating
      ? <Editor id={id} nextId={id + 1} setId={setId} setEditing={setCreating}
      setShouldUpdateMemo={props.setShouldUpdateMemo} />
      : <></>}
  </>);
}

function Editor(
  props: {
    id: number, nextId?: number | undefined,
    setId: React.Dispatch<React.SetStateAction<number>>,
    setEditing: React.Dispatch<React.SetStateAction<boolean>>,
    setShouldUpdateMemo: React.Dispatch<React.SetStateAction<boolean>>,
  })
{
  const $title = useRef<HTMLInputElement>(null);
  const $text = useRef<HTMLTextAreaElement>(null);

  function editMemo(title: string | undefined, text: string | undefined) {
    if(title === undefined) {
      $title.current?.focus();
      return;
    }
    if(text === undefined) {
      $text.current?.focus();
      return;
    }

    saveMemoToLocalStorage(props.id, title, text);
    if(props.nextId !== undefined) {
      props.setId(props.nextId);
    }
    props.setShouldUpdateMemo(true);
    props.setEditing(false);
  }

  return (<div>
    <input type="text" placeholder="title" ref={$title} />
    <br />
    <textarea name="" id="" cols={30} rows={10} ref={$text}></textarea>
    <br />
    <button onClick={() => editMemo($title.current?.value || undefined, $text.current?.value || undefined)}>Save</button>
    <button onClick={() => props.setEditing(false)}>Close</button>
  </div>);
}

function saveMemoToLocalStorage(id: number, title: string, text: string) {
  const memoContainer = JSON.parse(window.localStorage.getItem('memoContainer') as string);
  memoContainer[id.toString()] = JSON.stringify({ title, text });
  window.localStorage.setItem('memoContainer', JSON.stringify(memoContainer));
  console.log(window.localStorage.getItem('memoContainer'));
}