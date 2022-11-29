import React from 'react';
import { useController } from 'react-hook-form';
import classNames from '~/utils/classNames';

const InputProfile = ({
    control,
    name,
    placeholder,
    id,
    hasIcon,
    icon,
    tabIndex,
    hasDisable,
    type,
}: any) => {
    const { field } = useController({
        control,
        name,
        defaultValue: '',
    });
    return (
        <div
            className={classNames(
                'rounded-lg border flex items-center gap-4 border-[#DEDFE1] px-5 py-3 transition-all focus-within:border-c5',
                hasDisable
                    ? 'pointer-events-none select-none bg-[#ededed] text-gray-c4'
                    : 'bg-white',
            )}
        >
            {hasIcon && <span className='text-c4'>{icon}</span>}
            <input
                type={type ? type : 'text'}
                className='w-full bg-transparent text-c3 outline-none placeholder:text-c4'
                {...field}
                placeholder={placeholder}
                name={name}
                id={id}
                tabIndex={tabIndex}
            />
        </div>
    );
};

export default InputProfile;
