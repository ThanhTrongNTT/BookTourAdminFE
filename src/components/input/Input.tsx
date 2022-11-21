import { withErrorBoundary } from 'react-error-boundary';
import { useController } from 'react-hook-form';
import ErrorBoundary from '../common/ErrorBoundary';

import classNames from '~/utils/classNames';

type InputProps = {
    pointer: any;
    variant: any;
    children: any;
    control: any;
    name: any;
    type: any;
    error: string;
    placeholder: string;
};
const Input = ({
    pointer,
    variant,
    children,
    control,
    name,
    type,
    error = '',
    placeholder = '',
    ...rest
}: InputProps) => {
    const { field } = useController({
        control,
        name,
        defaultValue: '',
    });
    let defaultClasses =
        'text-sm font-medium font-Poppins transition-all w-full dark:border-dark-stroke dark:text-white ';
    switch (variant) {
        case 'outlined':
            defaultClasses += 'rounded-xl border bg-transparent px-6 py-4 text-c3';
            break;
        case 'text':
            // eslint-disable-next-line no-self-assign
            defaultClasses = defaultClasses;
            break;
        default:
            break;
    }
    return (
        <div className='relative'>
            <input
                type={type}
                className={classNames(
                    defaultClasses,
                    error.length > 0 ? 'border-primary-red text-primary-red' : 'border-c6 text-c3',
                    children ? 'pr-16' : '',
                    pointer && 'cursor-pointer',
                )}
                placeholder={error.length > 0 ? '' : placeholder}
                {...field}
                {...rest}
            />
            {children && (
                <span className='absolute right-6 top-2/4 -translate-y-2/4 cursor-pointer select-none'>
                    {children}
                </span>
            )}
        </div>
    );
};

export default withErrorBoundary(Input, {
    FallbackComponent: ErrorBoundary,
});
