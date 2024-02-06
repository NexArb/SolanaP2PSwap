'use client';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import React from 'react';
import Icon from '../Icon';
import NexarbInputField from '../CustomInputField';
import { useDispatch } from 'react-redux';

export default function InputSearch({ placeholder }: any) {
  const [search, setSearch] = React.useState<string>('');
  const dispatch = useDispatch();

  const onChange = (text: string) => {
    setSearch(text);
  };

  return (
    <div className="flex items-center h-6 w-full">
      <div className="relative w-full">
        {search === '' && (
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Icon
              icon={faSearch}
              size="md"
              className="text-gray-500 dark:text-gray-400"
            />
          </div>
        )}
        <NexarbInputField
          name={'search bar'}
          placeholder={'         ' + placeholder}
          onChange={onChange}
          type={'text'}
          value={search}
        />
      </div>
    </div>
  );
}
