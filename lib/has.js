const hasOwnProperty = {}.hasOwnProperty;

export default function hasKey(object, key) {
    return hasOwnProperty.call(object, key);
}
