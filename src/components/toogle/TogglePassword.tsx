import { IconShowPass, IconHidePass } from '../icon/Icon';

const TogglePassword = ({ open = false, ...props }) => {
    if (open) {
        return <IconShowPass {...props} />;
    }
    return <IconHidePass {...props} />;
};

export default TogglePassword;
