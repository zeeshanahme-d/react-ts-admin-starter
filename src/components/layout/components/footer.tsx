import { Layout } from 'antd';

function Footer() {
  return <Layout.Footer className='pt-0 text-center'>admin ©{new Date().getFullYear()}</Layout.Footer>;
}

export default Footer;
