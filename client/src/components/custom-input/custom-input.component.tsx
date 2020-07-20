import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import InputTrigger from 'react-input-trigger';

import './custom-input.styles.scss';
import { getInitials } from '../../services/helpers';
import { getUsers } from '../../services/users';

const CustomInput: React.FC<any> = ({
  handleSubmit,
  input,
  setInput,
  handleChange
}) => {
  const [users, setUsers] = useState([]);
  const [inputMention, setInputMention] = useState<any>({
    currentSelection: 0,
    startPosition: null,
    showSuggestor: false,
    top: null,
    left: null,
    text: ''
  });

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const makeSelection = (selectedUser: any) => {
    if (inputMention.showSuggestor) {
      const newText = `${input.slice(0, inputMention.startPosition - 1)} @${
        selectedUser.username
      }${input.slice(
        inputMention.startPosition + selectedUser.username.length,
        input.length
      )}`;
      setInput(newText);
      setInputMention({
        currentSelection: 0,
        startPosition: null,
        showSuggestor: false,
        top: null,
        left: null,
        text: ''
      });
    }
  };

  const handleKeyDown = (event: any) => {
    const { which } = event;

    if (which === 40) {
      event.preventDefault();
      setInputMention((prev: any) => ({
        ...prev,
        currentSelection: (prev.currentSelection + 1) % users.length
      }));
    } else if (which === 38 && inputMention.currentSelection > 0) {
      event.preventDefault();
      setInputMention((prev: any) => ({
        ...prev,
        currentSelection: (prev.currentSelection - 1) % users.length
      }));
    } else if (which === 13) {
      event.preventDefault();
      const selectedUser: any = users.filter((user: any) =>
        user.username.includes(inputMention.text)
      )[inputMention.currentSelection];
      makeSelection(selectedUser);
    }
  };

  const inputSuggestor = (metaData: any) => {
    const { hookType, cursor } = metaData;

    if (hookType === 'start') {
      setInputMention((prev: any) => ({
        ...prev,
        showSuggestor: true,
        startPosition: cursor.selectionStart,
        left: cursor.left,
        top: cursor.top + 40
      }));
    }

    if (hookType === 'cancel') {
      setInputMention((prev: any) => ({
        ...prev,
        showSuggestor: false,
        startPosition: null,
        left: null,
        top: null,
        text: ''
      }));
    }
  };

  const handleMentionChange = (metaData: any) => {
    setInputMention((prev: any) => ({
      ...prev,
      text: metaData.text
    }));
  };

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <InputTrigger
        trigger={{
          keyCode: 50,
          shiftKey: true
        }}
        onStart={(metaData: any) => {
          inputSuggestor(metaData);
        }}
        onCancel={(metaData: any) => {
          inputSuggestor(metaData);
        }}
        onType={(metaData: any) => handleMentionChange(metaData)}
      >
        <TextareaAutosize
          className='textarea'
          value={input}
          onChange={handleChange}
          placeholder="What's happening?"
        />
      </InputTrigger>
      <div
        className='mention-popover'
        style={{
          display: inputMention.showSuggestor ? 'block' : 'none',
          top: inputMention.top!,
          left: inputMention.left!
        }}
      >
        {users
          .filter((user: any) => user.username.includes(inputMention.text))
          .map((user: any, index: any) => (
            <div
              className='mention-user'
              style={{
                background:
                  index === inputMention.currentSelection ? '#f6f8fa' : ''
              }}
              onClick={() => makeSelection(user)}
            >
              <span className='mention-avatar'>
                {getInitials(null, user.name)}
              </span>
              <div className='mention-details'>
                <span className='mention-name'>{user.name}</span>
                <span className='mention-username'>{user.username}</span>
              </div>
            </div>
          ))}
      </div>
      <div>
        <button disabled={input.length == 0}>Chirp</button>
      </div>
    </form>
  );
};

export default CustomInput;
