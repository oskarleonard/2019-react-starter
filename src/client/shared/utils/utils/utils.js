export function cleanHttpsLink(httpLink) {
  if (httpLink && httpLink.replace) {
    return httpLink.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
  } else {
    return '';
  }
}

export function prefixHttpsLink(httpLink) {
  if (httpLink && httpLink.startsWith) {
    if (!httpLink.startsWith('https://') && !httpLink.startsWith('http://')) {
      return `https://${httpLink}`;
    } else {
      return httpLink;
    }
  } else {
    return '';
  }
}

export function smartLinkPrefixer(prefix, linkSegment) {
  if (linkSegment && linkSegment.startsWith) {
    if (
      !linkSegment.startsWith('https://') &&
      !linkSegment.startsWith('http://') &&
      !linkSegment.startsWith('www.')
    ) {
      return `${prefix}${linkSegment}`;
    } else {
      return linkSegment;
    }
  } else {
    return '';
  }
}

export function addPrefixBeforeFileExtension(fileUrl = '', prefix) {
  const dotIndex = fileUrl.lastIndexOf('.');
  if (dotIndex === -1) return fileUrl + prefix;
  else
    return (
      fileUrl.substring(0, dotIndex) + prefix + fileUrl.substring(dotIndex)
    );
}

export function valueOrEmptyStr(value) {
  return value || '';
}

export function remapObjValueToString(obj) {
  return Object.entries(obj).reduce((acum, [key, value]) => {
    acum[key] = value.toString();
    return acum;
  }, {});
}

// Truncates a string and replace the end with '...'.
// We do this since not all browsers support multiline ellipsis.
export const fakeEllipsis = (text, maxCharNumber) => {
  if (typeof text === 'string' && text.length > maxCharNumber) {
    return `${text.substring(0, maxCharNumber - 2).trim()}…`;
  } else {
    return text;
  }
};
