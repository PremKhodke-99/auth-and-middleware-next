import React from 'react'
import { Input } from '../ui/input';

const CommonFormElement = ({ currentItem, value, onChange }) => {
    let content = null

    switch (currentItem.componentype) {
        case 'input':
            content = <Input
                name={currentItem.name}
                id={currentItem.name}
                placeholder={currentItem.placeholder}
                value={value}
                onChange={onChange}
                type={currentItem.type}
            />
            break;
        default:
            content = <Input
                name={currentItem.name}
                id={currentItem.name}
                placeholder={currentItem.placeholder}
                value={value}
                onChange={onChange}
                type={currentItem.type}
            />
            break;
    }

    return content;
}

export default CommonFormElement