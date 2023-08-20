export function getValidName(fileName) {
    return fileName.split(/\s+/).join("-").replace(/\(|\)|\"|\'|/, "");
}
