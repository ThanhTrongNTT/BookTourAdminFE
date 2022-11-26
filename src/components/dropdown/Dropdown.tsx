import { useWatch } from 'react-hook-form';
import classNames from '~/utils/classNames';

type PropTypes = {
    name: string;
    control: any;
    dropdownLabel: string;
    setValue: Function;
    list: Array<string>;
    className: string;
};

const Dropdown = ({
    name,
    control,
    dropdownLabel = '',
    setValue,
    list = [],
    className,
}: PropTypes) => {
    const dropdownValue = useWatch({
        control,
        name,
        defaultValue: dropdownLabel, // default value before the render
    });

    const handleGetValue = (e: any) => {
        setValue(name, e.target.value);
        console.log(e.target.value);
    };

    return (
        <select
            defaultValue={dropdownLabel}
            onChange={handleGetValue}
            className={classNames('px-5 py-3 rounded-md border border-c6', className)}
        >
            <option value={dropdownLabel} disabled>
                {dropdownLabel}
            </option>
            {list.map((item, index) => (
                <option data-value={item} key={index}>
                    {item}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
