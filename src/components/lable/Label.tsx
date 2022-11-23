import classNames from '~/utils/classNames';
type PropTypes = {
    htmlFor: string;
    children: any;
    className: string;
};
const Label = ({ htmlFor, className, children }: PropTypes) => {
    return (
        <div className='inline-block'>
            <label
                htmlFor={htmlFor}
                className={classNames(
                    'inline-block cursor-pointer text-sm text-c3 dark:text-c4 font-semibold',
                    className,
                )}
            >
                {children}
            </label>
        </div>
    );
};

export default Label;
