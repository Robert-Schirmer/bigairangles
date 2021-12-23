import React from 'react';
import NextLink from 'next/link';

const NextComposed = React.forwardRef(function NextComposed(props, ref) {
  const { as, href, ...other } = props;

  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

const linkstyle = {
  color: 'inherit',
  textDecoration: 'none'
}

//Custom nextjs Link
function PageLink(props) {
  const {
    href,
    className: classNameProps,
    innerRef,
    ...other
  } = props;

  return <NextComposed className={classNameProps} style={linkstyle} ref={innerRef} href={href} {...other} />;
}

export default React.forwardRef((props, ref) => <PageLink {...props} innerRef={ref} />);
