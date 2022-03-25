import React, { useRef, useState } from 'react';

interface ControllerProp {
  memoContainer: string,
  setMemoContainer: React.Dispatch<React.SetStateAction<string>>,
  selectedKey: number,
  setSelectedKey: React.Dispatch<React.SetStateAction<number>>,
};
export default function Controller({ memoContainer, setMemoContainer, selectedKey, setSelectedKey, }: ControllerProp) {
  const [ creating, setCreating ] = useState(false);
  const [ updating, setUpdating ] = useState(false);
  const [ id, setId ] = useState(0);

  type EditingState = 'CREATE' | 'UPDATE';
  function setEditingState(state: EditingState) {
    setCreating(false);
    setUpdating(false);
    if(state === 'CREATE') {
      setCreating(true);
    }
    else {
      setUpdating(selectedKey !== -1);
    }
  }

  return (<>
    <button onClick={() => setEditingState('CREATE')}>Create</button>
    <button onClick={() => setEditingState('UPDATE')}>Update</button>
    <button>Delete</button>
    {creating
      ? <Editor id={id} nextId={id + 1} setId={setId} setEditing={setCreating}
          memoContainer={memoContainer} setMemoContainer={setMemoContainer} />
      : <></>}
    {updating
      ? <Editor id={selectedKey} setEditing={setUpdating}
          memoContainer={memoContainer} setMemoContainer={setMemoContainer}
          setSelectedKey={setSelectedKey} />
      : <></>}
  </>);
}

interface EditorProp {
  id: number, nextId?: number,
  setId?: React.Dispatch<React.SetStateAction<number>>,
  setEditing: React.Dispatch<React.SetStateAction<boolean>>,
  memoContainer: string,
  setMemoContainer: React.Dispatch<React.SetStateAction<string>>,
  setSelectedKey?: React.Dispatch<React.SetStateAction<number>>,
};
function Editor({ id, nextId, setId, setEditing, memoContainer, setMemoContainer, setSelectedKey, }: EditorProp) {
  const $title = useRef<HTMLInputElement>(null);
  const $text = useRef<HTMLTextAreaElement>(null);

  const memoObj = JSON.parse(memoContainer);

  function editMemo(title: string | undefined, text: string | undefined) {
    if(title === undefined) {
      $title.current?.focus();
      return;
    }
    if(text === undefined) {
      $text.current?.focus();
      return;
    }

    memoObj[id] = { title, text };
    setMemoContainer(JSON.stringify(memoObj));

    if(nextId !== undefined && setId !== undefined) {
      setId(nextId);
    }
    if(setSelectedKey !== undefined) {
      setSelectedKey(-1);
    }
    setEditing(false);
  }

  let title = '';
  let text = '';
  if(id in memoObj) {
    title = memoObj[id].title;
    text = memoObj[id].text;
  }

  return (<div>
    <input type="text" placeholder="title" ref={$title} defaultValue={title} />
    <br />
    <textarea name="" id="" cols={30} rows={10} ref={$text} defaultValue={text}></textarea>
    <br />
    <button onClick={() => editMemo($title.current?.value || undefined, $text.current?.value || undefined)}>Save</button>
    <button onClick={() => setEditing(false)}>Close</button>
  </div>);
}