import React, { PureComponent } from 'react';

class Image extends PureComponent {
  render() {
    const { alt, className, ...rest } = this.props;
    return <img className={className || ''} {...rest} alt={alt} />;
  }
}

export default Image;
