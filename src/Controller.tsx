import React, { useRef, useState } from 'react';

interface ControllerProp {
  memoContainer: string,
  setMemoContainer: React.Dispatch<React.SetStateAction<string>>,
};
export default function Controller({ memoContainer, setMemoContainer, }: ControllerProp) {
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
          memoContainer={memoContainer} setMemoContainer={setMemoContainer} />
      : <></>}
  </>);
}

interface EditorProp {
  id: number, nextId?: number,
  setId: React.Dispatch<React.SetStateAction<number>>,
  setEditing: React.Dispatch<React.SetStateAction<boolean>>,
  memoContainer: string,
  setMemoContainer: React.Dispatch<React.SetStateAction<string>>,
};
function Editor({ id, nextId, setId, setEditing, memoContainer, setMemoContainer, }: EditorProp) {
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

    const memoObj = JSON.parse(memoContainer);
    memoObj[id] = { title, text };
    setMemoContainer(JSON.stringify(memoObj));

    if(nextId !== undefined) {
      setId(nextId);
    }
    setEditing(false);
  }

  return (<div>
    <input type="text" placeholder="title" ref={$title} />
    <br />
    <textarea name="" id="" cols={30} rows={10} ref={$text}></textarea>
    <br />
    <button onClick={() => editMemo($title.current?.value || undefined, $text.current?.value || undefined)}>Save</button>
    <button onClick={() => setEditing(false)}>Close</button>
  </div>);
}